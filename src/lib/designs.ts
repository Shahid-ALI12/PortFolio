// ═══════════════════════════════════════════════════════════
//  DESIGNS (overall LAYOUT / look)
//  Theme (themes.ts) sirf COLORS badalti hai.
//  Design poora FRONTEND look badalta hai — font, spacing, radius,
//  surface style aur (kuch sections ka) layout. Content same rehta hai.
//
//  Kaam karne ka tarika: jaise theme `data-theme` set karti hai,
//  design `data-design` attribute set karta hai. Components aur
//  globals.css usi attribute ko dekh kar look badalte hain.
// ═══════════════════════════════════════════════════════════

export type DesignId = "glass" | "bento" | "cyber" | "threed";

export type DesignMeta = {
  id: DesignId;
  label: string;
  desc: string;
};

export const designs: DesignMeta[] = [
  { id: "glass", label: "Glassmorphism", desc: "Frosted glass cards (default)" },
  { id: "bento", label: "Bento Grid", desc: "Modular grid of mixed-size tiles" },
  { id: "cyber", label: "Dark Futuristic", desc: "Cyber / neon HUD style" },
  { id: "threed", label: "3D UI", desc: "Depth, tilt & floating layers" },
];

export const DEFAULT_DESIGN: DesignId = "glass";

export const DESIGN_STORAGE_KEY = "portfolio-design";
