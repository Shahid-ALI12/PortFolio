import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor: a sharp dot + a lagging ring that grows over
 * interactive elements. Only active on fine-pointer (mouse) devices.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add('has-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target
      const interactive = t.closest(
        'a, button, [data-cursor], input, textarea, .project-card',
      )
      setHover(Boolean(interactive))
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hover ? 1.7 : 1, opacity: hover ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />
    </>
  )
}
