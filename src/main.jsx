import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { bootstrapSeo } from './seo/bootstrapSeo'
import './index.css'
import App from './App.jsx'

bootstrapSeo()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
