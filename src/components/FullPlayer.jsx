import { Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useMusic } from '../context/MusicContext'
import { songs } from '../data/songs'
import WinterCover from './WinterCover'

export function formatTime(time) {
  if (!Number.isFinite(time) || time < 0) return '0:00'
  return `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`
}

export default function FullPlayer() {
  const { currentSong, isPlaying, currentTime, duration, volume, setVolume, shuffle, repeat, error, playSong, togglePlay, nextSong, previousSong, seek, toggleShuffle, toggleRepeat } = useMusic()
  const song = currentSong || songs[0]
  return <div className="full-player">
    <div className="player-art"><WinterCover cover={song?.cover} variant={songs.findIndex(item => item.id === song?.id)} alt={`${song?.title} cover`} /></div>
    <div className="player-content">
      <div className="player-meta"><span className="kicker"><span className="kicker-line" /> NOW PLAYING</span><span className="player-indicator"><span /> WINTER RADIO</span></div>
      <div className="player-title"><h2>{song?.title}</h2><p>{song?.artist}</p></div>
      {error && <p className="audio-error" role="alert">{error}</p>}
      <div className="player-progress"><input type="range" min="0" max={duration || 1} step="0.1" value={Math.min(currentTime, duration || 1)} onChange={event => seek(Number(event.target.value))} aria-label="Song progress" style={{ '--range-progress': `${duration ? currentTime / duration * 100 : 0}%` }} /><div><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div></div>
      <div className="player-control-row"><button className={shuffle ? 'control-on' : ''} onClick={toggleShuffle} aria-label={`Shuffle ${shuffle ? 'on' : 'off'}`} title="Shuffle"><Shuffle size={19} /></button><button onClick={previousSong} aria-label="Previous song"><SkipBack size={23} fill="currentColor" /></button><button className="main-play" onClick={() => currentSong ? togglePlay() : playSong(songs[0])} aria-label={isPlaying ? 'Pause' : 'Play'}>{isPlaying ? <Pause size={23} fill="currentColor" /> : <Play size={23} fill="currentColor" />}</button><button onClick={nextSong} aria-label="Next song"><SkipForward size={23} fill="currentColor" /></button><button className={repeat !== 'off' ? 'control-on' : ''} onClick={toggleRepeat} aria-label={`Repeat ${repeat}`} title={`Repeat ${repeat}`}><Repeat2 size={19} />{repeat === 'one' && <span className="repeat-one">1</span>}</button></div>
      <div className="volume-row"><Volume2 size={16} /><input type="range" min="0" max="1" step="0.01" value={volume} onChange={event => setVolume(Number(event.target.value))} aria-label="Volume" style={{ '--range-progress': `${volume * 100}%` }} /><span>{Math.round(volume * 100)}%</span></div>
    </div>
  </div>
}
