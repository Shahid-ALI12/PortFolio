"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  to: number;
  suffix?: string;
  duration?: number;
};

/**
 * Eases a counter from 0 → `to` when it scrolls into view.
 * Jumps to the final value under reduced-motion.
 */
export default function CountUp({ to, suffix = "", duration = 1400 }: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [n, setN] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Before mount (SSR / no-JS) we render the final value, so it's never "0".
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!inView) {
      // Reset so it counts up again next time it scrolls into view.
      if (!reduced) setN(0);
      return;
    }
    if (reduced) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {mounted ? n : to}
      {suffix}
    </span>
  );
}
