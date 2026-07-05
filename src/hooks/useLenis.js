import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Buttery smooth scrolling via Lenis.
 * Disabled automatically when the user prefers reduced motion.
 * Exposes the instance on window.__lenis so anchor links can scrollTo().
 */
export default function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    window.__lenis = lenis
    document.documentElement.classList.add('lenis')

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
      document.documentElement.classList.remove('lenis')
    }
  }, [])
}

/** Smoothly scroll to a selector (works with or without Lenis). */
export function scrollToId(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -10, duration: 1.3 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
