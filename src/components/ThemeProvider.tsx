"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  THREED_STORAGE_KEY,
  type ThemeId,
} from "@/lib/themes";
import {
  DEFAULT_DESIGN,
  DESIGN_STORAGE_KEY,
  type DesignId,
} from "@/lib/designs";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  design: DesignId;
  setDesign: (d: DesignId) => void;
  enable3D: boolean;
  setEnable3D: (v: boolean) => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [design, setDesignState] = useState<DesignId>(DEFAULT_DESIGN);
  const [enable3D, setEnable3DState] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Read whatever the no-flash script already applied + stored prefs.
  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as ThemeId) || DEFAULT_THEME;
    setThemeState(current);

    const currentDesign =
      (document.documentElement.getAttribute("data-design") as DesignId) ||
      DEFAULT_DESIGN;
    setDesignState(currentDesign);

    try {
      const stored3D = localStorage.getItem(THREED_STORAGE_KEY);
      if (stored3D !== null) setEnable3DState(stored3D === "1");
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  const setTheme = (t: ThemeId) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  };

  const setEnable3D = (v: boolean) => {
    setEnable3DState(v);
    try {
      localStorage.setItem(THREED_STORAGE_KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  const setDesign = (d: DesignId) => {
    setDesignState(d);
    document.documentElement.setAttribute("data-design", d);
    try {
      localStorage.setItem(DESIGN_STORAGE_KEY, d);
    } catch {
      /* ignore */
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, design, setDesign, enable3D, setEnable3D, mounted }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
