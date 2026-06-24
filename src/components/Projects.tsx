import { projects } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { CodeIcon, ExternalLinkIcon, GithubIcon } from "./Icons";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading eyebrow="03 — Projects" title="Things I've built" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 100}>
              <article className="glass glass-hover group flex h-full flex-col overflow-hidden rounded-2xl hover:-translate-y-1">
                <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-transparent">
                  <div className="bg-grid absolute inset-0 opacity-40" />
                  <CodeIcon className="relative h-10 w-10 text-cyan-300/70" />
                  {project.featured && (
                    <span className="absolute right-3 top-3 rounded-full bg-cyan-400/15 px-2 py-0.5 text-xs font-medium text-cyan-300">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                      Live
                    </a>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 transition hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" />
                      Code
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
