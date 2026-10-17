import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss, SiTailwindcss,
  SiGit, SiGithub, SiPython, SiNodedotjs, SiMongodb, SiFlutter,
  SiRender, SiVercel
} from 'react-icons/si'
import { FaJava, FaMicrosoft, FaRocket } from 'react-icons/fa'
import { VscAzureDevops } from 'react-icons/vsc'
import './Skills.css'

type SkillItem = {
  name: string
  level: number // 0 to 100
  icon: React.ElementType
  color: string
  emoji?: string // Optional for concept skills
}

type SkillCategory = {
  title: string
  skills: SkillItem[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", level: 85, icon: SiHtml5, color: "#e34c26" },
      { name: "CSS3", level: 80, icon: SiCss, color: "#2965f1" },
      { name: "JavaScript", level: 80, icon: SiJavascript, color: "#f7df1e" },
      { name: "React", level: 75, icon: SiReact, color: "#61dafb" },
      { name: "TypeScript", level: 70, icon: SiTypescript, color: "#3178c6" },
      { name: "Tailwind CSS", level: 70, icon: SiTailwindcss, color: "#38bdf8" },
    ]
  },
  {
    title: "Programming & Backend",
    skills: [
      { name: "Java", level: 65, icon: FaJava, color: "#f89820" },
      { name: "Python", level: 60, icon: SiPython, color: "#3776ab" },
      { name: "Node.js", level: 60, icon: SiNodedotjs, color: "#8cc84b" },
      { name: "MongoDB", level: 60, icon: SiMongodb, color: "#47a248" },
      { name: "Flutter/Dart", level: 60, icon: SiFlutter, color: "#02569b" },
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", level: 75, icon: SiGit, color: "#f34f29" },
      { name: "GitHub", level: 75, icon: SiGithub, color: "#c9d1d9" },
      { name: "Azure DevOps", level: 60, icon: VscAzureDevops, color: "#0078d7" },
      { name: "SharePoint", level: 60, icon: FaMicrosoft, color: "#038387" },
      { name: "Render", level: 70, icon: SiRender, color: "#46e3b7" },
      { name: "Vercel", level: 75, icon: SiVercel, color: "#ffffff" },
      { name: "Deployment", level: 70, icon: FaRocket, color: "#00d4ff" },
    ]
  }
]

// Extracted 3D Card wrapper
const SkillCard = ({ skill, index }: { skill: SkillItem; index: number }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    x.set(mx / width - 0.5)
    y.set(my / height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="skill-card-wrapper"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      <motion.div
        className="skill-card glass-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="skill-card-inner" style={{ transform: "translateZ(30px)" }}>
          <div className="skill-icon-container" style={{ color: skill.color }}>
            {skill.emoji ? <span className="skill-emoji">{skill.emoji}</span> : null}
            <skill.icon size={42} className="skill-icon" />
            <div className="skill-glow" style={{ backgroundColor: skill.color }} />
          </div>
          
          <h3 className="skill-name">{skill.name}</h3>
          
          <div className="skill-progress-wrap">
            <div className="skill-bar-container">
              <motion.div 
                className="skill-bar-fill"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="skill-level-text">{skill.level}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="section skills" ref={containerRef}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">// TECH STACK</span>
          <h2 className="section-title">
            Tools I <span className="gradient-text">Master</span>
          </h2>
          <p className="section-desc">
            A curated toolkit of modern technologies I use to build exceptional web experiences.
          </p>
        </motion.div>

        <div className="skills-container">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title} className="skill-category">
              <motion.h3 
                className="category-title"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.2 }}
              >
                {category.title}
                <motion.div 
                  className="category-line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + (catIdx * 0.2), ease: 'easeInOut' }}
                />
              </motion.h3>
              
              <div className="skills-grid">
                {category.skills.map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} index={idx} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
