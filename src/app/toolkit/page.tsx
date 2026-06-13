"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ContactCTA from "@/components/ContactCTA";
import { toolkit } from "@/data/toolkit";

const colorHex: Record<string, string> = {
  violet: "#8B5CF6",
  cyan: "#06B6D4",
  orange: "#F97316",
  pink: "#EC4899",
};

const toolIcons: Record<string, string> = {
  "Figma + Figma AI": "/images/toolkit/figma.svg",
  "Framer": "/images/toolkit/framer.svg",
  "Adobe Illustrator": "/images/toolkit/illustrator.svg",
  "Adobe Photoshop": "/images/toolkit/photoshop.svg",
  "Adobe After Effects": "/images/toolkit/after-effects.png",
  "Adobe Premiere Pro": "/images/toolkit/premiere-pro.png",
  "Relume": "/images/toolkit/relume.svg",
  "Midjourney": "/images/toolkit/midjourney.svg",
  "v0 by Vercel": "/images/toolkit/v0.svg",
  "Lovable": "/images/toolkit/lovable.svg",
  "Base44": "/images/toolkit/base44.svg",
  "Bolt.new": "/images/toolkit/bolt.svg",
  "Cursor": "/images/toolkit/cursor.svg",
  "Claude": "/images/toolkit/claude.svg",
  "Claude Code": "/images/toolkit/claude-code.svg",
  "Open Code": "/images/toolkit/opencode.svg",
  "OpenAI Codex": "/images/toolkit/codex.svg",
  "ChatGPT": "/images/toolkit/chatgpt.svg",
};

function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ToolkitPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0a0a0a] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#caff00] text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            Stack
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11vw] md:text-[8vw] font-black uppercase leading-none tracking-[-0.04em] text-white mb-6"
          >
            Toolkit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[#888] text-lg max-w-xl"
          >
            Curated tools across design, development, and AI-powered workflows. Every tool earns
            its place by making the work better.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      {toolkit.map((category, catIndex) => {
        const color = colorHex[category.color] ?? "#7C3AED";
        const isEven = catIndex % 2 === 0;
        return (
          <section
            key={category.category}
            className={`border-t border-[#1a1a1a] py-16 md:py-20 ${isEven ? "bg-[#0e0e0e]" : "bg-[#0a0a0a]"}`}
          >
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <ScrollReveal className="flex items-center gap-4 mb-12" delay={0.05}>
                <span className="text-xs font-mono font-bold" style={{ color }}>
                  0{catIndex + 1}
                </span>
                <div className="h-px flex-1 bg-[#1a1a1a]" />
                <span className="text-[#444] text-xs uppercase tracking-widest">
                  {category.category}
                </span>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool, i) => {
                  const iconSrc = toolIcons[tool.name];
                  return (
                    <ScrollReveal key={tool.name} delay={catIndex * 0.04 + i * 0.06}>
                      <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#2a2a2a] transition-all">
                        <div className="flex items-center gap-3 mb-4">
                          {iconSrc && (
                            <div className="relative w-8 h-8 shrink-0">
                              <Image
                                src={iconSrc}
                                alt={tool.name}
                                fill
                                className="object-contain"
                                sizes="32px"
                              />
                            </div>
                          )}
                          <h3 className="text-white font-black text-base">{tool.name}</h3>
                        </div>
                        <p className="text-xs uppercase tracking-widest mb-3" style={{ color, opacity: 0.7 }}>
                          {tool.subtitle}
                        </p>
                        <p className="text-[#888] text-sm leading-relaxed">{tool.description}</p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <ContactCTA />
    </>
  );
}
