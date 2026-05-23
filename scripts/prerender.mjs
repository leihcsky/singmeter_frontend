/**
 * Post-build prerender: snapshot each sitemap URL to static HTML (body + head meta).
 *
 * Usage: npm run build (runs automatically) or npm run prerender (after vite build)
 * Skip: PRERENDER_SKIP=1 npm run build
 *
 * Vercel: uses @sparticuz/chromium + puppeteer-core (stock puppeteer Chrome misses libnspr4 on CI).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import http from 'node:http';
import { defaultSitemapPath, getRoutesFromSitemap } from './parse-sitemap-routes.mjs';

// @sparticuz/chromium reads this at import time on Vercel Fluid / Node 22
if (process.env.VERCEL && !process.env.AWS_LAMBDA_JS_RUNTIME) {
  process.env.AWS_LAMBDA_JS_RUNTIME = 'nodejs22.x';
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PREVIEW_PORT = Number(process.env.PRERENDER_PORT || 4173);
const PREVIEW_HOST = '127.0.0.1';
const PREVIEW_ORIGIN = `http://${PREVIEW_HOST}:${PREVIEW_PORT}`;

function log(msg) {
  console.log(`[prerender] ${msg}`);
}

function waitForServer(url, timeoutMs = 120000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http
        .get(url, (res) => {
          res.resume();
          if (res.statusCode && res.statusCode < 500) resolve();
          else retry();
        })
        .on('error', retry);
    };
    const retry = () => {
      if (Date.now() - started > timeoutMs) {
        reject(new Error(`Preview server did not start within ${timeoutMs}ms`));
        return;
      }
      setTimeout(tick, 400);
    };
    tick();
  });
}

function useServerlessChromium() {
  return (
    process.env.VERCEL === '1' ||
    (process.env.CI === 'true' && process.platform === 'linux')
  );
}

async function launchBrowser() {
  if (useServerlessChromium()) {
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteer = (await import('puppeteer-core')).default;

    if (typeof chromium.setGraphicsMode === 'function') {
      chromium.setGraphicsMode(false);
    }

    const executablePath = await chromium.executablePath();
    process.env.LD_LIBRARY_PATH = path.dirname(executablePath);

    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });
  }

  const puppeteer = (await import('puppeteer')).default;
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
}

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['run', 'preview:prerender'], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: process.platform === 'win32',
      env: { ...process.env, NODE_ENV: 'production' },
    });

    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code !== null && code !== 0) {
        reject(new Error(`vite preview exited with code ${code}\n${stderr}`));
      }
    });

    waitForServer(`${PREVIEW_ORIGIN}/`)
      .then(() => resolve(child))
      .catch((err) => {
        child.kill();
        reject(err);
      });
  });
}

function outputHtmlPath(route) {
  if (route === '/') return path.join(DIST, 'index.html');
  const segments = route.split('/').filter(Boolean);
  return path.join(DIST, ...segments, 'index.html');
}

async function prerenderRoute(page, route) {
  const url = `${PREVIEW_ORIGIN}${route === '/' ? '/' : route}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });

  await page.waitForSelector('#root main', { timeout: 60000 });
  await page.waitForSelector('html[data-prerender-ready="true"]', { timeout: 60000 });

  const title = await page.title();
  const description = await page.$eval('meta[name="description"]', (el) => el.content).catch(() => '');
  const rootChildCount = await page.$eval('#root', (el) => el.childElementCount);

  if (!rootChildCount) {
    throw new Error(`#root is empty for ${route}`);
  }

  const html = await page.content();
  const outPath = outputHtmlPath(route);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');

  log(`✓ ${route} → ${path.relative(ROOT, outPath)} (${rootChildCount} root nodes, title: ${title.slice(0, 50)}…)`);
  if (!description) {
    log(`  ⚠ missing meta description for ${route}`);
  }
}

async function main() {
  if (process.env.PRERENDER_SKIP === '1' || process.env.PRERENDER_SKIP === 'true') {
    log('skipped (PRERENDER_SKIP is set)');
    return;
  }

  if (!fs.existsSync(DIST)) {
    console.error('[prerender] dist/ not found. Run "vite build" first.');
    process.exit(1);
  }

  const routes = getRoutesFromSitemap(defaultSitemapPath());
  log(`routes: ${routes.length} from sitemap.xml`);

  let preview;
  let browser;

  try {
    log(`starting preview at ${PREVIEW_ORIGIN}`);
    preview = await startPreviewServer();

    browser = await launchBrowser();

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'mediaDevices', {
        value: {
          getUserMedia: async () => {
            throw new DOMException('Prerender: microphone unavailable', 'NotAllowedError');
          },
          enumerateDevices: async () => [],
        },
        configurable: true,
      });
    });

    for (const route of routes) {
      try {
        await prerenderRoute(page, route);
      } catch (err) {
        console.error(`[prerender] FAILED ${route}:`, err.message);
        process.exitCode = 1;
      }
    }
  } finally {
    if (browser) await browser.close();
    if (preview) preview.kill('SIGTERM');
  }

  if (process.exitCode) {
    console.error('[prerender] finished with errors');
    process.exit(process.exitCode);
  }
  log('done');
}

main().catch((err) => {
  console.error('[prerender]', err);
  process.exit(1);
});
