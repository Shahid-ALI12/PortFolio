import { about, profile } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="01 — About" title="A bit about me" />

        <div className="grid items-center gap-12 md:grid-cols-5">
          <Reveal className="md:col-span-2">
            <div className="mx-auto w-64 max-w-full">
              {/* Avatar placeholder — apni photo /public mein daal kar
                  yahan <Image> use kar sakte ho */}
              <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-cyan-400/60 to-violet-500/60 p-[1.5px]">
                <div className="glass flex h-full w-full items-center justify-center rounded-3xl">
                  <span className="bg-gradient-to-br from-cyan-400 to-violet-500 bg-clip-text font-mono text-6xl font-bold text-transparent">
                    {initials}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="md:col-span-3">
            <div className="glass space-y-4 rounded-2xl p-6 text-base leading-relaxed text-zinc-300 sm:p-8">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass glass-hover rounded-2xl p-4 text-center"
                >
                  <div className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-zinc-400 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
