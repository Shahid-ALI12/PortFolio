import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react'
import { profile, socials } from '../data'
import { Reveal, Magnetic } from './ui'

const ICONS = { Github, Linkedin, Twitter, Mail }

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal>
          <span className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
            <span className="dot" />
            {profile.location}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 style={{ marginTop: 24 }}>
            Let&apos;s build
            <br />
            <span className="gradient-text">something great.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Magnetic strength={0.25}>
            <a className="mailto glass" href={`mailto:${profile.email}`}>
              <Mail size={22} />
              {profile.email}
              <ArrowUpRight size={22} />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="socials">
            {socials.map((s) => {
              const Icon = ICONS[s.icon] || Mail
              return (
                <Magnetic key={s.label} strength={0.5}>
                  <a
                    className="social-btn"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                  >
                    <Icon size={20} />
                  </a>
                </Magnetic>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
