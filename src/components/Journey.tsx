import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import './Journey.css'

const journeyData = [
  {
    year: "2023 – 2024",
    title: "Started Computer Engineering",
    company: "THE FOUNDATION",
    description: "Started my journey in Computer Engineering, building the fundamentals of programming, problem-solving, and technology.",
    color: "#00d4ff" // Cyan/Blue
  },
  {
    year: "2024 – 2025",
    title: "Discovering Web Development",
    company: "THE EXPLORATION",
    description: "Started exploring coding and web development, moving from learning the fundamentals to building interactive experiences with modern web technologies.",
    color: "#00f5d4" // Mint
  },
  {
    year: "2025",
    title: "Servizo — On-Demand Home Service Platform",
    company: "THE BUILDER",
    description: "Built Servizo, an on-demand home service booking platform, collaboratively with my college team.",
    color: "#f59e0b" // Amber
  },
  {
    year: "2025 – 2026",
    title: "SDE Intern — Sithafal Technologies",
    company: "THE PROFESSIONAL CHAPTER",
    description: "Stepped into a real software development environment through a six-month internship, gaining experience beyond the classroom.",
    color: "#a855f7" // Purple (milestone emphasis)
  },
  {
    year: "2026 – PRESENT",
    title: "B.Tech CSE — Lateral Entry",
    company: "THE NEXT CHAPTER",
    description: "Continued my journey into Computer Science through lateral entry, deepening my understanding of software engineering while exploring AI and modern web development.",
    color: "#00d4ff" // Cyan
  }
]

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Scroll progress specifically for the timeline line
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="journey" className="section journey" ref={sectionRef}>
      <div className="container">
        <motion.div 
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">// MY PATH</span>
          <h2 className="section-title">
            The <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-desc centered">
            A chronological timeline tracing my journey from Computer Engineering to professional experience and AI-powered web development.
          </p>
        </motion.div>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-line-bg" />
          <motion.div 
            className="timeline-line-fill" 
            style={{ scaleY, transformOrigin: "top" }} 
          />
          
          {journeyData.map((item, index) => {
            const isEven = index % 2 === 0
            
            return (
              <motion.div 
                key={item.year}
                className={`timeline-item ${isEven ? 'left' : 'right'}`}
                initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="timeline-content glass-card">
                  <div className="timeline-badge" style={{ backgroundColor: `${item.color}20`, color: item.color, borderColor: `${item.color}40` }}>
                    {item.year}
                  </div>
                  <h3 className="timeline-role">{item.title}</h3>
                  <h4 className="timeline-company">{item.company}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </div>
                
                <div className="timeline-dot" style={{ borderColor: item.color }}>
                  <motion.div 
                    className="timeline-dot-inner" 
                    style={{ backgroundColor: item.color }} 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
