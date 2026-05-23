"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold group-hover:bg-violet-700 transition-colors">
            KP
          </span>
          <span className="font-semibold text-stone-900 hidden sm:block">Keith Paul</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-violet-50 text-violet-600"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href="mailto:keithpaul00@gmail.com"
          className="hidden md:block bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Hire Me
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-stone-50 border-t border-stone-200 px-6 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-violet-50 text-violet-600"
                  : "text-stone-700 hover:bg-stone-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:keithpaul00@gmail.com"
            className="mt-2 bg-violet-600 text-white text-sm font-semibold px-4 py-3 rounded-lg text-center"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
}
