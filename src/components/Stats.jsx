import { stats } from '../data'
import { Counter, Stagger, StaggerItem } from './ui'

export default function Stats() {
  return (
    <section className="section" style={{ paddingBlock: 'clamp(48px, 7vw, 90px)' }}>
      <div className="container">
        <Stagger className="stats-grid" gap={0.1}>
          {stats.map((s, i) => (
            <StaggerItem
              key={s.label}
              y={0}
              x={0}
              scale={0.6}
            >
              <div className="stat glass">
                <div className="num gradient-text">
                  <Counter to={s.num} suffix={s.suffix} />
                </div>
                <div className="lbl">{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
