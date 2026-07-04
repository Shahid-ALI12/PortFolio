import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems, profile } from '../data'
import { scrollToId } from '../hooks/useLenis'
import { Magnetic } from './ui'

export default function Nav() {
  const [active, setActive] = useState('#about')
  const [open, setOpen] = useState(false)

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const ids = navItems.map((n) => n.href)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.querySelector(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function go(e, href) {
    e.preventDefault()
    setOpen(false)
    scrollToId(href)
  }

  return (
    <>
      <motion.nav
        className="nav glass"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <a className="nav-logo" href="#top" onClick={(e) => go(e, 'body')}>
          <span className="mark">S</span>
          {profile.name}
        </a>

        <div className="nav-links">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={(e) => go(e, n.href)}
              className={active === n.href ? 'active' : ''}
            >
              {n.label}
            </a>
          ))}
        </div>

        <Magnetic strength={0.4}>
          <a className="nav-cta" href="#contact" onClick={(e) => go(e, '#contact')}>
            Let&apos;s talk
          </a>
        </Magnetic>

        <button
          className="nav-burger"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="mobile-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X size={22} />
            </button>
            {navItems.map((n, i) => (
              <motion.a
                key={n.href}
                href={n.href}
                onClick={(e) => go(e, n.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
              >
                {n.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
