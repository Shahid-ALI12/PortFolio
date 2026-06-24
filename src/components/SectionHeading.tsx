"use client";

import Reveal from "./Reveal";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  eyebrow: string;
  title: string;
};

export default function SectionHeading({ eyebrow, title }: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const show = inView || reduced;
  const number = eyebrow.split(" ")[0];

  return (
    <Reveal className="relative mb-12 text-center">
      <span aria-hidden className="section-watermark">
        {number}
      </span>
      <p className="t-accent relative mb-2 font-mono text-sm uppercase tracking-widest">
        {eyebrow}
      </p>
      <h2 className="t-base relative text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <div
        ref={ref}
        className={`bg-accent-gradient mx-auto mt-4 h-1 rounded-full ease-out motion-safe:transition-[width] motion-safe:duration-700 ${
          show ? "w-16" : "w-0"
        }`}
      />
    </Reveal>
  );
}
