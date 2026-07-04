import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data'
import { SectionHeading } from './ui'

function ProjectCard({ p, i }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 160, damping: 18 })
  const sry = useSpring(ry, { stiffness: 160, damping: 18 })

  function onMove(e) {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ref.current.style.setProperty('--mx', `${px * 100}%`)
    ref.current.style.setProperty('--my', `${py * 100}%`)
    if (!reduce) {
      ry.set((px - 0.5) * 14)
      rx.set(-(py - 0.5) * 14)
    }
  }
  function onLeave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={p.href}
      className="project-card glass"
      style={{ '--pc': p.color, rotateX: srx, rotateY: sry }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="project-glow" />
      <div className="project-top">
        <span className="project-num">{p.num}</span>
        <span className="project-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="project-body">
        <h3>{p.title}</h3>
        <p>{p.desc}</p>
        <div className="project-tags">
          {p.tags.map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export default function Projects() {
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHeading
          index="// 02 — Selected work"
          title="Things I&apos;ve <span class='gradient-text'>built</span>"
          blurb="A few projects I'm proud of. Swap these with your own in src/data.js."
        />
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.num} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
