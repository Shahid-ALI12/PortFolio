"use client";

import { useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  max?: number;
};

/**
 * Wraps content in a perspective container that tilts toward the cursor.
 * Respects the global 3D toggle (no tilt when 3D effects are off).
 */
export default function TiltCard({ children, className = "", max = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { enable3D } = useTheme();
  const reduced = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (!enable3D || reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 2 * max}deg`);
    el.style.setProperty("--rx", `${-(py - 0.5) * 2 * max}deg`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`tilt h-full ${className}`}
    >
      {children}
    </div>
  );
}
