import { Pause, Play } from 'lucide-react'
import { useMusicState } from '../context/MusicContext'
import { formatTime } from '../utils/format'
import SongVisual from './SongVisual'

export default function MusicCard({ song, index = 0, compact = false }) {
  const { currentSong, isPlaying, playSong, durations } = useMusicState()
  const active = currentSong?.id === song.id
  const duration = durations?.[song.id] || 0
  return <button className={`music-card ${compact ? 'music-card-compact' : ''} ${active ? 'playing-card' : ''}`} onClick={() => playSong(song)} aria-label={`${active && isPlaying ? 'Pause' : 'Play'} ${song.title}`}>
    <span className="music-card-number">{String(index + 1).padStart(2, '0')}</span>
    <SongVisual isPlaying={active && isPlaying} isActive={active} variant={index} title={song.title} className="music-card-cover" />
    <span className="music-card-text"><strong>{song.title}</strong><small>{song.artist}</small></span>
    <span className="music-card-end">{active && isPlaying ? <span className="playing-bars card-bars" aria-hidden="true"><i /><i /><i /><i /></span> : <><span className="music-card-duration">{formatTime(duration)}</span><span className="music-card-label">LISTEN NOW</span></>}<span className="card-play">{active && isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</span></span>
  </button>
}
