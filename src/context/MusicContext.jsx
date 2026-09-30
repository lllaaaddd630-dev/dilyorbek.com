import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { songs } from '../data/songs'

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const songRef = useRef(null)
  const shuffleRef = useRef(false)
  const repeatRef = useRef('off')
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState('off')
  const [error, setError] = useState('')

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return
    songRef.current = currentSong
    setError('')
    setCurrentTime(0)
    setDuration(0)
    audio.src = currentSong.audio
    audio.load()
    audio.play().catch(() => { /* Audio errors are handled by onError. */ })
  }, [currentSong])

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume }, [volume])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (!songRef.current) { setCurrentSong(songs[0]); return }
    if (audio.paused) { setError(''); audio.play().catch(() => setError('Unable to load this song. Add its audio file to public/media.')) }
    else audio.pause()
  }

  const playSong = song => {
    if (songRef.current?.id === song.id) togglePlay()
    else { songRef.current = song; setCurrentSong(song) }
  }

  const nextSong = () => {
    if (!songs.length) return
    const index = songs.findIndex(song => song.id === songRef.current?.id)
    let next = (index + 1) % songs.length
    if (shuffleRef.current && songs.length > 1) {
      do { next = Math.floor(Math.random() * songs.length) } while (next === index)
    }
    songRef.current = songs[next]
    setCurrentSong(songs[next])
  }

  const previousSong = () => {
    if (audioRef.current?.currentTime > 3) { seek(0); return }
    const index = songs.findIndex(song => song.id === songRef.current?.id)
    const song = songs[(index - 1 + songs.length) % songs.length]
    songRef.current = song
    setCurrentSong(song)
  }

  const seek = time => {
    if (!audioRef.current || !Number.isFinite(time)) return
    audioRef.currentTime = time
    setCurrentTime(time)
  }

  const toggleShuffle = () => setShuffle(value => { shuffleRef.current = !value; return !value })
  const toggleRepeat = () => setRepeat(value => {
    const next = value === 'off' ? 'all' : value === 'all' ? 'one' : 'off'
    repeatRef.current = next
    return next
  })
  const handleEnded = () => {
    if (repeatRef.current === 'one') { seek(0); audioRef.current.play().catch(() => {}); return }
    const index = songs.findIndex(song => song.id === songRef.current?.id)
    if (repeatRef.current === 'off' && index === songs.length - 1) { setIsPlaying(false); return }
    nextSong()
  }

  return (
    <MusicContext.Provider value={{ currentSong, isPlaying, currentTime, duration, volume, setVolume, shuffle, repeat, error, playSong, togglePlay, nextSong, previousSong, seek, toggleShuffle, toggleRepeat }}>
      {children}
      <audio ref={audioRef} preload="metadata" onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)} onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)} onEnded={handleEnded} onPause={() => setIsPlaying(false)} onPlay={() => setIsPlaying(true)} onError={() => { setIsPlaying(false); setError('Unable to load this song. Add its audio file to public/media.') }} />
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const context = useContext(MusicContext)
  if (!context) throw new Error('useMusic must be used within MusicProvider')
  return context
}
