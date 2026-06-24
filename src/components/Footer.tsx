import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--chip-border)" }}
    >
      <div className="t-faint mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm sm:flex-row">
        <p>
          © {year} {profile.name}. All rights reserved.
        </p>
        <p>
          Built with <span className="t-muted">Next.js</span> &amp;{" "}
          <span className="t-muted">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}
