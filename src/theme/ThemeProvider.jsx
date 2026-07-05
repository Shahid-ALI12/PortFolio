import { createContext, useContext, useEffect, useMemo, useState } from 'react'

/* Palette (color) axis — mirrors the [data-theme] blocks in index.css */
export const THEMES = [
  { id: 'neon', label: 'Dark Neon' },
  { id: 'light', label: 'Light' },
  { id: 'aurora', label: 'Aurora' },
  { id: 'cyber', label: 'Cyber HUD' },
  { id: 'glass', label: 'Glassmorphism' },
]

/* Design (shape/structure) axis — mirrors the [data-design] blocks */
export const DESIGNS = [
  { id: 'soft', label: 'Soft' },
  { id: 'sharp', label: 'Sharp' },
  { id: 'round', label: 'Round' },
  { id: 'glass', label: 'Glass' },
]

/* Accent color trios per palette — consumed by the WebGL layers (Scene3D + shader bg)
   and by the switcher swatches. Keep in sync with index.css [data-theme] blocks. */
export const PALETTE = {
  neon: ['#22d3ee', '#a855f7', '#ec4899'],
  light: ['#0ea5e9', '#8b5cf6', '#ec4899'],
  aurora: ['#6ee7ff', '#8b7bff', '#ff8ad1'],
  cyber: ['#00ffd0', '#00b3ff', '#ff2e88'],
  glass: ['#a0c4ff', '#bdb2ff', '#ffc6ff'],
}

export const swatchGradient = (id) => {
  const [a, b, c] = PALETTE[id] || PALETTE.neon
  return `linear-gradient(120deg, ${a}, ${b} 50%, ${c})`
}

const K_THEME = 'shahid.theme'
const K_DESIGN = 'shahid.design'
const K_3D = 'shahid.threeD'

const read = (k, f) => {
  try {
    return localStorage.getItem(k) || f
  } catch {
    return f
  }
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const el = typeof document !== 'undefined' ? document.documentElement : null

  const [theme, setTheme] = useState(() => (el && el.getAttribute('data-theme')) || read(K_THEME, 'neon'))
  const [design, setDesign] = useState(() => (el && el.getAttribute('data-design')) || read(K_DESIGN, 'soft'))
  const [enable3D, setEnable3D] = useState(() => {
    // default on, but off if the user stored a preference or prefers reduced motion
    try {
      const stored = localStorage.getItem(K_3D)
      if (stored !== null) return stored === '1'
    } catch {
      /* ignore */
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return true
  })

  useEffect(() => {
    if (!el) return
    el.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(K_THEME, theme)
    } catch {
      /* ignore */
    }
    // keep mobile browser chrome in sync with the palette
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', getComputedStyle(el).getPropertyValue('--bg').trim() || '#06070d')
  }, [theme, el])

  useEffect(() => {
    if (!el) return
    el.setAttribute('data-design', design)
    try {
      localStorage.setItem(K_DESIGN, design)
    } catch {
      /* ignore */
    }
  }, [design, el])

  useEffect(() => {
    try {
      localStorage.setItem(K_3D, enable3D ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [enable3D])

  const value = useMemo(
    () => ({ theme, setTheme, design, setDesign, enable3D, setEnable3D, colors: PALETTE[theme] || PALETTE.neon }),
    [theme, design, enable3D],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>')
  return ctx
}
