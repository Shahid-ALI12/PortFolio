import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Palette, Box, X } from 'lucide-react'
import { useTheme, THEMES, DESIGNS, swatchGradient } from '../theme/ThemeProvider'

export default function ThemeSwitcher() {
  const { theme, setTheme, design, setDesign, enable3D, setEnable3D } = useTheme()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return (
    <div className="switcher" ref={wrapRef}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="switcher-panel glass"
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="switcher-head">
              <span>Customize</span>
              <button className="switcher-x" aria-label="Close" onClick={() => setOpen(false)}>
                <X size={15} />
              </button>
            </div>

            <p className="switcher-label">Palette</p>
            <div className="switcher-swatches">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  className={`sw ${theme === t.id ? 'active' : ''}`}
                  style={{ background: swatchGradient(t.id) }}
                  aria-pressed={theme === t.id}
                  title={t.label}
                  onClick={() => setTheme(t.id)}
                />
              ))}
            </div>

            <p className="switcher-label">Design</p>
            <div className="switcher-chips">
              {DESIGNS.map((d) => (
                <button
                  key={d.id}
                  className={`sw-chip ${design === d.id ? 'active' : ''}`}
                  aria-pressed={design === d.id}
                  onClick={() => setDesign(d.id)}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <button
              className={`switcher-3d ${enable3D ? 'on' : ''}`}
              aria-pressed={enable3D}
              onClick={() => setEnable3D(!enable3D)}
            >
              <Box size={16} />
              3D effects
              <span className="switcher-toggle" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="switcher-fab"
        aria-label="Theme settings"
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: open ? 90 : 0 }}
      >
        <Palette size={20} />
      </motion.button>
    </div>
  )
}
