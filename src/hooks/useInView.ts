"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntersectionObserver hook. Returns a ref to attach and whether the element
 * is currently in the viewport.
 *
 * By default it is REPEATABLE: `inView` becomes true on enter and false on
 * leave, so animations replay every time the element scrolls in/out (and
 * reverse when scrolling back up). Pass `{ once: true }` for the old
 * one-shot behaviour (stays true after the first intersection).
 */
export function useInView<T extends Element = HTMLDivElement>(
  options?: IntersectionObserverInit & { once?: boolean },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { once, ...ioOptions } = options ?? {};

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        // Repeatable: reset when it leaves so it can animate again on re-entry.
        setInView(false);
      }
    }, ioOptions);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}
