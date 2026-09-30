import { Pause, Play } from 'lucide-react'
import { useMusic } from '../context/MusicContext'
import WinterCover from './WinterCover'

export default function MusicCard({ song, index = 0, compact = false }) {
  const { currentSong, isPlaying, playSong } = useMusic()
  const active = currentSong?.id === song.id
  return <button className={`music-card ${compact ? 'music-card-compact' : ''} ${active ? 'playing-card' : ''}`} onClick={() => playSong(song)} aria-label={`${active && isPlaying ? 'Pause' : 'Play'} ${song.title}`}>
    <span className="music-card-number">{String(index + 1).padStart(2, '0')}</span>
    <WinterCover cover={song.cover} variant={index} className="music-card-cover" alt={`${song.title} cover`} />
    <span className="music-card-text"><strong>{song.title}</strong><small>{song.artist}</small></span>
    <span className="music-card-end">{active && isPlaying ? <span className="playing-bars" aria-hidden="true"><i /><i /><i /></span> : <span className="music-card-label">LISTEN NOW</span>}<span className="card-play">{active && isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</span></span>
  </button>
}
