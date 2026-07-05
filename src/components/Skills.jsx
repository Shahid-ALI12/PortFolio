import { Layout, Server, Database, Cpu } from 'lucide-react'
import { skills } from '../data'
import { SectionHeading, Stagger, StaggerItem } from './ui'

const ICONS = { Layout, Server, Database, Cpu }

const dirs = ['left', 'right', 'left', 'right']

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          index="// 01 — Toolkit"
          title="Skills &amp; <span class='gradient-text'>stack</span>"
          blurb="A pragmatic toolbox, chosen per problem — not per hype cycle."
          dir="up"
        />

        <Stagger className="skills-grid" gap={0.1}>
          {skills.map((s, i) => {
            const Icon = ICONS[s.icon] || Layout
            const d = dirs[i] || 'left'
            return (
              <StaggerItem key={s.title} x={d === 'left' ? -40 : d === 'right' ? 40 : 0} y={d === 'scale' ? 0 : 24} scale={d === 'scale' ? 0.85 : 1}>
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
