import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { profile, heroStats } from '../data'
import { scrollToId } from '../hooks/useLenis'
import { Magnetic } from './ui'

/* Headline split into lines → words for the masked rise reveal. */
const LINES = [
  [{ t: 'I' }, { t: 'craft' }],
  [{ t: 'immersive', g: true }, { t: 'web' }],
  [{ t: 'experiences.' }],
]

function useTypewriter(words, speed = 80, pause = 1600) {
  const reduce = useReducedMotion()
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    if (reduce) return
    const current = words[i % words.length]
    let timeout
    if (!del && text === current) {
      timeout = setTimeout(() => setDel(true), pause)
    } else if (del && text === '') {
      setDel(false)
      setI((v) => v + 1)
    } else {
      timeout = setTimeout(
        () => setText(current.substring(0, del ? text.length - 1 : text.length + 1)),
        del ? 38 : speed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, del, i, words, speed, pause, reduce])

  return reduce ? words[0] : text
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const role = useTypewriter(profile.roles)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  }
  const word = {
    hidden: { y: '115%' },
    show: { y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
  }
  const fade = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <header className="hero section" ref={ref} id="top">
      <motion.div className="container hero-grid" style={{ y, opacity }}>
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={fade}>
            <span className="eyebrow">
              <span className="dot" />
              {role || ' '}
              <span aria-hidden="true">|</span>
            </span>
          </motion.div>

          <h1>
            {LINES.map((line, li) => (
              <span className="line" key={li}>
                {line.map((w, i) => (
                  <span className="word" key={i}>
                    <motion.span
                      style={{ display: 'inline-block' }}
                      variants={word}
                      className={w.g ? 'gradient-text' : undefined}
                    >
                      {w.t}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p className="hero-sub" variants={fade}>
            Hi, I&apos;m {profile.name} — a full-stack developer who turns ideas into
            fast, accessible products with obsessive attention to motion and detail.
          </motion.p>

          <motion.div className="hero-actions" variants={fade}>
            <Magnetic strength={0.3}>
              <button className="btn btn-primary" onClick={() => scrollToId('#work')}>
                View my work <ArrowDownRight />
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button className="btn btn-ghost" onClick={() => scrollToId('#contact')}>
                Get in touch <ArrowUpRight />
              </button>
            </Magnetic>
          </motion.div>

          <motion.div className="hero-meta" variants={fade}>
            {heroStats.map((s) => (
              <div className="item" key={s.v}>
                <div className="k gradient-text">{s.k}</div>
                <div className="v">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="hero-image" aria-hidden="true">
        <div className="hero-img-frame">
          <img src="/hero-person.jpeg" alt="Shahid Ali" className="hero-img" />
          <div className="hero-img-glow" />
        </div>
      </div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="mouse" />
        Scroll
      </motion.div>
    </header>
  )
}
