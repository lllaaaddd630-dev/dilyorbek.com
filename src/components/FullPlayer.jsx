import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { useMusicState, useMusicTime } from '../context/MusicContext'
import { songs } from '../data/songs'
import { formatTime } from '../utils/format'
import SongVisual from './SongVisual'

export default function FullPlayer() {
  const { currentSong, isPlaying, volume, isMuted, shuffle, repeat, error, playSong, togglePlay, nextSong, previousSong, toggleShuffle, toggleRepeat, toggleMute, setVolume } = useMusicState()
  const { currentTime, duration, seek } = useMusicTime()
  // Drag paytida faqat lokal preview saqlanadi — audio.currentTime release paytida commit bo‘ladi.
  const [preview, setPreview] = useState(null)
  const previewRef = useRef(null)
  previewRef.current = preview
  const song = currentSong || songs[0]
  const shown = preview ?? currentTime
  const max = duration || 1
  const commit = () => {
    if (previewRef.current !== null) { seek(previewRef.current); setPreview(null) }
  }
  // Sliderdan tashqarida tugonishda ham preview commit bo‘lishi uchun global tinglash.
  useEffect(() => {
    window.addEventListener('pointerup', commit)
    window.addEventListener('pointercancel', commit)
    return () => {
      window.removeEventListener('pointerup', commit)
      window.removeEventListener('pointercancel', commit)
    }
  }, [seek])
  // Track almashganda tarmoq preview qiymati qolmasin.
  useEffect(() => { setPreview(null) }, [currentSong?.id])
  return <div className="full-player">
    <div className="player-art"><SongVisual isPlaying={isPlaying} isActive variant={songs.findIndex(item => item.id === song?.id)} title={song?.title} className="player-note" /></div>
    <div className="player-content">
      <div className="player-meta"><span className="kicker"><span className="kicker-line" /> NOW PLAYING</span><span className="player-indicator"><span /> WINTER RADIO</span></div>
      <div className="player-title"><h2>{song?.title}</h2><p>{song?.artist}</p></div>
      {error && <p className="audio-error" role="alert">{error}</p>}
      <div className="player-progress"><input type="range" min="0" max={max} step="0.1" value={Math.min(shown, max)} disabled={!duration} onChange={event => setPreview(Number(event.target.value))} onPointerUp={commit} onBlur={commit} onKeyUp={commit} aria-label="Song progress" style={{ '--range-progress': `${shown / max * 100}%` }} /><div><span>{formatTime(shown)}</span><span>{duration ? formatTime(duration) : '--:--'}</span></div></div>
      <div className="player-control-row"><button className={shuffle ? 'control-on' : ''} onClick={toggleShuffle} aria-label={`Shuffle ${shuffle ? 'on' : 'off'}`} title="Shuffle"><Shuffle size={19} /></button><button onClick={previousSong} aria-label="Previous song"><SkipBack size={23} fill="currentColor" /></button><button className="main-play" onClick={() => currentSong ? togglePlay() : playSong(songs[0])} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause size={23} fill="currentColor" /> : <Play size={23} fill="currentColor" />}</button><button onClick={nextSong} aria-label="Next song"><SkipForward size={23} fill="currentColor" /></button><button className={repeat !== 'off' ? 'control-on' : ''} onClick={toggleRepeat} aria-label={`Repeat ${repeat}`} title={`Repeat ${repeat}`}><Repeat2 size={19} />{repeat === 'one' && <span className="repeat-one">1</span>}</button></div>
      <div className="volume-row"><button onClick={toggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'} className="volume-mute">{isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button><input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={event => setVolume(Number(event.target.value))} aria-label="Volume" style={{ '--range-progress': `${(isMuted ? 0 : volume) * 100}%` }} /><span>{Math.round((isMuted ? 0 : volume) * 100)}%</span></div>
    </div>
  </div>
}
