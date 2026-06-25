import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  build: {
    // Don't eagerly inject <link rel="modulepreload"> for the whole chunk graph.
    // Pages are prerendered (content paints from static HTML), so letting the
    // render-critical CSS win bandwidth at first paint improves FCP/LCP on mobile;
    // route chunks are still fetched as soon as the entry executes.
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Heavy audio libs — only pulled in by tool pages, keep isolated
          if (/[\\/]node_modules[\\/]tone[\\/]/.test(id)) return 'tone'
          if (/[\\/]node_modules[\\/]pitchy[\\/]/.test(id)) return 'pitchy'
          if (/[\\/]node_modules[\\/]react-router/.test(id)) return 'react-router'
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          return 'vendor'
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
