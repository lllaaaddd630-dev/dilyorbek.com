import { useEffect, useRef } from 'react'
import SnowCanvas from './SnowCanvas'

export default function Background() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(max-width: 800px), (prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const move = event => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.setProperty('--mx', `${(event.clientX / window.innerWidth - .5) * 24}px`)
          ref.current.style.setProperty('--my', `${(event.clientY / window.innerHeight - .5) * 24}px`)
        }
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move) }
  }, [])
  return <div className="site-background" ref={ref} aria-hidden="true"><div className="background-grid" /><div className="background-orb orb-one" /><div className="background-orb orb-two" /><SnowCanvas /></div>
}
