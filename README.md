# Portfolio

Personal developer portfolio — built with **Next.js 16**, **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Run locally

```bash
npm run dev      # start dev server  → http://localhost:3000
npm run build    # production build
npm start        # run the built app
```

## ✏️ Apna content kaise edit karein

**Sab kuch ek hi file se control hota hai:** [`src/lib/data.ts`](src/lib/data.ts)

Wahan edit karo:

- `profile` — naam, role, tagline, location, email, resume link, social links (GitHub/LinkedIn/Twitter)
- `about` — bio paragraphs + stats (years, projects, clients)
- `skills` — technology categories aur unke items
- `projects` — apne projects (title, description, tags, live + repo links)
- `navLinks` — navbar ke links

Save karte hi browser khud reload ho jayega (hot reload).

## 🖼️ Apni photo add karna

Avatar ke ird-gird **animated Aurora Halo** (rotating ring + breathing glow + orbiting dots) hai. Apni photo daalna ek-line ka kaam hai:

1. Apni image `public/` folder mein daalo (e.g. `public/me.jpg`)
2. [`src/components/About.tsx`](src/components/About.tsx) mein `AuroraHalo` ko `src` do:

```tsx
<AuroraHalo initials={initials} src="/me.jpg" />
```

Halo + animation sab as-is rahenge — bas initials ki jagah aapki photo aa jayegi (square crop, [`AvatarInner`](src/components/about/AvatarInner.tsx) handle karta hai).

## 🎨 Themes (4 designs) + 3D

Site pe **4 design styles** hain, ek floating switcher (neeche-right palette button 🎨) se live change hote hain aur choice `localStorage` mein save hoti hai:

| Theme | Style |
|---|---|
| **Glass** | Frosted glassmorphism (default) |
| **Neon** | Cyberpunk / neon glow |
| **Aurora** | Vibrant teal–purple gradients |
| **Light** | Clean neumorphism (light) |

### Kaise kaam karta hai

- Har theme sirf CSS **tokens** set karti hai — [`src/app/globals.css`](src/app/globals.css) mein `[data-theme="..."]` blocks. Components in tokens ko use karte hain (hardcoded color nahi), isliye `data-theme` badalte hi poora look badal jata hai.
- **Naya theme add karna:** globals.css mein ek naya `[data-theme="mytheme"]` block banao (tokens copy karke values change karo), phir [`src/lib/themes.ts`](src/lib/themes.ts) ki list mein entry add karo.
- **Reusable token classes:** `surface` / `surface-strong` (panels), `surface-hover`, `text-gradient`, `btn-accent`, `accent-soft`, `chip`, `t-base` / `t-muted` / `t-faint`, `bg-accent-gradient`.

### 3D

- **Hero WebGL scene:** [`src/components/Scene3D.tsx`](src/components/Scene3D.tsx) — React Three Fiber se rotating icosahedron + wireframe + particle field, mouse pe tilt karta hai, har theme ke accent colors pick karta hai.
- **Card tilt:** [`src/components/TiltCard.tsx`](src/components/TiltCard.tsx) — CSS 3D, cursor ke saath cards tilt hote hain.
- Switcher ke **"3D effects" toggle** se off ho jata hai (mobile / reduced-motion pe auto-light fallback).

## 🚀 Deploy (free)

Sabse aasan: [Vercel](https://vercel.com)

1. Code GitHub pe push karo
2. Vercel pe "Import Project" → repo select karo → Deploy
3. Live URL mil jayega (e.g. `shahid.vercel.app`)

## Structure

```
src/
├── app/
│   ├── layout.tsx      # root layout + metadata + fonts
│   ├── page.tsx        # sections assemble hoti hain yahan
│   └── globals.css     # theme, animations, scrollbar
├── components/
│   ├── Navbar.tsx      # sticky nav + mobile menu
│   ├── Hero.tsx        # landing / intro
│   ├── About.tsx       # bio + stats
│   ├── Skills.tsx      # tech stack cards
│   ├── Projects.tsx    # project cards
│   ├── Contact.tsx     # contact CTA
│   ├── Footer.tsx
│   ├── Reveal.tsx      # scroll-reveal animation helper
│   ├── SectionHeading.tsx
│   └── Icons.tsx       # inline SVG icons
└── lib/
    └── data.ts         # 👈 SAARA CONTENT YAHAN
```
