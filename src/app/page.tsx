"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";
import { projects } from "@/data/projects";

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

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
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
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col justify-between bg-[#0a0a0a] overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.06] blur-[140px] pointer-events-none"
          style={{ background: "radial-gradient(circle, #caff00, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <FadeUp delay={0.1}>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-2 h-2 rounded-full bg-[#caff00] blink" />
                  <span className="text-[#caff00] text-xs font-bold uppercase tracking-[0.2em]">
                    Available for work
                  </span>
                  <span className="text-[#333]">·</span>
                  <span className="text-[#888] text-xs uppercase tracking-widest">Remote / Bangkok</span>
                </div>
              </FadeUp>

              <div className="overflow-hidden mb-1">
                <FadeUp delay={0.2}>
                  <h1 className="text-[18vw] md:text-[15vw] font-black uppercase leading-none tracking-[-0.04em] text-white">
                    Keith.
                  </h1>
                </FadeUp>
              </div>

              <FadeUp delay={0.35}>
                <p className="text-[#888] text-lg md:text-xl font-medium max-w-md leading-relaxed mt-6">
                  I own the full design process: user research, personas, wireframing, prototyping, usability testing, and developer handoff. I then measure every launch with Google Analytics, Clarity, and HubSpot to track the real business impact. The numbers below are what end-to-end ownership looks like.
                </p>
              </FadeUp>

              <FadeUp delay={0.45}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8 pt-8 border-t border-[#1a1a1a]">
                  <div>
                    <div className="flex items-end gap-2 mb-1.5">
                      <span className="text-2xl font-black text-[#444] line-through">3.6%</span>
                      <ArrowUpRight size={14} className="text-[#caff00] mb-0.5" />
                      <span className="text-2xl font-black text-[#caff00]">13.8%</span>
                    </div>
                    <p className="text-[#888] text-[10px] font-bold uppercase tracking-widest mb-0.5">Conversion Rate</p>
                    <p className="text-[#888] text-[11px]">Contact page visitors who submitted the enquiry form</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[#caff00] mb-1.5">+54.9%</p>
                    <p className="text-[#888] text-[10px] font-bold uppercase tracking-widest mb-0.5">Form Submissions</p>
                    <p className="text-[#888] text-[11px]">Lead generation form completions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-[#caff00] mb-1.5">+23%</p>
                    <p className="text-[#888] text-[10px] font-bold uppercase tracking-widest mb-0.5">Session Duration</p>
                    <p className="text-[#888] text-[11px]">Average time on site per visit</p>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.6}>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 bg-[#caff00] text-[#0a0a0a] font-bold px-7 py-4 rounded-full text-sm uppercase tracking-wide hover:bg-white transition-colors"
                  >
                    View Work
                    <ArrowDownRight size={15} />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-[#2a2a2a] text-white font-bold px-7 py-4 rounded-full text-sm uppercase tracking-wide hover:border-[#caff00] hover:text-[#caff00] transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Avatar */}
            <FadeUp delay={0.3} className="hidden lg:block">
              <div className="relative w-64 h-72">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#1e1e1e]">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Keith Paul"
                    fill
                    className="object-cover"
                    sizes="256px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-[#caff00] text-[#0a0a0a] text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full">
                  UI/UX Designer
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] py-4">
          <Marquee items={skills} className="text-xs font-bold uppercase tracking-widest text-[#444]" />
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="bg-[#0a0a0a] py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-16">
            <span className="text-[#caff00] text-xs font-mono font-bold">01</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
            <span className="text-[#444] text-xs uppercase tracking-widest">About</span>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <h2 className="text-5xl md:text-6xl font-black leading-[1.05] text-white">
                I don&apos;t{" "}
                <span className="text-[#caff00]">compromise</span>{" "}
                on quality.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-[#888] text-lg leading-relaxed mb-6">
                I own the full end-to-end design process: user research, user personas, user flows,
                and information architecture through wireframing, prototyping, usability testing,
                and developer handoff. I work closely with CEOs, developers, marketing, and sales
                teams because communication is what makes or breaks a project.
              </p>
              <p className="text-[#888] text-lg leading-relaxed mb-10">
                I measure what I ship using Google Analytics, Microsoft Clarity, and HubSpot, and
                I actively integrate AI into every stage of the workflow. In a field that is
                evolving fast, staying ahead is just part of the job.
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

      {/* PROJECTS */}
      <section className="bg-[#0e0e0e] border-t border-[#1a1a1a] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-16">
            <span className="text-[#caff00] text-xs font-mono font-bold">02</span>
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
                className="hidden md:inline-flex items-center gap-2 text-[#888] hover:text-[#caff00] text-sm font-bold uppercase tracking-widest transition-colors"
              >
                All work
                <ArrowUpRight size={14} />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {featured.slice(0, 4).map((project, i) => (
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

      <ContactCTA />
    </>
  );
}
