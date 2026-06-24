// ════════════════════════════════════════════════════════════════
//  👇 APNI SAARI INFORMATION SIRF YAHAN EDIT KARO
//  (Naam, projects, skills, links — sab kuch isi file se control hota hai)
// ════════════════════════════════════════════════════════════════

export const profile = {
  name: "Shahid Zain",
  role: "Full-Stack Developer",
  // Hero section ki badi tagline:
  tagline:
    "I design and build fast, accessible web applications — from idea to deployment.",
  location: "Lahore, Pakistan",
  email: "dev.mzain@gmail.com",
  availability: "Available for freelance & full-time work",
  resumeUrl: "#", // apni resume/CV PDF ka link yahan daalo

  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  },
};

export const about = {
  paragraphs: [
    "I'm a full-stack developer who loves turning ideas into clean, performant, and intuitive digital products. I work mainly across the JavaScript/TypeScript ecosystem — building responsive front-ends and scalable back-end services.",
    "I care about writing maintainable code, sweating the small UX details, and shipping things that actually help people. When I'm not coding, I'm exploring new tools, contributing to open source, and sharpening my problem-solving.",
  ],
  // Chhote stats jo About section mein dikhenge:
  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "25+", label: "Projects Completed" },
    { value: "15+", label: "Happy Clients" },
  ],
};

export const skills: { category: string; items: string[] }[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST APIs", "GraphQL", "Python"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Supabase"],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "AWS", "Vercel", "Figma", "Linux"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "DevConnect — Developer Social Platform",
    description:
      "A full-stack social network where developers share projects, follow peers, and collaborate in real time with live notifications.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "WebSockets"],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "ShopWave — E-Commerce Store",
    description:
      "A modern storefront with product search, cart, Stripe checkout, and a full admin dashboard for managing orders and inventory.",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "TaskFlow — Project Management",
    description:
      "A Kanban-style task manager with drag-and-drop boards, team workspaces, and real-time updates for smooth collaboration.",
    tags: ["Next.js", "Tailwind CSS", "Supabase"],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    title: "WeatherNow — Weather Dashboard",
    description:
      "A clean weather app with location search, a 7-day forecast, and interactive charts powered by a live weather API.",
    tags: ["React", "OpenWeather API", "Chart.js"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "BlogSpace — Markdown CMS",
    description:
      "A headless-CMS-powered blog with MDX content, syntax highlighting, and built-in SEO for fast, content-rich sites.",
    tags: ["Next.js", "MDX", "Contentlayer"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "FitTrack — Fitness Tracker",
    description:
      "A workout and nutrition tracking app with progress charts, goal setting, and daily streaks to keep users motivated.",
    tags: ["React Native", "Expo", "Firebase"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

// Navbar links (section id ke saath):
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
