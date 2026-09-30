import { Music2 } from 'lucide-react'

// Gradient + glow + radial light + subtle equalizer (paused-aware). No stickers, no emoji.
export default function SongVisual({ isPlaying = false, isActive = false, className = '', variant = 0, title = '' }) {
  return (
    <div className={`song-visual variant-${variant % 3} ${isActive ? 'song-active' : ''} ${isPlaying ? 'song-playing' : ''} ${className}`} role="img" aria-label={title ? `${title} visual` : 'Song visual'}>
      <span className="sv-glow" aria-hidden="true" />
      <Music2 size={22} strokeWidth={1.5} className="sv-note" aria-hidden="true" />
      <span className={`playing-bars ${isPlaying ? '' : 'bars-paused'}`} aria-hidden="true"><i /><i /><i /><i /></span>
    </div>
  )
}
