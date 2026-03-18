import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js?v=5', { updateViaCache: 'none' })
      .then((registration) => registration.update())
      .catch((err) => {
        console.error('Service Worker 註冊失敗:', err)
      })
  })
}
