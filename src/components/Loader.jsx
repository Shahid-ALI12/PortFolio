import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const dur = 1400
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 350)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="loader-inner">
        <div className="loader-count">
          <span className="gradient-text">{count}</span>
        </div>
        <div className="loader-bar">
          <motion.span
            initial={{ width: '0%' }}
            animate={{ width: `${count}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
        <div className="loader-label">Loading experience</div>
      </div>
    </motion.div>
  )
}
