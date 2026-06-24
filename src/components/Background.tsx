/**
 * Fixed, full-viewport decorative backdrop.
 * Orb colors + page base come from the active theme's CSS tokens,
 * so switching themes recolors the whole background.
 */
const orbs = [
  { color: "var(--orb-1)", pos: "-left-24 -top-24 h-[30rem] w-[30rem]", delay: "0s" },
  { color: "var(--orb-2)", pos: "right-0 top-1/4 h-[28rem] w-[28rem]", delay: "4s" },
  { color: "var(--orb-3)", pos: "bottom-0 left-1/3 h-[32rem] w-[32rem]", delay: "8s" },
  { color: "var(--orb-4)", pos: "left-0 top-2/3 h-[24rem] w-[24rem]", delay: "2s" },
];

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ background: "var(--page-bg)" }}
      />

      {orbs.map((o, i) => (
        <div
          key={i}
          className={`animate-blob absolute rounded-full ${o.pos}`}
          style={{
            background: o.color,
            filter: "blur(var(--orb-blur))",
            animationDelay: o.delay,
          }}
        />
      ))}

      <div className="bg-grid absolute inset-0" />
    </div>
  );
}
