import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { logMediaDiagnostics } from './config/media'

if (import.meta.env.DEV) logMediaDiagnostics()

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
