import { useRef, useState, useEffect } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

/* Direction map for different entrance animations */
const directionMap = {
  up:    { y: 32, x: 0, scale: 1 },
  down:  { y: -32, x: 0, scale: 1 },
  left:  { x: -40, y: 0, scale: 1 },
  right: { x: 40, y: 0, scale: 1 },
  scale: { scale: 0.85, y: 0, x: 0 },
  none:  { y: 0, x: 0, scale: 1 },
}

/* ---------- Reveal: configurable direction ---------- */
export function Reveal({ children, delay = 0, y = 28, dir, className, as = 'div' }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div
  const d = directionMap[dir] || { y: y || 28, x: 0, scale: 1 }
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: d.y, x: d.x, scale: d.scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/* ---------- Stagger container + item (with direction support) ---------- */
export function Stagger({ children, className, gap = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, y = 24, x = 0, scale = 1 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce
          ? { opacity: 0 }
          : { opacity: 0, y, x, scale },
        show: {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Magnetic: element drifts toward the cursor ---------- */
export function Magnetic({ children, strength = 0.35, className }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  function onMove(e) {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      data-cursor="lg"
    >
      {children}
    </motion.div>
  )
}

/* ---------- Count-up number when in view ---------- */
export function Counter({ to = 0, suffix = '', duration = 1600 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-60px' })
  const reduce = useReducedMotion()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setVal(to)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/* ---------- Section heading ---------- */
export function SectionHeading({ index, title, blurb, dir }) {
  return (
    <div className="sec-head">
      <Reveal dir={dir || 'up'}>
        <span className="index">{index}</span>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
      </Reveal>
      {blurb && (
        <Reveal delay={0.1} dir={dir || 'up'}>
          <p>{blurb}</p>
        </Reveal>
      )}
    </div>
  )
}


