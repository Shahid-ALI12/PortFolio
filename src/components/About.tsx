import { about, profile } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import CountUp from "./CountUp";
import AuroraHalo from "./about/AuroraHalo";

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
          <Reveal from="left" className="md:col-span-2">
            {/* Apni photo /public mein daal kar yahan src do:
                <AuroraHalo initials={initials} src="/me.jpg" /> */}
            <AuroraHalo initials={initials} />
          </Reveal>

          <Reveal from="right" delay={120} className="md:col-span-3">
            <div className="surface t-muted space-y-4 rounded-2xl p-6 text-base leading-relaxed sm:p-8">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {about.stats.map((stat) => {
                const m = stat.value.match(/^(\d+)(.*)$/);
                return (
                  <div
                    key={stat.label}
                    className="surface surface-hover rounded-2xl p-4 text-center"
                  >
                    <div className="text-gradient text-2xl font-bold sm:text-3xl">
                      {m ? (
                        <CountUp to={Number(m[1])} suffix={m[2]} />
                      ) : (
                        stat.value
                      )}
                    </div>
                    <div className="t-faint mt-1 text-xs sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
