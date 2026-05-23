import { ArrowUpRight } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";

export default function ContactCTA() {
  return (
    <section className="bg-[#caff00] text-[#0a0a0a] overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <span className="text-[30vw] font-black uppercase leading-none">Hi</span>
      </div>
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#555]">
          Let&apos;s work together
        </p>
        <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tight mb-10">
          Got a<br />project?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:keithpaul00@gmail.com"
            className="inline-flex items-center gap-3 bg-[#0a0a0a] text-white font-bold px-8 py-4 rounded-full hover:bg-[#1a1a1a] transition-colors text-sm uppercase tracking-wide"
          >
            keithpaul00@gmail.com
            <ArrowUpRight size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/keith-paul-1450241a3/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 border-[#0a0a0a]/30 text-[#0a0a0a] font-bold px-8 py-4 rounded-full hover:border-[#0a0a0a] transition-colors text-sm uppercase tracking-wide"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
