"use client";

import { useState } from "react";
import { themes } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";
import { CheckIcon, CubeIcon, PaletteIcon } from "./Icons";

export default function ThemeSwitcher() {
  const { theme, setTheme, enable3D, setEnable3D } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="surface-strong w-64 rounded-2xl p-4">
          <p className="t-faint mb-3 font-mono text-xs uppercase tracking-widest">
            Choose a design
          </p>

          <div className="grid grid-cols-2 gap-2">
            {themes.map((t) => {
              const active = theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className="surface relative flex items-center gap-2 rounded-xl px-3 py-2.5 text-left"
                  style={active ? { borderColor: "var(--accent)" } : undefined}
                  aria-pressed={active}
                >
                  <span
                    className="h-5 w-5 shrink-0 rounded-full"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${t.swatch[0]}, ${t.swatch[1]})`,
                    }}
                  />
                  <span className="t-base text-sm font-medium">{t.label}</span>
                  {active && (
                    <span className="t-accent absolute right-2 top-2">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setEnable3D(!enable3D)}
            className="surface mt-3 flex w-full items-center justify-between rounded-xl px-3 py-2.5"
          >
            <span className="t-base flex items-center gap-2 text-sm font-medium">
              <CubeIcon className="t-accent h-4 w-4" />
              3D effects
            </span>
            <span
              className={`relative h-5 w-9 rounded-full transition-colors ${
                enable3D ? "bg-accent-gradient" : "chip"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                  enable3D ? "left-[1.15rem]" : "left-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="btn-accent flex h-12 w-12 items-center justify-center rounded-full shadow-lg shadow-black/30"
        aria-label="Change design theme"
        aria-expanded={open}
      >
        <PaletteIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
