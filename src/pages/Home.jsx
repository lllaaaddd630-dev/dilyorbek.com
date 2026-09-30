import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, CalendarDays, GraduationCap, Instagram, MapPin, Send } from 'lucide-react'
import Avatar from '../components/Avatar'
import BirthdayCountdown from '../components/BirthdayCountdown'
import MusicCard from '../components/MusicCard'
import ScrollReveal from '../components/ScrollReveal'
import { profile } from '../data/profile'
import { songs } from '../data/songs'

const facts = [
  { label: 'BORN', value: profile.birthYear, detail: 'A new story began', icon: CalendarDays },
  { label: 'STUDYING AT', value: profile.university, detail: 'Chasing what’s next', icon: GraduationCap },
  { label: 'CURRENTLY', value: profile.course, detail: 'Still becoming', icon: BookOpen },
]

export default function Home() {
  return <main className="page-enter">
    <section className="hero container" id="home">
      <div className="hero-side hero-side-left"><span>01 / A PERSONAL SPACE</span><span className="vertical-line" /></div>
      <div className="hero-main"><span className="hero-overline"><span className="status-dot" /> WELCOME TO HIS WORLD</span><Avatar /><div className="hero-text"><span className="hero-eyebrow">SOKIN QISH KECHALARI <span>✦</span> WINTER 2026</span><h1>{profile.name}<span>.</span></h1><p>{profile.description}</p></div><div className="hero-buttons"><a href="#about" className="button-primary">Get to know me <ArrowUpRight size={17} /></a><Link to="/music" className="button-outline">Explore my music <ArrowRight size={17} /></Link></div></div>
      <div className="hero-side hero-side-right"><span>EST. {profile.birthYear}</span><span className="hero-coordinate">A STORY IN THE MAKING</span></div>
      <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
      <div className="hero-bottom-rule"><span>WINTER PERSONAL IDENTITY</span><span>AN OPEN BOOK, ONE PAGE AT A TIME</span></div>
    </section>

    <div className="content-area container">
      <ScrollReveal><section className="about-section section-shell" id="about"><div className="section-heading"><div><span className="kicker"><span className="kicker-line" /> BEYOND THE NAME</span><h2>The person behind <em>the story.</em></h2></div><span className="section-aside">A LITTLE MORE ABOUT ME <ArrowUpRight size={16} /></span></div><div className="about-layout"><div className="about-intro"><div className="about-decor"><span>“</span></div><p>{profile.about}</p><span className="signature">— {profile.name}</span></div><div className="fact-grid">{facts.map(({ label, value, detail, icon: Icon }) => <div className="fact-card" key={label}><span className="fact-icon"><Icon size={18} strokeWidth={1.6} /></span><span className="fact-label">{label}</span><strong>{value}</strong><small>{detail}</small></div>)}</div></div></section></ScrollReveal>

      <ScrollReveal><BirthdayCountdown /></ScrollReveal>

    <ScrollReveal><section className="details-section section-shell"><div className="section-heading"><div><span className="kicker"><span className="kicker-line" /> THE DETAILS</span><h2>Some things <em>about me.</em></h2></div><span className="section-aside">THE LITTLE DETAILS MATTER</span></div><div className="details-layout"><div className="detail-list"><div><span>UNIVERSITY</span><strong>{profile.university}</strong></div><div><span>COURSE</span><strong>{profile.course}</strong></div><div><span>BIRTH YEAR</span><strong>{profile.birthYear}</strong></div><div><span>BIRTHDAY</span><strong>{new Date(`${profile.birthDate}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' })}</strong></div><div><span>PHONE</span><a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone} <ArrowUpRight size={15} /></a></div></div><div className="connect-panel"><div className="connect-glow" /><span className="kicker">STAY CONNECTED</span><h3>Say hello from <em>anywhere.</em></h3><p>Good conversations always start somewhere. Find me on the other side.</p><div className="social-list"><a href={`https://instagram.com/${profile.instagram.slice(1)}`} target="_blank" rel="noopener noreferrer"><span className="social-icon"><Instagram size={19} /></span><span><strong>Instagram</strong><small>{profile.instagram}</small></span><ArrowUpRight size={17} /></a><a href={`https://t.me/${profile.telegram.slice(1)}`} target="_blank" rel="noopener noreferrer"><span className="social-icon"><Send size={18} /></span><span><strong>Telegram</strong><small>{profile.telegram}</small></span><ArrowUpRight size={17} /></a><a href={`https://t.me/${profile.telegramChannel.slice(1)}`} target="_blank" rel="noopener noreferrer"><span className="social-icon"><Send size={18} /></span><span><strong>Telegram Channel</strong><small>{profile.telegramChannel}</small></span><ArrowUpRight size={17} /></a></div></div></div></section></ScrollReveal>

    <ScrollReveal><section className="favorites-section section-shell"><div className="section-heading"><div><span className="kicker"><span className="kicker-line" /> THE SOUNDTRACK</span><h2>Music for <em>slow moments.</em></h2></div><span className="section-aside">A PIECE OF MY WORLD</span></div><div className="favorite-layout"><div className="favorite-intro"><div className="favorite-disc"><div className="disc-center" /></div><h3>Some songs just<br />feel like <em>home.</em></h3><p>A small collection of sounds for quiet days and long winter nights.</p><Link className="text-link" to="/music">VIEW ALL MUSIC <ArrowUpRight size={16} /></Link></div><div className="favorite-tracks">{songs.slice(0, 3).map((song, index) => <MusicCard key={song.id} song={song} index={index} compact />)}</div></div></section></ScrollReveal>
    <div className="closing-line"><span><MapPin size={14} /> SOMEWHERE UNDER THE WINTER SKY</span><span>THE STORY CONTINUES <ArrowRight size={15} /></span></div>
  </div>
  </main >
}
