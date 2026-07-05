import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { roadmap } from '../data'
import { SectionHeading, Reveal } from './ui'

/* ---- Single milestone item ---- */
function Milestone({ item, index, total }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })
  const isLeft = index % 2 === 0

  const xStart = isLeft ? -60 : 60
  const xEnd = 0

  return (
    <div
      ref={ref}
      className={`roadmap-item ${isLeft ? 'roadmap-left' : 'roadmap-right'}`}
    >
      {/* Dot on the center line */}
      <motion.div
        className="roadmap-dot"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="roadmap-dot-inner" />
        <span className="roadmap-dot-ring" />
      </motion.div>

      {/* Card */}
      <motion.div
        className="roadmap-card glass"
        initial={reduce ? { opacity: 0 } : { opacity: 0, x: xStart, y: 20 }}
        animate={inView ? { opacity: 1, x: xEnd, y: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {item.badge && (
          <span className="roadmap-badge" style={{ '--badge-color': item.badgeColor || 'var(--accent)' }}>
            {item.badge}
          </span>
        )}
        <h3 className="roadmap-card-title">{item.title}</h3>
        <p className="roadmap-card-desc">{item.desc}</p>
        {item.tags && (
          <div className="roadmap-card-tags">
            {item.tags.map((t) => (
              <span className="chip" key={t}>{t}</span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

/* ---- Year block with its milestones ---- */
function YearBlock({ year, milestones, yearIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-40px' })
  const reduce = useReducedMotion()

  return (
    <div className="roadmap-year-block" ref={ref}>
      {/* Big year label */}
      <motion.div
        className="roadmap-year"
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 30 }}
        animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="roadmap-year-num gradient-text">{year}</span>
      </motion.div>

      {/* Milestones under this year */}
      <div className="roadmap-milestones">
        {milestones.map((m, i) => (
          <Milestone key={m.title} item={m} index={i} total={milestones.length} />
        ))}
      </div>
    </div>
  )
}

/* ---- Progress line that fills on scroll ---- */
function ProgressBar({ containerRef }) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 30%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="roadmap-line-fill"
      style={reduce ? { scaleY: 1 } : { scaleY }}
    />
  )
}

/* ---- Main Roadmap Section ---- */
export default function Roadmap() {
  const sectionRef = useRef(null)

  return (
    <section className="section roadmap-section" id="roadmap" ref={sectionRef}>
      <div className="container">
        <SectionHeading
          index="// 03 — My journey"
          title="The <span class='gradient-text'>Roadmap</span>"
          blurb="Key milestones and growth over the years — scroll to explore."
        />
      </div>

      <div className="roadmap-timeline">
        {/* Static background line */}
        <div className="roadmap-line" />

        {/* Animated progress fill */}
        <ProgressBar containerRef={sectionRef} />

        {/* Year blocks */}
        {roadmap.map((block, i) => (
          <YearBlock
            key={block.year}
            year={block.year}
            milestones={block.milestones}
            yearIndex={i}
          />
        ))}
      </div>
    </section>
  )
}