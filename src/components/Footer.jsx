import { Heart, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'

export default function Footer() {
  return <footer className="site-footer container"><div className="footer-top"><span className="footer-brand">{profile.name}<span>.</span></span><span>A little world of his own.</span></div><div className="footer-bottom"><span>Made with <Heart size={12} fill="currentColor" aria-label="love" /> for {profile.name}</span><span>© {new Date().getFullYear()} {profile.name}</span><div><a href={`https://instagram.com/${profile.instagram.slice(1)}`} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={12} /></a><a href={`https://t.me/${profile.telegram.slice(1)}`} target="_blank" rel="noopener noreferrer">Telegram <ArrowUpRight size={12} /></a></div></div></footer>
}
