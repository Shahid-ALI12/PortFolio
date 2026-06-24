import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-zinc-500 sm:flex-row">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p>
          Built with <span className="text-zinc-300">Next.js</span> &amp;{" "}
          <span className="text-zinc-300">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}
