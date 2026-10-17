import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiCss, SiGit, SiPython, SiFlask, SiSqlite } from 'react-icons/si'
import { VscAzureDevops } from 'react-icons/vsc'
import './Projects.css'

export type ProjectItem = {
  title: string
  category: string
  status: string
  description: string
  tech: {
    name: string
    icon: React.ElementType
    color: string
  }[]
  emoji: string
  featured?: boolean
  links?: {
    github?: string
    live?: string
  }
}

const projectsData: ProjectItem[] = [
  {
    title: "CreatorVerse AI",
    category: "Full-Stack AI Marketplace",
    status: "Hackathon Project",
    description: "A generative AI creative marketplace connecting creators and brands through intelligent creator matching, AI-assisted creative briefs, workflow verification, and collaborative production workspaces.",
    tech: [
      { name: "Python", icon: SiPython, color: "#3776ab" },
      { name: "Flask", icon: SiFlask, color: "#e2e8f0" },
      { name: "SQLite", icon: SiSqlite, color: "#0f80cc" }
    ],
    emoji: "🎨",
    featured: true,
    links: {
      github: "https://github.com/nagurlalush/fin_fixed",
      live: "https://fin-fixed.onrender.com/"
    }
  },
  {
    title: "Servizo",
    category: "On-Demand Home Service Platform",
    status: "Currently Building",
    description: "An on-demand home service platform being developed to connect users with service providers through a simple and convenient booking experience.",
    tech: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8" }
    ],
    emoji: "🏠",
    featured: true,
    links: { github: "", live: "" }
  },
  {
    title: "Freelancing Platform",
    category: "Web Application",
    status: "Rebuilding / In Progress",
    description: "A freelancing platform project that I plan to rebuild and develop properly as part of my web development journey.",
    tech: [
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "CSS3", icon: SiCss, color: "#2965f1" }
    ],
    emoji: "💼",
    featured: false,
    links: { github: "", live: "" }
  },
  {
    title: "SDE Internship",
    category: "Sithafal Technologies",
    status: "6 Months",
    description: "Six months of industry experience as an SDE Intern, gaining hands-on exposure to real-world software development, testing, team workflows, and web application development.",
    tech: [
      { name: "Web App Dev", icon: SiReact, color: "#61dafb" },
      { name: "Git Workflow", icon: SiGit, color: "#f34f29" },
      { name: "Azure DevOps", icon: VscAzureDevops, color: "#0078d7" }
    ],
    emoji: "🏢",
    featured: false,
    links: { github: "", live: "" }
  }
]

const ProjectCard = ({ project, index }: { project: ProjectItem; index: number }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"])

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

  const hasGithub = Boolean(project.links?.github && project.links.github.trim() !== '' && project.links.github !== '#')
  const hasLive = Boolean(project.links?.live && project.links.live.trim() !== '' && project.links.live !== '#')
  const hasLinks = hasGithub || hasLive

  return (
    <motion.div
      className="project-card-wrapper"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
    >
      <motion.div
        className="project-card glass-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="project-card-inner" style={{ transform: "translateZ(30px)" }}>
          <div className="project-visual">
            <div className="project-visual-bg shimmer-effect" />
            <span className="project-emoji" style={{ transform: "translateZ(50px)" }}>{project.emoji}</span>
          </div>

          <div className="project-content">
            <div className="project-header-meta">
              <span className="project-category">{project.category}</span>
              <span className="project-status-badge">{project.status}</span>
            </div>

            <h3 className="project-title" style={{ transform: "translateZ(20px)" }}>{project.title}</h3>
            <p className="project-desc">{project.description}</p>

            <div className="project-tech">
              {project.tech.map((t, i) => (
                <span key={i} className="tech-tag" style={{ borderLeftColor: t.color }}>
                  <t.icon size={14} color={t.color} />
                  {t.name}
                </span>
              ))}
            </div>

            {hasLinks && (
              <div className="project-links" style={{ transform: "translateZ(40px)" }}>
                {hasGithub && (
                  <a href={project.links!.github} target="_blank" rel="noopener noreferrer" className="project-link magnetic-btn">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {hasLive && (
                  <a href={project.links!.live} target="_blank" rel="noopener noreferrer" className="project-link primary magnetic-btn">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="section projects" ref={containerRef}>
      <div className="container">
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">// PORTFOLIO</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-desc centered">
            A selection of my recent work focusing on complex interfaces, performance, and user experience.
          </p>
        </motion.div>

        <div className="projects-grid">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <div className="projects-more">
          <a href="https://github.com/nagurlalush" target="_blank" rel="noopener noreferrer" className="btn btn-secondary magnetic-btn">
            View full archive
          </a>
        </div>
      </div>
    </section>
  )
}
