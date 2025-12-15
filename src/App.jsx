import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import VocalRangeTestPage from './pages/VocalRangeTestPage'
import PitchDetectorPage from './pages/PitchDetectorPage'
import BlogPage from './pages/BlogPage'
import BlogArticlePage from './pages/BlogArticlePage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import DisclaimerPage from './pages/DisclaimerPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TutorialsPage from './pages/TutorialsPage'
import ResourcesPage from './pages/ResourcesPage'
import GlossaryPage from './pages/GlossaryPage'
import FAQPage from './pages/FAQPage'
import ToneGeneratorPage from './pages/ToneGeneratorPage'
import MetronomePage from './pages/MetronomePage'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // 每次路由变化时，将页面滚动到顶部
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vocal-range-test" element={<VocalRangeTestPage />} />
          <Route path="/pitch-detector" element={<PitchDetectorPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/disclaimer" element={<DisclaimerPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/tone-generator" element={<ToneGeneratorPage />} />
          <Route path="/metronome" element={<MetronomePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
