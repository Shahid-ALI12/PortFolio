import { profile } from "@/lib/data";
import {
  ArrowUpRightIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  TwitterIcon,
} from "./Icons";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="max-w-3xl">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          <p className="mt-4 text-xl font-medium text-zinc-300 sm:text-2xl">
            {profile.role}
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {profile.tagline}
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
            <MapPinIcon className="h-4 w-4" />
            {profile.location}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
            >
              View My Work
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.resumeUrl}
              className="glass glass-hover inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              <DownloadIcon className="h-4 w-4" />
              Download CV
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-zinc-300">
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
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="glass glass-hover flex h-11 w-11 items-center justify-center rounded-full hover:text-white"
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
