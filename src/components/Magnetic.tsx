"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  children: React.ReactNode;
  /** Max lean toward the cursor, in px. */
  strength?: number;
  className?: string;
};

/**
 * Makes its child lean toward the cursor and spring back on leave.
 * No-op when 3D effects are off, under reduced-motion, or on touch (no hover).
 */
export default function Magnetic({ children, strength = 8, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const { enable3D } = useTheme();
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (!enable3D || reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  // Snap back if effects get disabled while the element is leaned.
  useEffect(() => {
    if (!enable3D || reduced) reset();
  }, [enable3D, reduced]);

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
