import { useEffect, useRef, useState } from 'react'
import './MagneticCursor.css'

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  
  const [isInteractive, setIsInteractive] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  
  const endX = useRef(window.innerWidth / 2)
  const endY = useRef(window.innerHeight / 2)
  const _x = useRef(window.innerWidth / 2)
  const _y = useRef(window.innerHeight / 2)

  const requestRef = useRef<number>(0)

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none'

    const onMouseMove = (e: MouseEvent) => {
      endX.current = e.clientX
      endY.current = e.clientY
      
      const target = e.target as HTMLElement
      setIsInteractive(
        !!target.closest('a, button, input, textarea, select, .interactive')
      )
    }

    const onMouseEnter = () => setIsHidden(false)
    const onMouseLeave = () => setIsHidden(true)

    const animate = () => {
      // Lerping the ring towards the mouse point
      _x.current += (endX.current - _x.current) * 0.15
      _y.current += (endY.current - _y.current) * 0.15

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${endX.current}px, ${endY.current}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${_x.current}px, ${_y.current}px, 0)`
      }
      if (glowRef.current) {
        // Fast follow for ambient glow, centered (-200px because width is 400px)
        glowRef.current.style.transform = `translate3d(${endX.current - 200}px, ${endY.current - 200}px, 0)`
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(requestRef.current)
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      <div 
        ref={glowRef} 
        className="cursor-ambient-glow" 
        style={{ opacity: isHidden ? 0 : 1 }}
      />
      <div 
        ref={ringRef} 
        className={`magnetic-cursor-ring ${isInteractive ? 'interactive' : ''} ${isHidden ? 'hidden' : ''}`} 
      />
      <div 
        ref={dotRef} 
        className={`magnetic-cursor-dot ${isInteractive ? 'interactive' : ''} ${isHidden ? 'hidden' : ''}`} 
      />
    </>
  )
}
