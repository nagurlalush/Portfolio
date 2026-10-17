import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Loader.css'

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Disable scroll while loading
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    
    let current = 0
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 10) + 5
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => {
          setLoading(false)
          setTimeout(() => {
            document.body.style.overflow = ''
            onComplete()
          }, 800) // Wait for exit animation
        }, 400)
      }
      setProgress(current)
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loader-overlay"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
        >
          <div className="loader-content">
            <div className="loader-logo">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-name">NL</span>
              <span className="logo-bracket">/&gt;</span>
            </div>
            
            <div className="loader-progress-wrap">
              <div className="loader-progress">
                <div className="loader-bar" style={{ width: `${progress}%` }} />
              </div>
              <div className="loader-percentage">
                {progress.toString().padStart(3, '0')}<span className="loader-percent-sign">%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
