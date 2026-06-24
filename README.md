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

1. Apni image `public/` folder mein daalo (e.g. `public/me.jpg`)
2. [`src/components/About.tsx`](src/components/About.tsx) mein initials wale `<div>` ki jagah:

```tsx
import Image from "next/image";

<Image src="/me.jpg" alt="Shahid Zain" width={256} height={256}
  className="aspect-square w-64 rounded-3xl object-cover" />
```

## 🎨 Theme / colors

- Global styles + animations: [`src/app/globals.css`](src/app/globals.css)
- Accent color har jagah `cyan` + `violet` hai. Replace-all karke koi aur Tailwind color (e.g. `emerald`, `rose`) use kar sakte ho.

### Glassmorphism

UI frosted-glass style pe hai. Reusable classes (globals.css mein):

- `glass` — standard frosted panel (translucent bg + blur + border)
- `glass-strong` — zyada opaque (navbar / focal cards ke liye)
- `glass-hover` — `glass` ke saath lagao to hover pe react kare

Kisi bhi element ko glass banane ke liye: `className="glass rounded-2xl p-6"`.
Colors peeche [`src/components/Background.tsx`](src/components/Background.tsx) ke colorful orbs se aate hain — un orbs ke color/position badal kar poora mood change kar sakte ho.

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
