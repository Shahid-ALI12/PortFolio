"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const firstName = profile.name.split(" ")[0];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Near the top (hero) no section is "active".
      if (window.scrollY < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className={`surface-strong mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl px-5 py-3 transition-shadow duration-300 ${
          scrolled ? "shadow-2xl shadow-black/40" : ""
        }`}
      >
        <a href="#" className="t-base font-mono text-lg font-bold">
          {firstName}
          <span className="t-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm ${isActive ? "t-base" : "link"}`}
                >
                  {link.label}
                  <span
                    className={`bg-accent-gradient absolute -bottom-1 left-0 h-px rounded-full ease-out motion-safe:transition-all motion-safe:duration-300 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#contact"
              className="accent-soft rounded-full px-4 py-2 text-sm font-medium"
            >
              Get in touch
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="t-base md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open && (
        <div className="surface mx-auto mt-2 max-w-5xl rounded-2xl p-2 md:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="link block rounded-xl px-4 py-2.5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
