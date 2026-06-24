import { skills } from "@/lib/data";

// Decorative only — the accessible skill list lives in the grid below.
const items = Array.from(new Set(skills.flatMap((g) => g.items)));

export default function Marquee() {
  const row = [...items, ...items];

  return (
    <div aria-hidden className="marquee-mask mt-10 overflow-hidden">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span
            key={i}
            className="chip mr-3 whitespace-nowrap rounded-lg px-4 py-2 text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
