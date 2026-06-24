import { skills } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="02 — Skills" title="Technologies I work with" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={i * 100}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
