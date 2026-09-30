import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Headphones, Music2 } from 'lucide-react'
import FullPlayer from '../components/FullPlayer'
import MusicCard from '../components/MusicCard'
import { songs } from '../data/songs'

export default function Music() {
  const navigate = useNavigate()
  return <main className="music-page page-enter container"><div className="music-page-top"><button className="back-link" onClick={() => { if (window.history.state?.idx > 0) navigate(-1); else navigate('/') }}><ArrowLeft size={17} /> MAIN PAGE</button><span>THE WINTER COLLECTION / 001</span></div><div className="music-intro"><div><span className="kicker"><span className="kicker-line" /> A SOUNDTRACK FOR THE SEASON</span><h1>Between the <em>quiet notes.</em></h1><p>The songs that stay. A little collection for slow mornings, late nights, and everything in between.</p></div><span className="music-intro-icon"><Headphones size={34} strokeWidth={1.2} /></span></div><div className="music-workspace"><div className="music-list-panel"><div className="list-head"><div><span className="kicker">CURATED WITH FEELING</span><h2>The collection <span>({String(songs.length).padStart(2, '0')})</span></h2></div><Music2 size={21} strokeWidth={1.4} /></div><div className="music-track-list">{songs.map((song, index) => <MusicCard key={song.id} song={song} index={index} />)}</div><p className="list-footnote">THE BEST SONGS ARE THE ONES THAT FEEL LIKE A MEMORY.</p></div><FullPlayer /></div><div className="music-end"><span>MADE TO BE LISTENED TO SLOWLY.</span><Link to="/">BACK TO THE STORY <ArrowUpRight size={15} /></Link></div></main>
}
