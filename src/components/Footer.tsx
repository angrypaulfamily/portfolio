import Link from "next/link";
import { Mail } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/toolkit", label: "Toolkit" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
                KP
              </span>
              <span className="text-white font-semibold">Keith Paul</span>
            </div>
            <p className="text-sm text-stone-500">UI/UX Designer · Remote / Bangkok</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="mailto:keithpaul00@gmail.com"
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              aria-label="Email Keith"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/keith-paul-1450241a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-800 text-center text-sm text-stone-600">
          &copy; 2025 Keith Paul. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
