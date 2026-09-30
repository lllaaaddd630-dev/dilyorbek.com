import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Background from '../components/Background'
import Footer from '../components/Footer'
import MiniPlayer from '../components/MiniPlayer'
import Navbar from '../components/Navbar'

export default function SiteLayout() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 80)
      return () => clearTimeout(timer)
    }
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])
  return <><Background /><div className="site-content"><Navbar /><Outlet /><Footer /><MiniPlayer /></div></>
}
