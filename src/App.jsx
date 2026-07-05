import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'

import useLenis from './hooks/useLenis'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Aurora from './components/Aurora'
import ThemeSwitcher from './components/ThemeSwitcher'
import SafeBoundary from './components/SafeBoundary'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Marquee from './components/Marquee'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Stats from './components/Stats'
import Roadmap from './components/Roadmap'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Heavy (WebGL shader lib) — code-split so it never blocks first paint.
const ShaderBackground = lazy(() => import('./components/ShaderBackground'))

export default function App() {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()

  useLenis()

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Cursor />
      <SafeBoundary>
        <Suspense fallback={null}>
          <ShaderBackground />
        </Suspense>
      </SafeBoundary>
      <Aurora />

      {/* Top scroll-progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      {/* Nav hides during loader, appears after */}
      <AnimatePresence>
        {!loading && (
          <Nav />
        )}
      </AnimatePresence>

      <main aria-hidden={loading || undefined}>
        <Hero />
        <About />
        <Marquee />
        <Skills />
        <Projects />
        <Roadmap />
        <Stats />
        <Contact />
      </main>

      <Footer aria-hidden={loading || undefined} />
      <ThemeSwitcher />
    </>
  )
}
