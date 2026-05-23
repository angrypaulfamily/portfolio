"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";

const skills = [
  "User Research",
  "Wireframing",
  "Prototyping",
  "Usability Testing",
  "Design Systems",
  "Shopify",
  "Branding",
  "AI Workflows",
  "Developer Handoff",
  "Video Editing",
];

const featured = projects.filter((p) => p.featured);

const metrics = [
  { value: "3.6%", after: "13.8%", label: "Conversion rate" },
  { value: "+54.9%", label: "Form submissions" },
  { value: "+23%", label: "Session duration" },
];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col justify-between bg-[#0a0a0a] overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #caff00, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-8 flex-1 flex flex-col justify-center">
          <FadeUp delay={0.1}>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#caff00] blink" />
              <span className="text-[#caff00] text-xs font-bold uppercase tracking-[0.2em]">
                Available for work
              </span>
              <span className="text-[#333] text-xs">·</span>
              <span className="text-[#555] text-xs uppercase tracking-widest">Remote / Bangkok</span>
            </div>
          </FadeUp>

          <div className="overflow-hidden mb-2">
            <FadeUp delay={0.2}>
              <h1 className="text-[15vw] md:text-[13vw] font-black uppercase leading-none tracking-[-0.04em] text-white">
                Keith
              </h1>
            </FadeUp>
          </div>
          <div className="overflow-hidden mb-8">
            <FadeUp delay={0.3}>
              <h1 className="text-[15vw] md:text-[13vw] font-black uppercase leading-none tracking-[-0.04em]"
                style={{ WebkitTextStroke: "2px #caff00", color: "transparent" }}>
                Paul.
              </h1>
            </FadeUp>
          </div>

          <FadeUp delay={0.4}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <p className="text-[#888] text-lg md:text-xl font-medium max-w-md leading-relaxed">
                  UI/UX Designer with 5+ years of experience. I design with purpose and ship with
                  quality — no shortcuts.
                </p>
              </div>
              <div className="flex gap-4 shrink-0">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#caff00] text-[#0a0a0a] font-bold px-6 py-3.5 rounded-full text-sm uppercase tracking-wide hover:bg-white transition-colors"
                >
                  View Work
                  <ArrowDownRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#2a2a2a] text-white font-bold px-6 py-3.5 rounded-full text-sm uppercase tracking-wide hover:border-[#caff00] hover:text-[#caff00] transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Marquee strip */}
        <div className="border-t border-[#1a1a1a] py-4">
          <Marquee
            items={skills}
            className="text-xs font-bold uppercase tracking-widest text-[#444]"
          />
        </div>
      </section>

      {/* ─── IMPACT NUMBERS ──────────────────────────────────────── */}
      <section className="bg-[#0e0e0e] border-y border-[#1a1a1a] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-16">
            <span className="text-[#caff00] text-xs font-mono font-bold">01</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
            <span className="text-[#444] text-xs uppercase tracking-widest">Impact</span>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#1a1a1a]">
            {metrics.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 0.1} className="pt-8 md:pt-0 md:px-10 first:pt-0 first:md:pl-0 last:md:pr-0">
                <div className="flex items-end gap-2 mb-2">
                  {m.after ? (
                    <>
                      <span className="text-5xl md:text-6xl font-black text-[#444] line-through">{m.value}</span>
                      <ArrowUpRight size={28} className="text-[#caff00] mb-2" />
                      <span className="text-5xl md:text-6xl font-black text-[#caff00]">{m.after}</span>
                    </>
                  ) : (
                    <span className="text-5xl md:text-6xl font-black text-[#caff00]">{m.value}</span>
                  )}
                </div>
                <p className="text-[#555] text-sm font-medium uppercase tracking-widest">{m.label}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-12 pt-12 border-t border-[#1a1a1a]">
            <p className="text-[#333] text-xs uppercase tracking-widest">
              Results measured over 3 months — Royi Sal website redesign
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── MANIFESTO / ABOUT ───────────────────────────────────── */}
      <section className="bg-[#0a0a0a] py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-16">
            <span className="text-[#caff00] text-xs font-mono font-bold">02</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
            <span className="text-[#444] text-xs uppercase tracking-widest">About</span>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <h2 className="text-5xl md:text-6xl font-black leading-[1.05] text-white mb-0">
                I don&apos;t{" "}
                <span className="text-[#caff00]">compromise</span>
                {" "}on quality.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-[#888] text-lg leading-relaxed mb-8">
                I started out in graphic design and found my way into UI/UX naturally. I work
                closely with CEOs, developers, marketing, and sales teams because communication is
                what makes or breaks a project. I take designs from start to finish — research,
                wireframing, prototyping, testing, handoff.
              </p>
              <p className="text-[#888] text-lg leading-relaxed mb-10">
                Lately I have been going deep into AI — using it actively in my design workflow and
                picking up terminal-based tools and light software development. In a field that is
                evolving fast, staying ahead of what AI can do is just part of the job now.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#caff00] font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
              >
                Full story
                <ArrowUpRight size={15} />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ────────────────────────────────────────────── */}
      <section className="bg-[#0e0e0e] border-t border-[#1a1a1a] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-16">
            <span className="text-[#caff00] text-xs font-mono font-bold">03</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
            <span className="text-[#444] text-xs uppercase tracking-widest">Work</span>
          </ScrollReveal>

          <div className="flex items-end justify-between mb-12">
            <ScrollReveal>
              <h2 className="text-5xl md:text-6xl font-black leading-none text-white">
                Selected<br />projects
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Link
                href="/projects"
                className="hidden md:inline-flex items-center gap-2 text-[#555] hover:text-[#caff00] text-sm font-bold uppercase tracking-widest transition-colors"
              >
                All work
                <ArrowUpRight size={14} />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} index={i} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-8 md:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#caff00] font-bold text-sm uppercase tracking-widest"
            >
              All projects <ArrowUpRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-16">
            <span className="text-[#caff00] text-xs font-mono font-bold">04</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
            <span className="text-[#444] text-xs uppercase tracking-widest">Testimonials</span>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.slice(0, 2).map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <blockquote className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-8 h-full">
                  <span className="text-6xl font-black text-[#caff00] leading-none block mb-6">&ldquo;</span>
                  <p className="text-[#aaa] text-base leading-relaxed mb-8">{t.quote}</p>
                  <footer className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#caff00] to-[#7C3AED] flex items-center justify-center text-[#0a0a0a] text-sm font-black shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{t.name}</p>
                      <p className="text-[#555] text-xs">
                        {t.role} — {t.company}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
