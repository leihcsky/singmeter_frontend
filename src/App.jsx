import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import './App.css'
import { applyRobots } from './seo/applyRouteSeo'

// Route-level code splitting: each page (and its heavy deps such as Tone.js /
// pitchy) loads only when its route is visited, keeping the initial bundle small.
const HomePage = lazy(() => import('./pages/HomePage'))
const VocalRangeTestPage = lazy(() => import('./pages/VocalRangeTestPage'))
const PitchDetectorPage = lazy(() => import('./pages/PitchDetectorPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage'))
const EditorialStandardsPage = lazy(() => import('./pages/EditorialStandardsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TutorialsPage = lazy(() => import('./pages/TutorialsPage'))
const TutorialDetailPage = lazy(() => import('./pages/TutorialDetailPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const ResourceBookReviewPage = lazy(() => import('./pages/ResourceBookReviewPage'))
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'))
const FAQPage = lazy(() => import('./pages/FAQPage'))
const ToneGeneratorPage = lazy(() => import('./pages/ToneGeneratorPage'))
const MetronomePage = lazy(() => import('./pages/MetronomePage'))
const SongKeyFinderPage = lazy(() => import('./pages/SongKeyFinderPage'))

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" aria-busy="true">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )
}

function RouteRobots() {
  const { pathname } = useLocation()

  useEffect(() => {
    applyRobots(pathname)
  }, [pathname])

  return null
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = decodeURIComponent(hash.slice(1))
    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    // Wait for route content to paint (sections below the fold)
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTarget)
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}

/** Signals prerender script that route content + useEffect meta are ready. */
function PrerenderReady() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.removeAttribute('data-prerender-ready')
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.setAttribute('data-prerender-ready', 'true')
      })
    })
    return () => {
      cancelAnimationFrame(id)
      document.documentElement.removeAttribute('data-prerender-ready')
    }
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <RouteRobots />
      <PrerenderReady />
      <div className="App">
        <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vocal-range-test" element={<VocalRangeTestPage />} />
          <Route path="/pitch-detector" element={<PitchDetectorPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/editorial-standards" element={<EditorialStandardsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/tutorials/:slug" element={<TutorialDetailPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/books/:slug" element={<ResourceBookReviewPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/tone-generator" element={<ToneGeneratorPage />} />
          <Route path="/metronome" element={<MetronomePage />} />
          <Route path="/song-key-finder" element={<SongKeyFinderPage />} />
        </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
