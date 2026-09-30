import { Link, useLocation } from 'react-router-dom'
import { Pause, Play, SkipForward, ArrowUpRight } from 'lucide-react'
import { useMusicState, useMusicTime } from '../context/MusicContext'
import { formatTime } from '../utils/format'
import SongVisual from './SongVisual'

export default function MiniPlayer() {
  const { pathname } = useLocation()
  const { currentSong, isPlaying, togglePlay, nextSong, error } = useMusicState()
  const { currentTime, duration, seek } = useMusicTime()
  if (!currentSong || pathname === '/music') return null
  return <aside className="mini-player" aria-label="Music player"><SongVisual isPlaying={isPlaying} isActive title={currentSong.title} className="mini-cover" /><div className="mini-info"><strong>{currentSong.title}</strong><span>{error || `${formatTime(currentTime)} / ${duration ? formatTime(duration) : '--:--'}`}</span></div><div className="mini-actions"><button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}</button><button onClick={nextSong} aria-label="Next song"><SkipForward size={18} fill="currentColor" /></button><Link to="/music" aria-label="Open full player"><ArrowUpRight size={18} /></Link></div><input className="mini-seek" type="range" min="0" max={duration || 1} step="0.1" value={Math.min(currentTime, duration || 1)} disabled={!duration} onChange={event => seek(Number(event.target.value))} aria-label="Song progress" style={{ '--range-progress': `${duration ? currentTime / duration * 100 : 0}%` }} /></aside>
}
