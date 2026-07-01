import { Check } from 'lucide-react'
import { highlights } from '../data'
import { Reveal } from './ui'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="dot" />
              About me
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="about-lead">
              I&apos;m a full-stack developer who believes great software is
              <b className="gradient-text"> felt</b>, not just used — where every
              transition, state and pixel has intent.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="about-body">
              For 5+ years I&apos;ve shipped products end-to-end: architecting APIs,
              modelling data, and obsessing over the front-end craft that makes them a
              joy to use. I care deeply about performance, accessibility and the small
              details that separate &ldquo;works&rdquo; from &ldquo;wow&rdquo;.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="about-card glass">
            <h4>What I bring</h4>
            <ul>
              {highlights.map((h) => (
                <li key={h}>
                  <Check />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
