"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

/**
 * Full-screen intro animation shown once on first paint.
 * - Reveals the name with a staggered letter rise + an accent progress bar.
 * - Fades out and unmounts so it never blocks interaction afterwards.
 * - Locks body scroll while visible.
 * - Respects prefers-reduced-motion (shows briefly, no heavy motion).
 * Colors come from the active theme tokens (--accent / --accent-2 / --page-bg),
 * so the intro matches whichever theme is saved.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lock scroll while the intro is on screen.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const total = reduce ? 600 : 1900; // total intro time
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1);
      // easeOutCubic for a natural fill
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true); // trigger fade-out
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // After fade-out transition completes, remove from the DOM entirely.
  useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => {
      setRemoved(true);
      document.body.style.overflow = "";
    }, 700);
    return () => window.clearTimeout(id);
  }, [done]);

  if (removed) return null;

  const letters = Array.from(profile.name);

  return (
    <div
      className={`preloader ${done ? "preloader-hide" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="preloader-inner">
        <h1 className="preloader-name text-gradient">
          {letters.map((ch, i) => (
            <span
              key={i}
              className="preloader-letter"
              style={{ ['--i' as string]: i }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>

        <p className="preloader-role t-muted">{profile.role}</p>

        <div className="preloader-bar" aria-hidden="true">
          <span
            className="preloader-bar-fill bg-accent-gradient"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="preloader-pct t-faint" aria-hidden="true">
          {progress}%
        </span>
      </div>
    </div>
  );
}
