import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { MusicProvider } from './context/MusicContext'
import SiteLayout from './layouts/SiteLayout'
import Home from './pages/Home'

const Music = lazy(() => import('./pages/Music'))

export default function App() {
  return <ThemeProvider><MusicProvider><BrowserRouter><Routes><Route element={<SiteLayout />}><Route index element={<Home />} /><Route path="music" element={<Suspense fallback={<div className="page-loading">Loading the collection...</div>}><Music /></Suspense>} /><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></BrowserRouter></MusicProvider></ThemeProvider>
}
