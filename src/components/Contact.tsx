import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import ContactBackdrop from "./ContactBackdrop";
import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden">
      <ContactBackdrop />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24">
        <Reveal>
          <div className="surface-strong rounded-3xl p-8 text-center sm:p-12">
            <p className="t-accent mb-2 font-mono text-sm uppercase tracking-widest">
              04 — Contact
            </p>
            <h2 className="t-base text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s build something together
            </h2>
            <p className="t-muted mx-auto mt-4 max-w-xl">
              Have a project in mind, or just want to say hi? My inbox is always
              open — I&apos;ll get back to you as soon as I can.
            </p>

            <Magnetic className="mt-8">
              <a
                href={`mailto:${profile.email}`}
                className="btn-accent inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold"
              >
                <MailIcon className="h-5 w-5" />
                {profile.email}
              </a>
            </Magnetic>

            <div className="mt-10 flex items-center justify-center gap-3">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="surface surface-hover link flex h-11 w-11 items-center justify-center rounded-full"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="surface surface-hover link flex h-11 w-11 items-center justify-center rounded-full"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a
                href={profile.socials.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="surface surface-hover link flex h-11 w-11 items-center justify-center rounded-full"
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
