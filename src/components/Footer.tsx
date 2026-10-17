import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="container footer-inner">
        <motion.div
          className="footer-brand"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="footer-logo">
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">NL</span>
            <span className="logo-bracket">/&gt;</span>
          </span>
          <p className="footer-copy">© 2026 Nagur Lalush. Built with React & TypeScript.</p>
        </motion.div>

        <motion.div
          className="footer-links"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <a href="https://github.com/nagurlalush" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href="https://linkedin.com/in/nagur" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href="mailto:nagur@example.com" className="footer-icon" aria-label="Email">
            <FiMail size={18} />
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
