import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './About.css'

const highlights = [
  { icon: '⚡', label: 'Web Development', desc: 'Specialized in React & TypeScript' },
  { icon: '🎓', label: 'B.Tech CSE', desc: 'Lateral entry student' },
  { icon: '💼', label: 'SDE Internship', desc: '6 months at Sithafal Technologies' },
  { icon: '🤖', label: 'AI-Powered', desc: 'Integrating AI into modern workflows' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const animProps = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  })

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="orb orb-purple about-orb" />
      <div className="container">
        <div className="about-grid">
          {/* Text side */}
          <div className="about-text">
            <motion.p {...animProps(0)} className="section-label">// About Me</motion.p>
            <motion.h2 {...animProps(0.1)} className="section-title">
              AI-Powered <span className="gradient-text">Web Developer</span>
            </motion.h2>
            <motion.p {...animProps(0.15)} className="about-subtitle" style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.05em', marginBottom: '20px' }}>
              React • TypeScript • AI • Modern Web Development
            </motion.p>
            <motion.p {...animProps(0.2)} className="about-desc">
              I'm <strong>Nagur Lalush</strong>, a B.Tech Computer Science student and AI-powered web developer who enjoys turning ideas into thoughtful, modern digital experiences.
            </motion.p>
            <motion.p {...animProps(0.3)} className="about-desc">
              My journey started with Computer Engineering, where I built the fundamentals of programming and problem-solving. As I explored coding and web development, I moved from learning the basics to building projects with real teams and real-world workflows.
            </motion.p>
            <motion.p {...animProps(0.35)} className="about-desc">
              I built <strong>Servizo</strong> with my college team and later gained six months of professional experience as an SDE Intern at <strong>Sithafal Technologies</strong>. Today, I'm continuing that journey through B.Tech while exploring the intersection of web development and AI — learning, experimenting, and building things that solve real problems.
            </motion.p>

            <motion.div {...animProps(0.4)} className="about-tags">
              {['B.Tech CSE', 'Lateral Entry', 'React', 'TypeScript', 'AI & Web', 'Modern UI/UX'].map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </motion.div>
          </div>

          {/* Visual side */}
          <motion.div {...animProps(0.2)} className="about-visual">
            <div className="about-card-grid">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="highlight-card glass-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 300, delay: 0 } }}
                >
                  <span className="highlight-icon">{item.icon}</span>
                  <span className="highlight-label">{item.label}</span>
                  <span className="highlight-desc">{item.desc}</span>
                </motion.div>
              ))}
            </div>

            <div className="about-code-snippet">
              <div className="snippet-header">
                <div className="snippet-dots">
                  <span /><span /><span />
                </div>
                <span className="snippet-filename">nagur.ts</span>
              </div>
              <pre className="snippet-code"><code>{`const developer = {
  name: "Nagur Lalush",
  role: "AI-Powered Web Developer",
  education: "B.Tech CSE (Lateral Entry)",
  stack: ["React", "TypeScript", "AI"],
  status: "Building & Learning 🚀"
}`}</code></pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
