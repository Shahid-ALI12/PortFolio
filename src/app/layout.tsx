import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/lib/themes";
import { DEFAULT_DESIGN, DESIGN_STORAGE_KEY } from "@/lib/designs";
import Background from "@/components/Background";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
};

// Runs before paint to apply the saved theme + design (prevents a flash of the defaults).
const noFlashScript = `(function(){try{var r=document.documentElement;var t=localStorage.getItem('${THEME_STORAGE_KEY}')||'${DEFAULT_THEME}';r.setAttribute('data-theme',t);var d=localStorage.getItem('${DESIGN_STORAGE_KEY}')||'${DEFAULT_DESIGN}';r.setAttribute('data-design',d);}catch(e){document.documentElement.setAttribute('data-theme','${DEFAULT_THEME}');document.documentElement.setAttribute('data-design','${DEFAULT_DESIGN}');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      data-design={DEFAULT_DESIGN}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen antialiased">
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        {/* If JS is unavailable, scroll-reveal content must still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <ThemeProvider>
          <Preloader />
          <Background />
          {children}
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
