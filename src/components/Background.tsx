/**
 * Fixed, full-viewport decorative backdrop.
 * Colorful blurred orbs sit behind everything so the frosted-glass
 * panels on top pick up their colors through backdrop-blur.
 */
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[#070710]" />

      {/* colorful orbs */}
      <div className="animate-blob absolute -left-24 -top-24 h-[30rem] w-[30rem] rounded-full bg-cyan-500/30 blur-[120px]" />
      <div
        className="animate-blob absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-violet-600/30 blur-[120px]"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-fuchsia-600/20 blur-[130px]"
        style={{ animationDelay: "8s" }}
      />
      <div
        className="animate-blob absolute left-0 top-2/3 h-[24rem] w-[24rem] rounded-full bg-blue-600/25 blur-[120px]"
        style={{ animationDelay: "2s" }}
      />

      {/* faint dotted grid overlay */}
      <div className="bg-grid absolute inset-0 opacity-[0.12]" />
    </div>
  );
}
