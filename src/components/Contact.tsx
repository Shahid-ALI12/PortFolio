import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <Reveal>
          <div className="glass-strong rounded-3xl p-8 text-center sm:p-12">
            <p className="mb-2 font-mono text-sm uppercase tracking-widest text-cyan-400">
              04 — Contact
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&apos;s build something together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-300">
              Have a project in mind, or just want to say hi? My inbox is always
              open — I&apos;ll get back to you as soon as I can.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-7 py-3.5 font-semibold text-black transition hover:bg-cyan-300"
            >
              <MailIcon className="h-5 w-5" />
              {profile.email}
            </a>

            <div className="mt-10 flex items-center justify-center gap-3 text-zinc-300">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full hover:text-white"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full hover:text-white"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={profile.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full hover:text-white"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
