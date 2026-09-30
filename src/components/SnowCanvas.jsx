import { useEffect, useRef } from 'react'

export default function SnowCanvas({ density = 85 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0
    let height = 0
    let frame
    let flakes = []
    let lastTime = 0
    let slowFrames = 0
    let running = true
    const makeFlake = (randomY = false) => {
      const depth = Math.random()
      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : -10,
        radius: 0.45 + depth * 2.4,
        speed: 0.18 + depth * 1.1,
        drift: 0.12 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.12 + depth * 0.54,
        blur: depth > 0.82 ? 5 : depth > 0.42 ? 2 : 0,
      }
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      flakes = Array.from({ length: Math.min(width < 700 ? 48 : 115, Math.max(32, Math.floor(width / 11)), density + 30) }, () => makeFlake(true))
      if (motionQuery.matches) draw(0)
    }

    const draw = (time) => {
      context.clearRect(0, 0, width, height)
      const elapsed = time - lastTime
      const delta = Math.min(elapsed / 16.67 || 1, 2)
      if (elapsed > 33 && elapsed < 200) slowFrames++
      else slowFrames = Math.max(0, slowFrames - 1)
      if (slowFrames > 20 && flakes.length > 28) { flakes.length = Math.floor(flakes.length * 0.8); slowFrames = 0 }
      lastTime = time
      flakes.forEach((flake, index) => {
        if (!motionQuery.matches) {
          flake.y += flake.speed * delta
          flake.x += Math.sin(time * 0.0007 + flake.phase) * flake.drift * delta
          if (flake.y > height + 8 || flake.x < -15 || flake.x > width + 15) flakes[index] = makeFlake()
        }
        context.beginPath()
        context.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(255,255,255,${flake.opacity})`
        context.shadowColor = 'rgba(194,230,255,0.7)'
        context.shadowBlur = flake.blur
        context.fill()
      })
      if (!motionQuery.matches && running) frame = requestAnimationFrame(draw)
    }
    const visibility = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(frame) }
      else if (!running && !motionQuery.matches) { running = true; lastTime = 0; frame = requestAnimationFrame(draw) }
    }
    resize()
    if (!motionQuery.matches) frame = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [density])

  return <canvas ref={canvasRef} className="snow-canvas" aria-hidden="true" />
}
