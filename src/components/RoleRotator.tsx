"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ROLES =
  profile.roles && profile.roles.length ? profile.roles : [profile.role];

/**
 * Cross-fades through a list of roles (whole-phrase, no typewriter/cursor).
 * Reserves height to avoid layout shift; static under reduced-motion.
 */
export default function RoleRotator() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced || ROLES.length < 2) return;
    const t = setInterval(
      () => setIndex((v) => (v + 1) % ROLES.length),
      2600,
    );
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <span className="relative block" style={{ minHeight: "1.4em" }}>
      {ROLES.map((role, idx) => (
        <span
          key={role}
          aria-hidden={idx !== index}
          className={`block transition-all duration-500 ${
            idx === index
              ? "relative translate-y-0 opacity-100"
              : "absolute inset-0 translate-y-2 opacity-0"
          }`}
        >
          {role}
        </span>
      ))}
    </span>
  );
}
