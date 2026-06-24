"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../ThemeProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  className?: string;
  fallback?: React.ReactNode;
  /** Render-prop: receives whether the box is on screen (drive frameloop). */
  children: (onScreen: boolean) => React.ReactNode;
};

/**
 * Gates a WebGL scene: mounts it only when 3D is enabled, the user allows
 * motion, and the app has mounted. Tracks on-screen state so the scene can
 * pause its render loop when scrolled away. Shows a fallback otherwise
 * (same box → no layout shift).
 */
export default function Canvas3DGate({
  className = "",
  fallback = null,
  children,
}: Props) {
  const { enable3D, mounted } = useTheme();
  const reduced = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Defer the actual canvas mount (WebGL context) until the box is near view.
  const allowed = mounted && enable3D && !reduced && seen;

  return (
    <div ref={boxRef} className={className}>
      {allowed ? children(onScreen) : fallback}
    </div>
  );
}
