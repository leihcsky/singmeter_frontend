import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { bootstrapSeo } from './seo/bootstrapSeo'
import './index.css'
import App from './App.jsx'

bootstrapSeo()

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Prerendered HTML in #root — hydrate instead of replacing (SEO + faster first paint)
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
