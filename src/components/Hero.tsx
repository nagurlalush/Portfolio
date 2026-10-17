import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss, SiTailwindcss,
  SiGit, SiGithub, SiNodedotjs
} from 'react-icons/si'
import './Hero.css'

const floatingIcons = [
  { icon: SiReact, color: '#61dafb', x: 8, y: 20, size: 38, parallax: 30, delay: 0 },
  { icon: SiTypescript, color: '#3178c6', x: 88, y: 15, size: 32, parallax: -25, delay: 0.5 },
  { icon: SiJavascript, color: '#f7df1e', x: 5, y: 65, size: 28, parallax: 45, delay: 1.0 },
  { icon: SiHtml5, color: '#e34c26', x: 92, y: 55, size: 30, parallax: -40, delay: 0.3 },
  { icon: SiCss, color: '#2965f1', x: 85, y: 80, size: 26, parallax: 20, delay: 0.8 },
  { icon: SiTailwindcss, color: '#38bdf8', x: 12, y: 82, size: 34, parallax: -35, delay: 1.2 },
  { icon: SiGit, color: '#f34f29', x: 50, y: 8, size: 24, parallax: 15, delay: 0.6 },
  { icon: SiGithub, color: '#c9d1d9', x: 75, y: 28, size: 28, parallax: -20, delay: 1.4 },
  { icon: SiNodedotjs, color: '#8cc84b', x: 22, y: 40, size: 26, parallax: 25, delay: 0.9 },
]

const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const chars = '!<>-_\\/[]{}—=+*^?#________'

  useEffect(() => {
    let frame = 0
    let timeout: ReturnType<typeof setTimeout>
    const length = text.length

    const animate = () => {
      let output = ''
      for (let i = 0; i < length; i++) {
        if (frame >= i * 2) {
          output += text[i]
        } else {
          output += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      setDisplayText(output)
      if (frame < length * 2) {
        frame++
        requestAnimationFrame(animate)
      }
    }

    timeout = setTimeout(() => {
      requestAnimationFrame(animate)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span>{displayText || ' '}</span>
}

const WordReveal = ({ children, delayOffset = 0 }: { children: string, delayOffset?: number }) => {
  const words = children.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="reveal-clip" style={{ display: 'inline-block', paddingRight: '0.28em' }}>
          <motion.span
            style={{ display: 'inline-block', transformOrigin: 'bottom right' }}
            initial={{ y: '120%', rotateZ: 5 }}
            animate={{ y: 0, rotateZ: 0 }}
            transition={{ duration: 0.9, delay: delayOffset + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Parallax configuration
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Canvas Particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let mouseObj = { x: -1000, y: -1000 }

    // Track mouse specifically for particle repulsion
    const onCanvasMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseObj.x = e.clientX - rect.left
      mouseObj.y = e.clientY - rect.top
    }
    window.addEventListener('mousemove', onCanvasMove)

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      baseX: number; baseY: number;
      alpha: number; size: number; color: string; speedMult: number
    }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const colors = ['#00d4ff', '#a855f7', '#00f5d4', '#7c3aed']

    // More particles, 3 size tiers
    for (let i = 0; i < 120; i++) {
      const tier = Math.random()
      const size = tier > 0.9 ? Math.random() * 3 + 2 : tier > 0.5 ? Math.random() * 2 + 1 : Math.random() + 0.5
      const speedMult = tier > 0.9 ? 1.5 : tier > 0.5 ? 1 : 0.5

      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height

      particles.push({
        x, y, baseX: x, baseY: y,
        vx: (Math.random() - 0.5) * 0.5 * speedMult,
        vy: (Math.random() - 0.5) * 0.5 * speedMult,
        alpha: Math.random() * 0.4 + 0.1,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedMult
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        // Normal movement
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Mouse repulsion logic
        const dx = p.x - mouseObj.x
        const dy = p.y - mouseObj.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const minDist = 120

        if (dist < minDist) {
          const fx = (dx / dist) * (minDist - dist) * 0.02
          const fy = (dy / dist) * (minDist - dist) * 0.02
          p.x += fx
          p.y += fy
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })

      // Connections
      ctx.globalAlpha = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120 && particles[i].size > 1 && particles[j].size > 1) { // Only connect medium/large
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onCanvasMove)
    }
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="grid-bg" />
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Glow orbs */}
      <motion.div
        className="orb orb-blue hero-orb-1"
        style={{ x: useTransform(smoothX, [-1, 1], [-50, 50]), y: useTransform(smoothY, [-1, 1], [-50, 50]) }}
      />
      <motion.div
        className="orb orb-purple hero-orb-2"
        style={{ x: useTransform(smoothX, [-1, 1], [60, -60]), y: useTransform(smoothY, [-1, 1], [60, -60]) }}
      />
      <div className="orb orb-cyan hero-orb-3" />

      {/* Floating tech icons with parallax */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="floating-icon"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            x: useTransform(smoothX, [-1, 1], [-item.parallax, item.parallax]),
            y: useTransform(smoothY, [-1, 1], [-item.parallax, item.parallax])
          }}
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut'
          }}
        >
          <item.icon size={item.size} color={item.color} />
        </motion.div>
      ))}

      <div className="container hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="badge-dot" />
          <ScrambleText text="Available for opportunities" delay={0.4} />
        </motion.div>

        <h1 className="hero-title">
          <WordReveal delayOffset={0.6}>Frontend Developer</WordReveal>
          <br />
          <span className="gradient-text"><WordReveal delayOffset={0.8}>Crafting Modern</WordReveal></span>
          <br />
          <WordReveal delayOffset={1.0}>Web Experiences</WordReveal>
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I build fast, scalable, and beautifully designed web applications
          <br className="hero-br" />
          using modern technologies — React, TypeScript & beyond.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#projects"
            className="btn btn-primary magnetic-btn"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            <span>View Projects</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="btn btn-secondary magnetic-btn"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Contact Me
          </a>
        </motion.div>

        {/* Cinematc Terminal Stats Box */}
        <motion.div
          className="hero-terminal glass-card"
          initial={{ opacity: 0, rotateX: 15, y: 40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="term-header">
            <div className="term-dots">
              <span className="dot-red" />
              <span className="dot-yel" />
              <span className="dot-grn" />
            </div>
            <div className="term-title">visitor@nagur:~</div>
          </div>
          <div className="term-body">
            <div className="term-line">
              <span className="term-prompt">❯</span>
              <span className="term-cmd">./get_stats.sh</span>
            </div>
            <div className="term-output">
              <div className="stat-row"><span className="stat-key">Projects Built:</span> <span className="stat-val gradient-text shimmer-text">3+</span></div>
              <div className="stat-row"><span className="stat-key">Technologies:</span> <span className="stat-val gradient-text shimmer-text">15+</span></div>
              <div className="stat-row"><span className="stat-key">Industry Experience:</span> <span className="stat-val gradient-text shimmer-text">6 mo</span></div>
            </div>
            <div className="term-line">
              <span className="term-prompt">❯</span>
              <span className="term-cursor" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll-hint">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
