import Link from "next/link";
import Marquee from "@/components/Marquee";

const skills = [
  "UI/UX Design",
  "Figma",
  "Shopify",
  "Branding",
  "User Research",
  "Prototyping",
  "Design Systems",
  "AI Workflows",
  "Developer Handoff",
  "Framer",
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a]">
      <div className="py-5 border-b border-[#1a1a1a]">
        <Marquee
          items={skills}
          slow
          className="text-xs font-semibold uppercase tracking-widest text-[#444]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="text-white font-black text-lg">KP</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#caff00] blink" />
          <span className="text-[#888] text-sm ml-2">Remote / Bangkok · 2026</span>
        </div>

        <nav className="flex flex-wrap gap-6">
          {["/", "/about", "/projects", "/toolkit", "/contact"].map((href) => {
            const label = href === "/" ? "Home" : href.slice(1).charAt(0).toUpperCase() + href.slice(2);
            return (
              <Link
                key={href}
                href={href}
                className="text-[#888] hover:text-white text-sm transition-colors"
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <p className="text-[#888] text-xs">&copy; 2026 Keith Paul. All rights reserved.</p>
      </div>
    </footer>
  );
}
