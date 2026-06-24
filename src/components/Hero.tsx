import { profile } from "@/lib/data";
import Hero3D from "./Hero3D";
import RoleRotator from "./RoleRotator";
import Magnetic from "./Magnetic";
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
      {/* 3D scene — full + faint on mobile, right side on desktop */}
      <div className="pointer-events-none absolute inset-0 opacity-50 lg:left-1/3 lg:opacity-100">
        <Hero3D />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="hero-rise max-w-2xl">
          <span
            style={{ animationDelay: "0ms" }}
            className="surface inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="t-muted">{profile.availability}</span>
          </span>

          <h1
            style={{ animationDelay: "90ms" }}
            className="t-base mt-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient heading-glow">{profile.name}</span>
          </h1>

          <div
            style={{ animationDelay: "180ms" }}
            className="t-muted mt-4 text-xl font-medium sm:text-2xl"
          >
            <RoleRotator />
          </div>

          <p
            style={{ animationDelay: "270ms" }}
            className="t-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            {profile.tagline}
          </p>

          <div
            style={{ animationDelay: "360ms" }}
            className="t-faint mt-6 flex items-center gap-2 text-sm"
          >
            <MapPinIcon className="h-4 w-4" />
            {profile.location}
          </div>

          <div
            style={{ animationDelay: "450ms" }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="btn-accent group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              >
                View My Work
                <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <a
              href={profile.resumeUrl}
              className="surface surface-hover t-base inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              <DownloadIcon className="h-4 w-4" />
              Download CV
            </a>
          </div>

          <div
            style={{ animationDelay: "540ms" }}
            className="mt-10 flex items-center gap-3"
          >
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
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="surface surface-hover link flex h-11 w-11 items-center justify-center rounded-full"
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
