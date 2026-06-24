"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";
import { CloseIcon, MenuIcon } from "./Icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstName = profile.name.split(" ")[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className={`glass-strong mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl px-5 py-3 transition-shadow duration-300 ${
          scrolled ? "shadow-2xl shadow-black/40" : ""
        }`}
      >
        <a href="#" className="font-mono text-lg font-bold text-white">
          {firstName}
          <span className="text-cyan-400">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-300 transition hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
            >
              Get in touch
            </a>
          </li>
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 max-w-5xl rounded-2xl p-2 md:hidden">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-2.5 text-zinc-200 transition hover:bg-white/10 hover:text-white"
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
