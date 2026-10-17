import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
  href?: string
  strength?: number
  target?: string
  rel?: string
  style?: React.CSSProperties
}

export default function MagneticButton({ 
  children, 
  className = '', 
  onClick, 
  href,
  strength = 0.2,
  target,
  rel,
  style
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const middleX = clientX - (rect.left + rect.width / 2)
    const middleY = clientY - (rect.top + rect.height / 2)
    // Move the button slightly towards the mouse
    setPosition({ x: middleX * strength, y: middleY * strength })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const innerContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a 
        href={href} 
        onClick={onClick} 
        className={className} 
        target={target}
        rel={rel}
        style={style}
      >
        {innerContent}
      </a>
    )
  }

  return (
    <button 
      onClick={onClick} 
      className={className} 
      style={style}
    >
      {innerContent}
    </button>
  )
}
