import { projects } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TiltCard from "./TiltCard";
import { CodeIcon, ExternalLinkIcon, GithubIcon } from "./Icons";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="03 — Projects" title="Things I've built" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} from="scale" delay={(i % 3) * 100}>
              <TiltCard>
                <article className="surface surface-hover card-shine group flex h-full flex-col overflow-hidden rounded-2xl">
                  <div
                    className="relative flex h-40 items-center justify-center overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), color-mix(in srgb, var(--accent-2) 14%, transparent))",
                    }}
                  >
                    <div className="bg-grid absolute inset-0 opacity-60" />
                    <CodeIcon className="t-accent relative h-10 w-10" />
                    {project.featured && (
                      <span className="accent-soft absolute right-3 top-3 rounded-full px-2 py-0.5 text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="t-base text-lg font-semibold">
                      {project.title}
                    </h3>
                    <p className="t-muted mt-2 flex-1 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="chip rounded-md px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div
                      className="mt-5 flex items-center gap-4 border-t pt-4"
                      style={{ borderColor: "var(--chip-border)" }}
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="t-accent inline-flex items-center gap-1.5 text-sm font-medium"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                        Live
                      </a>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="link inline-flex items-center gap-1.5 text-sm font-medium"
                      >
                        <GithubIcon className="h-4 w-4" />
                        Code
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
