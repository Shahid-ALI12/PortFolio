import { Layout, Server, Database, Cpu } from 'lucide-react'
import { skills } from '../data'
import { SectionHeading, Stagger, StaggerItem } from './ui'

const ICONS = { Layout, Server, Database, Cpu }

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          index="// 01 — Toolkit"
          title="Skills &amp; <span class='gradient-text'>stack</span>"
          blurb="A pragmatic toolbox, chosen per problem — not per hype cycle."
        />

        <Stagger className="skills-grid" gap={0.1}>
          {skills.map((s) => {
            const Icon = ICONS[s.icon] || Layout
            return (
              <StaggerItem key={s.title}>
                <div className="skill-card glass">
                  <div className="ico">
                    <Icon size={22} />
                  </div>
                  <h4>{s.title}</h4>
                  <div className="chips">
                    {s.chips.map((c) => (
                      <span className="chip" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
