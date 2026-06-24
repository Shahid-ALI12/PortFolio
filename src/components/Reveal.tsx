"use client";

import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealProps = {
  children: React.ReactNode;
  /** Delay in ms before the reveal animation starts. */
  delay?: number;
  /** Entrance direction. Defaults to "up" (backward compatible). */
  from?: Direction;
  className?: string;
};

const HIDDEN: Record<Direction, string> = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  scale: "scale-95",
  fade: "",
};

/**
 * Fades + slides its children in once they scroll into view.
 * Under reduced-motion the content shows immediately (never stuck hidden).
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: RevealProps) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const show = inView || reduced;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal motion-safe:transition-all motion-safe:duration-700 ease-out ${
        show
          ? "translate-x-0 translate-y-0 scale-100 opacity-100"
          : `opacity-0 ${HIDDEN[from]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
