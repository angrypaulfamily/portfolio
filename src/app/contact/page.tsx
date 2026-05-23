"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";
import LinkedInIcon from "@/components/LinkedInIcon";

export default function ContactPage() {
  return (
    <section className="min-h-[100svh] bg-[#0a0a0a] flex flex-col justify-center py-20 overflow-hidden relative">
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span className="text-[25vw] font-black uppercase leading-none text-white whitespace-nowrap">
          TALK
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#caff00] text-xs font-bold uppercase tracking-[0.2em] mb-6"
        >
          Contact
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13vw] md:text-[10vw] font-black uppercase leading-none tracking-[-0.04em] mb-4"
        >
          <span className="text-white">Let&apos;s</span>
          <br />
          <span style={{ WebkitTextStroke: "2px #caff00", color: "transparent" }}>Talk.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[#555] text-lg max-w-md mb-16"
        >
          Whether you have a project in mind or just want to connect, I would love to hear from
          you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a
            href="mailto:keithpaul00@gmail.com"
            className="inline-flex items-center gap-3 bg-[#caff00] text-[#0a0a0a] font-black px-8 py-4 rounded-full uppercase tracking-wide text-sm hover:bg-white transition-colors"
          >
            keithpaul00@gmail.com
            <ArrowUpRight size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/keith-paul-1450241a3/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#2a2a2a] text-white font-bold px-8 py-4 rounded-full uppercase tracking-wide text-sm hover:border-[#caff00] hover:text-[#caff00] transition-colors"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-8 border-t border-[#1a1a1a] pt-12"
        >
          <div className="flex items-center gap-3 text-[#555] text-sm">
            <span className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <MapPin size={13} className="text-[#caff00]" />
            </span>
            Remote / Bangkok
          </div>
          <div className="flex items-center gap-3 text-[#555] text-sm">
            <span className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <Clock size={13} className="text-[#caff00]" />
            </span>
            Open to full-time, contract, and freelance
          </div>
          <div className="flex items-center gap-3 text-[#555] text-sm">
            <span className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#caff00] blink block" />
            </span>
            Typically responds within 24 hours
          </div>
        </motion.div>
      </div>
    </section>
  );
}
