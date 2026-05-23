"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";
import { projects } from "@/data/projects";

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

export default function ProjectsPage() {
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
            Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11vw] md:text-[8vw] font-black uppercase leading-none tracking-[-0.04em] text-white mb-6"
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-[#555] text-lg max-w-xl"
          >
            UI/UX design, Shopify, branding, and ad design — from research to production.
          </motion.p>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-[#0e0e0e] border-t border-[#1a1a1a] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-12">
            <span className="text-[#caff00] text-xs font-mono font-bold">Featured</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* More */}
      {more.length > 0 && (
        <section className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <ScrollReveal className="flex items-center gap-4 mb-12">
              <span className="text-[#caff00] text-xs font-mono font-bold">More work</span>
              <div className="h-px flex-1 bg-[#1a1a1a]" />
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {more.map((project, i) => (
                <ScrollReveal key={project.slug} delay={i * 0.1}>
                  <ProjectCard project={project} index={featured.length + i} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
