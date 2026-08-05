import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

// Import and immediately show AppShell (skip login)
import App from './app/App'

// Override: render dashboard directly by pre-setting auth
function DashboardPreview() {
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(<DashboardPreview />)
