export type ThemeId = "glass" | "neon" | "aurora" | "light";

export type ThemeMeta = {
  id: ThemeId;
  label: string;
  desc: string;
  swatch: [string, string];
};

export const themes: ThemeMeta[] = [
  { id: "glass", label: "Glass", desc: "Frosted glassmorphism", swatch: ["#22d3ee", "#a78bfa"] },
  { id: "neon", label: "Neon", desc: "Cyberpunk glow", swatch: ["#00f0ff", "#ff2bd6"] },
  { id: "aurora", label: "Aurora", desc: "Vibrant gradients", swatch: ["#2dd4bf", "#c084fc"] },
  { id: "light", label: "Light", desc: "Clean neumorphism", swatch: ["#0891b2", "#7c3aed"] },
];

export const DEFAULT_THEME: ThemeId = "glass";

export const THEME_STORAGE_KEY = "portfolio-theme";
export const THREED_STORAGE_KEY = "portfolio-3d";
