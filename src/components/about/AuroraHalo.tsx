"use client";

import { useEffect, useRef, useState } from "react";
import AvatarInner from "./AvatarInner";

type Props = {
  initials: string;
  /** Pass a photo path (e.g. "/me.jpg") to show a real photo instead. */
  src?: string;
};

/**
 * Pure-CSS animated avatar frame: a rotating conic-gradient halo ring, a
 * breathing blurred aura, and orbiting accent dots. Token-driven (works in
 * all themes) and pauses its animations when scrolled off-screen.
 */
export default function AuroraHalo({ initials, src }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto w-64 max-w-full">
      <div
        ref={ref}
        className={`halo-frame relative aspect-square rounded-[1.75rem] p-[3px] ${
          paused ? "paused" : ""
        }`}
      >
        <span aria-hidden className="halo-ring" />
        <span aria-hidden className="halo-aura" />
        <div className="relative z-10 h-full w-full overflow-hidden rounded-[1.6rem]">
          <AvatarInner initials={initials} src={src} />
        </div>
        <span aria-hidden className="halo-orbit">
          <i />
          <i className="alt" />
        </span>
        <span aria-hidden className="halo-orbit reverse">
          <i className="alt" />
        </span>
      </div>
    </div>
  );
}
