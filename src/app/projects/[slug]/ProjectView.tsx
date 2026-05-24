"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import ContactCTA from "@/components/ContactCTA";
import ProjectCard from "@/components/ProjectCard";
import Lightbox from "@/components/Lightbox";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";

const accentHex: Record<string, string> = {
  violet: "#7C3AED",
  cyan: "#06B6D4",
  orange: "#F97316",
  pink: "#EC4899",
  emerald: "#10B981",
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

function VideoEmbed({ type, id, title }: { type: "vimeo" | "youtube"; id: string; title?: string }) {
  const src =
    type === "vimeo"
      ? `https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0`
      : `https://www.youtube.com/embed/${id}`;

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={src}
          title={title ?? "Video"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {title && (
        <div className="px-5 py-3 border-t border-[#1e1e1e]">
          <p className="text-[#555] text-xs font-medium uppercase tracking-widest">{title}</p>
        </div>
      )}
    </div>
  );
}

export default function ProjectView({ project }: { project: Project }) {
  const color = accentHex[project.accent] ?? "#7C3AED";
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const openLightbox = (images: string[], index: number) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);

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
      <section className="bg-[#0a0a0a] pt-12 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
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
                className="inline-flex items-center gap-2 font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full"
                style={{ backgroundColor: `${color}20`, color }}
              >
                View Live Site
                <ArrowUpRight size={13} />
              </a>
            </motion.div>
          )}
        </div>

        {/* Hero image */}
        {project.heroImage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto px-6 md:px-10 pb-0"
          >
            <button
              onClick={() => openLightbox([project.heroImage!], 0)}
              className="block w-full text-left"
            >
              <div className="relative w-full rounded-t-2xl overflow-hidden border border-b-0 border-[#1e1e1e]" style={{ aspectRatio: "16/8" }}>
                <Image
                  src={project.heroImage}
                  alt={`${project.title} hero`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </div>
            </button>
          </motion.div>
        )}
      </section>

      {/* Metrics */}
      {project.metrics && (
        <section className="bg-[#0e0e0e] border-y border-[#1a1a1a] py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <p className="text-[#333] text-xs uppercase tracking-widest mb-10">
              Results -- 3 months post-launch
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

      {/* Process sections with images */}
      {project.sections && (
        <section className="bg-[#0e0e0e] border-t border-[#1a1a1a] py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-20">
            {project.sections.map((s, i) => (
              <ScrollReveal key={s.heading} delay={i * 0.05}>
                <div className={`grid grid-cols-1 ${s.image ? "lg:grid-cols-2" : ""} gap-10 items-start`}>
                  <div>
                    <div className="flex gap-5 items-baseline mb-4">
                      <span className="text-[#222] font-mono text-sm shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-white font-black text-2xl">{s.heading}</h3>
                    </div>
                    <p className="text-[#777] leading-relaxed pl-9">{s.body}</p>
                  </div>
                  {s.image && (
                    <button
                      onClick={() => openLightbox([s.image!], 0)}
                      className="block w-full text-left"
                    >
                      <div className="relative rounded-2xl overflow-hidden border border-[#1e1e1e] bg-[#0a0a0a]" style={{ aspectRatio: "16/10" }}>
                        <Image
                          src={s.image}
                          alt={s.heading}
                          fill
                          className="object-contain"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </button>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {project.videos && project.videos.length > 0 && (
        <section className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <ScrollReveal className="flex items-center gap-4 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>
                Video Work
              </span>
              <div className="h-px flex-1 bg-[#1a1a1a]" />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.videos.map((v, i) => (
                <ScrollReveal key={v.id} delay={i * 0.08}>
                  <VideoEmbed type={v.type} id={v.id} title={v.title} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.galleryImages && project.galleryImages.length > 1 && !project.sections && (
        <section className="bg-[#0e0e0e] border-t border-[#1a1a1a] py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <ScrollReveal className="flex items-center gap-4 mb-12">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>Gallery</span>
              <div className="h-px flex-1 bg-[#1a1a1a]" />
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.galleryImages.map((img, i) => (
                <ScrollReveal key={img} delay={i * 0.07}>
                  <button
                    onClick={() => openLightbox(project.galleryImages!, i)}
                    className="block w-full text-left"
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-[#1e1e1e]" style={{ aspectRatio: "4/3" }}>
                      <Image
                        src={img}
                        alt={`${project.title} image ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>
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

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onPrev={() => setLightbox(lb => lb && lb.index > 0 ? { ...lb, index: lb.index - 1 } : lb)}
          onNext={() => setLightbox(lb => lb && lb.index < lb.images.length - 1 ? { ...lb, index: lb.index + 1 } : lb)}
        />
      )}
    </>
  );
}
