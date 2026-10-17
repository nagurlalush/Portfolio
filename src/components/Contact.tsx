import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import MagneticButton from './MagneticButton'
import './Contact.css'

const contactLinks = [
  { icon: FiGithub, name: 'GitHub', href: 'https://github.com/nagurlalush', color: '#00d4ff', value: '@nagurlalush' },
  { icon: FiLinkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/in/nagur-lalush', color: '#0a66c2', value: 'Nagur-Lalush' },
  { icon: FiMail, name: 'Email', href: 'mailto:nagurlalush@gmail.com', color: '#a855f7', value: 'nagurlalush@gmail.com' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="orb orb-blue contact-orb-1" />
      <div className="orb orb-purple contact-orb-2" />
      <div className="container">
        <motion.div
          className="contact-inner"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact-hero">
            <p className="section-label">// Contact</p>
            <h2 className="contact-title">
              Let's Build Something
              <br />
              <span className="gradient-text">Amazing Together</span>
            </h2>
            <p className="contact-sub">
              I'm always open to interesting conversations, collaborations, or new opportunities.
              Whether you have a project idea or just want to connect — I'd love to hear from you.
            </p>

            <div className="contact-cta">
              <MagneticButton
                href="mailto:nagurlalush@gmail.com"
                className="btn btn-primary contact-say-hello-btn"
                strength={0.25}
              >
                <span>Say Hello</span>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </MagneticButton>
            </div>
          </div>

          <div className="contact-links">
            {contactLinks.map((link, index) => (
              <MagneticButton
                key={link.name}
                href={link.href}
                className="contact-card-btn"
                strength={0.12}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ width: '100%', textDecoration: 'none' }}
              >
                <motion.div
                  className="contact-card glass-card"
                  style={{ '--card-accent': link.color } as React.CSSProperties}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.15 + (index * 0.08), ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="contact-icon-wrap" style={{ color: link.color }}>
                    <link.icon size={22} />
                    <div className="contact-icon-glow" style={{ backgroundColor: link.color }} />
                  </div>
                  <div className="contact-info">
                    <h3 className="contact-platform">{link.name}</h3>
                    <p className="contact-username">{link.value}</p>
                  </div>
                  <div className="contact-arrow">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              </MagneticButton>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
