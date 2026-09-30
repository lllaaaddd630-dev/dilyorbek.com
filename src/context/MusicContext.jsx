import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { songs } from '../data/songs'

const MusicStateContext = createContext(null)
const MusicTimeContext = createContext(null)

function readStored(key, fallback) {
  try { const value = localStorage.getItem(key); return value === null ? fallback : value } catch { return fallback }
}

export function MusicProvider({ children }) {
  // Single Audio element for the whole app — never recreated, so seek state and
  // playback survive route changes and listeners are attached exactly once.
  const audioRef = useRef(null)
  if (!audioRef.current) audioRef.current = new Audio()
  const songRef = useRef(null)
  const shuffleRef = useRef(false)
  const repeatRef = useRef('off')
  const isTransitioningRef = useRef(false)

  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(() => Number(readStored('dilyorbek-volume', 0.7)))
  const [isMuted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(() => readStored('dilyorbek-shuffle', 'false') === 'true')
  const [repeat, setRepeat] = useState(() => readStored('dilyorbek-repeat', 'off'))
  const [error, setError] = useState('')
  // Time lives in its own context value so ~4Hz timeupdate ticks never re-render
  // components that only care about song/controls state.
  const [time, setTime] = useState({ currentTime: 0, duration: 0 })

  const play = () => audioRef.current?.play().catch(() => { /* autoplay/policy errors surface via onError */ })

  // Load a new source. Called only when the song identity changes.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return
    songRef.current = currentSong
    isTransitioningRef.current = true
    setError('')
    setTime({ currentTime: 0, duration: 0 })
    audio.src = currentSong.audio
    audio.load()
    play().finally(() => { isTransitioningRef.current = false })
  }, [currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = isMuted ? 0 : volume
    try { localStorage.setItem('dilyorbek-volume', String(volume)) } catch { /* storage optional */ }
  }, [volume, isMuted])

  useEffect(() => { try { localStorage.setItem('dilyorbek-shuffle', String(shuffle)) } catch { /* storage optional */ } }, [shuffle])
  useEffect(() => { try { localStorage.setItem('dilyorbek-repeat', repeat) } catch { /* storage optional */ } }, [repeat])

  const seek = seconds => {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(seconds)) return
    const clamped = Math.max(0, Math.min(seconds, audio.duration || seconds))
    audio.currentTime = clamped
    setTime(previous => ({ ...previous, currentTime: clamped }))
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!songRef.current) { setCurrentSong(songs[0]); return }
    if (isTransitioningRef.current) return // guard against rapid double play/pause
    if (audio.paused) { setError(''); play() }
    else audio.pause()
  }

  const playSong = song => {
    if (songRef.current?.id === song.id) togglePlay()
    else setCurrentSong(song)
  }

  const nextSong = () => {
    if (!songs.length) return
    const index = songs.findIndex(song => song.id === songRef.current?.id)
    let next = (index + 1) % songs.length
    if (shuffleRef.current && songs.length > 1) {
      do { next = Math.floor(Math.random() * songs.length) } while (next === index)
    }
    setCurrentSong(songs[next])
  }

  const previousSong = () => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) { seek(0); return }
    if (!songs.length) return
    const index = songs.findIndex(song => song.id === songRef.current?.id)
    setCurrentSong(index === -1 ? songs[0] : songs[(index - 1 + songs.length) % songs.length])
  }

  const toggleShuffle = () => setShuffle(value => { shuffleRef.current = !value; return !value })
  const toggleRepeat = () => setRepeat(value => {
    const next = value === 'off' ? 'all' : value === 'all' ? 'one' : 'off'
    repeatRef.current = next
    return next
  })
  const toggleMute = () => setMuted(value => !value)
  const nudge = seconds => seek((audioRef.current?.currentTime || 0) + seconds)
  const changeVolume = delta => setVolume(value => Math.max(0, Math.min(1, Math.round((value + delta) * 100) / 100)))

  const handleEnded = () => {
    if (repeatRef.current === 'one') { seek(0); play(); return }
    const index = songs.findIndex(song => song.id === songRef.current?.id)
    if (repeatRef.current === 'off' && index === songs.length - 1) { setIsPlaying(false); return }
    nextSong()
  }

  // Audio events are attached once, in code, with real cleanup — no <audio> in JSX.
  useEffect(() => {
    const audio = audioRef.current
    const onTime = () => setTime(previous => ({ ...previous, currentTime: audio.currentTime }))
    const onMeta = () => setTime({ currentTime: audio.currentTime, duration: Number.isFinite(audio.duration) ? audio.duration : 0 })
    const onEnded = () => handleEnded()
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onError = () => { setIsPlaying(false); setError('Unable to play this song') }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('loadeddata', onMeta)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('loadeddata', onMeta)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
    }
  }, [])

  // Lock-screen / notification controls on mobile.
  useEffect(() => {
    if (!('mediaSession' in navigator) || !currentSong) return
    navigator.mediaSession.metadata = new MediaMetadata({ title: currentSong.title, artist: currentSong.artist })
    const handlers = [['play', () => play()], ['pause', () => audioRef.current?.pause()], ['previoustrack', previousSong], ['nexttrack', nextSong]]
    handlers.forEach(([action, handler]) => { try { navigator.mediaSession.setActionHandler(action, handler) } catch { /* unsupported action */ } })
    return () => { if ('mediaSession' in navigator) navigator.mediaSession.metadata = null }
  }, [currentSong])

  // Desktop shortcuts: space, arrows. Skips real form controls.
  useEffect(() => {
    const onKeyDown = event => {
      const target = event.target
      if (target instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)) return
      if (event.code === 'Space') { event.preventDefault(); togglePlay() }
      else if (event.code === 'ArrowRight') { event.preventDefault(); nudge(5) }
      else if (event.code === 'ArrowLeft') { event.preventDefault(); nudge(-5) }
      else if (event.code === 'ArrowUp') { event.preventDefault(); changeVolume(0.05) }
      else if (event.code === 'ArrowDown') { event.preventDefault(); changeVolume(-0.05) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Release the audio session when the app unmounts (iOS Safari keeps it alive otherwise).
  useEffect(() => () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.src = ''
    audio.load()
  }, [])

  const stateValue = { currentSong, isPlaying, playlist: songs, volume, isMuted, shuffle, repeat, error, playSong, togglePlay, nextSong, previousSong, toggleShuffle, toggleRepeat, toggleMute, setVolume }
  const timeValue = { ...time, seek }

  return (
    <MusicStateContext.Provider value={stateValue}>
      <MusicTimeContext.Provider value={timeValue}>{children}</MusicTimeContext.Provider>
    </MusicStateContext.Provider>
  )
}

export function useMusicState() {
  const context = useContext(MusicStateContext)
  if (!context) throw new Error('useMusicState must be used within MusicProvider')
  return context
}

export function useMusicTime() {
  const context = useContext(MusicTimeContext)
  if (!context) throw new Error('useMusicTime must be used within MusicProvider')
  return context
}
