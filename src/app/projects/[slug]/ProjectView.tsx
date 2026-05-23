"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ContactCTA from "@/components/ContactCTA";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

const accentHex: Record<string, string> = {
  violet: "#7C3AED",
  cyan: "#06B6D4",
  orange: "#F97316",
  pink: "#EC4899",
  emerald: "#10B981",
};

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

export default function ProjectView({ project }: { project: Project }) {
  const color = accentHex[project.accent] ?? "#7C3AED";
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      {/* Back */}
      <div className="bg-[#0a0a0a] border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#555] hover:text-[#caff00] text-xs font-bold uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={13} />
            All projects
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#0a0a0a] pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.type.map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{ borderColor: `${color}40`, color }}
              >
                {t}
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10vw] md:text-[7vw] font-black uppercase leading-none tracking-[-0.04em] text-white mb-8"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[#888] text-xl max-w-2xl mb-10"
          >
            {project.headline}
          </motion.p>

          {project.liveUrl && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors"
                style={{ backgroundColor: `${color}20`, color }}
              >
                View Live Site
                <ArrowUpRight size={13} />
              </a>
            </motion.div>
          )}
        </div>
      </section>

      {/* Metrics */}
      {project.metrics && (
        <section className="bg-[#0e0e0e] border-y border-[#1a1a1a] py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[#333] text-xs uppercase tracking-widest mb-10">
              Results — 3 months post-launch
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-[#1a1a1a]">
              {project.metrics.map((m, i) => (
                <ScrollReveal key={m.label} delay={i * 0.1} className="pt-8 md:pt-0 md:px-10 first:pt-0 first:md:pl-0 last:md:pr-0">
                  <p className="text-5xl font-black mb-2" style={{ color }}>{m.value}</p>
                  <p className="text-[#555] text-xs uppercase tracking-widest">{m.label}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="bg-[#0a0a0a] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <ScrollReveal>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color }}>
              Overview
            </p>
            <p className="text-[#999] text-xl leading-relaxed">{project.overview}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Process */}
      {project.sections && (
        <section className="bg-[#0e0e0e] border-t border-[#1a1a1a] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 md:px-10 space-y-14">
            {project.sections.map((s, i) => (
              <ScrollReveal key={s.heading} delay={i * 0.05}>
                <div className="flex gap-6">
                  <span className="text-[#222] font-mono text-sm shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-white font-black text-xl mb-3">{s.heading}</h3>
                    <p className="text-[#777] leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Deliverables */}
      {project.deliverables && (
        <section className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 md:px-10">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest mb-8" style={{ color }}>
                What I Delivered
              </p>
              <ul className="space-y-4">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-4">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color }} />
                    <span className="text-[#888] leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="bg-[#0e0e0e] border-t border-[#1a1a1a] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-12">
            <span className="text-[#caff00] text-xs font-mono font-bold">More work</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {related.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.1}>
                <ProjectCard project={p} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
