import { useEffect, useState } from 'react'

// Reads the real duration of a track via metadata preload only — no full download.
// Result is cached in a module map so re-mounts don't re-probe the file.
const cache = new Map()

export function useSongDuration(audio) {
  const [duration, setDuration] = useState(() => cache.get(audio) || 0)
  useEffect(() => {
    if (!audio || cache.has(audio)) return undefined
    const probe = new Audio()
    probe.preload = 'metadata'
    const release = () => { probe.removeAttribute('src'); probe.load() }
    const onMeta = () => {
      if (Number.isFinite(probe.duration) && probe.duration > 0) {
        cache.set(audio, probe.duration)
        setDuration(probe.duration)
      }
    }
    probe.addEventListener('loadedmetadata', onMeta)
    probe.addEventListener('error', release)
    probe.src = audio
    return () => {
      probe.removeEventListener('loadedmetadata', onMeta)
      probe.removeEventListener('error', release)
      release()
    }
  }, [audio])
  return duration
}
