import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { profile } from '../data/profile'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const close = () => setOpen(false)
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={close}><span className="brand-symbol">D<span>.</span></span><span>{profile.name.toLowerCase()}<span className="brand-dot">.</span></span></Link>
        <div className={`nav-links ${open ? 'nav-open' : ''}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <Link to="/#about" className={location.hash === '#about' ? 'active' : ''} onClick={close}>About</Link>
          <Link to="/#birthday" className={location.hash === '#birthday' ? 'active' : ''} onClick={close}>Birthday</Link>
          <NavLink to="/music" onClick={close}>Music</NavLink>
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title="Toggle theme">{theme === 'dark' ? <Sun size={18} strokeWidth={1.7} /> : <Moon size={18} strokeWidth={1.7} />}</button>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>
    </header>
  )
}
