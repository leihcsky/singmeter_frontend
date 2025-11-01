import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ModernVocalTest from './components/ModernVocalTest'
import BlogPage from './pages/BlogPage'
import BlogArticlePage from './pages/BlogArticlePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ModernVocalTest />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogArticlePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
