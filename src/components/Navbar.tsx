"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/toolkit", label: "Toolkit" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-white font-black text-lg tracking-tight">KP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#caff00] blink" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.filter((l) => l.href !== "/").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  pathname === link.href
                    ? "text-[#caff00]"
                    : "text-[#888] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:block text-[#caff00] text-xs font-semibold uppercase tracking-widest">
              Available for work
            </span>
            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="flex md:hidden flex-col gap-1.5 group p-1"
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-white group-hover:bg-[#caff00] transition-colors" />
              <span className="block w-4 h-0.5 bg-white group-hover:bg-[#caff00] transition-colors ml-auto" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col transition-all duration-500 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between w-full">
          <span className="text-white font-black text-lg tracking-tight">KP</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-white hover:text-[#caff00] transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-center px-6">
          <ul className="space-y-1">
            {links.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                  className={`flex items-center gap-4 group py-3 border-b border-[#1a1a1a] transition-all duration-300 ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <span className="text-[#caff00] text-xs font-mono w-6">
                    0{i + 1}
                  </span>
                  <span
                    className={`text-4xl font-black uppercase tracking-tight transition-colors group-hover:text-[#caff00] ${
                      pathname === link.href ? "text-[#caff00]" : "text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <a
              href="mailto:keithpaul00@gmail.com"
              className="text-[#888] hover:text-white text-sm transition-colors"
            >
              keithpaul00@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/keith-paul-1450241a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-white text-sm transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </nav>

        <div className="px-6 pb-8 text-[#333] text-xs">
          &copy; 2026 Keith Paul
        </div>
      </div>
    </>
  );
}
