import { marquee } from '../data'

export default function Marquee() {
  // Rendered twice so the -50% translate loops seamlessly.
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((m, i) => (
          <span className="marquee-item" key={i}>
            <span className="star">✦</span>
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
