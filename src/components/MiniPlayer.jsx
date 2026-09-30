import { Link, useLocation } from 'react-router-dom'
import { Pause, Play, SkipForward, ArrowUpRight } from 'lucide-react'
import { useMusic } from '../context/MusicContext'
import { formatTime } from './FullPlayer'
import WinterCover from './WinterCover'

export default function MiniPlayer() {
  const { pathname } = useLocation()
  const { currentSong, isPlaying, currentTime, duration, togglePlay, nextSong, error } = useMusic()
  if (!currentSong || pathname === '/music') return null
  return <aside className="mini-player" aria-label="Music player"><WinterCover cover={currentSong.cover} className="mini-cover" alt="Current song cover" /><div className="mini-info"><strong>{currentSong.title}</strong><span>{error || `${formatTime(currentTime)} / ${formatTime(duration)}`}</span></div><div className="mini-actions"><button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button><button onClick={nextSong} aria-label="Next song"><SkipForward size={18} fill="currentColor" /></button><Link to="/music" aria-label="Open full player"><ArrowUpRight size={18} /></Link></div><div className="mini-progress" style={{ width: `${duration ? currentTime / duration * 100 : 0}%` }} /></aside>
}
