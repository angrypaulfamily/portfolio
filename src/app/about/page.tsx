"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import Marquee from "@/components/Marquee";
import { experience, education } from "@/data/experience";

function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

const accolades = [
  { value: "5+", label: "Years experience" },
  { value: "10+", label: "Clients" },
  { value: "3", label: "Countries" },
  { value: "Forbes", label: "Apple News, WebMD" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0a0a0a] pt-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-end mb-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[#caff00] text-xs font-bold uppercase tracking-[0.2em] mb-6"
              >
                About
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[11vw] md:text-[7.5vw] font-black uppercase leading-none tracking-[-0.04em] text-white"
              >
                Get to<br />know me.
              </motion.h1>
            </div>

            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div className="relative h-72 rounded-2xl overflow-hidden border border-[#1e1e1e]">
                <Image
                  src="/images/avatar.jpg"
                  alt="Keith"
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent" />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#1a1a1a] pt-10"
          >
            {accolades.map((a) => (
              <div key={a.label}>
                <p className="text-white font-black text-xl">{a.value}</p>
                <p className="text-[#888] text-xs uppercase tracking-widest mt-1">{a.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-[#1a1a1a] py-4">
          <Marquee
            items={["UI/UX Design", "Shopify", "Branding", "Video Editing", "AI Workflows", "Research", "Figma", "Framer", "Adobe Suite"]}
            slow
            className="text-xs font-bold uppercase tracking-widest text-[#444]"
          />
        </div>
      </section>

      {/* Bio */}
      <section className="bg-[#0e0e0e] border-t border-[#1a1a1a] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16 items-start">
            <ScrollReveal>
              <div className="sticky top-24 space-y-4">
                {/* Mobile photo */}
                <div className="lg:hidden relative h-48 rounded-2xl overflow-hidden border border-[#1e1e1e] mb-6">
                  <Image src="/images/avatar.jpg" alt="Keith" fill className="object-cover" sizes="100vw" />
                </div>
                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 space-y-5">
                  {[
                    { label: "Role", value: "UI/UX Designer" },
                    { label: "Experience", value: "5+ Years" },
                    { label: "Location", value: "Remote / Bangkok" },
                    { label: "Status", value: "Available", highlight: true },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-[#888] text-[10px] uppercase tracking-widest mb-1">{item.label}</p>
                      <p className={`font-bold text-sm ${item.highlight ? "text-[#caff00]" : "text-white"}`}>
                        {item.value}
                        {item.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#caff00] inline-block ml-2 blink" />}
                      </p>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-[#1a1a1a]">
                    <a
                      href="mailto:keithpaul00@gmail.com"
                      className="inline-flex items-center gap-2 text-[#caff00] font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all"
                    >
                      Say hello
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="space-y-8">
              {[
                "I am a UI/UX designer with 5+ years of experience across web design, Shopify, branding, and AI-powered workflows. I practice user-centred design and own the full end-to-end process: from user research, user personas, user flows, and information architecture through wireframing, low-fidelity and high-fidelity prototyping, usability testing, and developer handoff.",
                "I have worked closely with CEOs, developers, marketing teams, and sales teams across a range of industries. I measure what I ship: Google Analytics, Microsoft Clarity, and HubSpot Analytics are part of my process, not an afterthought. Collaboration and communication are not just nice to have: they are how good work actually gets made.",
                "I actively integrate AI into my workflow: Claude, Midjourney, Cursor, and v0 for design generation, research, and prototyping. I also build with terminal-based tools and light software development. In a field that is evolving fast, staying ahead of what AI can do is just part of the job.",
                "I do not compromise on quality. I go the extra mile because that is the standard I hold myself to, not because someone asked me to.",
              ].map((para, i) => (
                <p key={i} className="text-[#888] text-xl leading-relaxed">{para}</p>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-16">
            <span className="text-[#caff00] text-xs font-mono font-bold">01</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
            <span className="text-[#444] text-xs uppercase tracking-widest">Experience</span>
          </ScrollReveal>

          <div>
            {experience.map((job, i) => {
              const rowClass = "group border-b border-[#1a1a1a] py-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 hover:bg-[#0e0e0e] px-2 transition-colors rounded-xl";
              const inner = (
                <>
                  <div>
                    <span className="text-[#888] text-xs font-mono">{job.period}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-black text-white">{job.role}</h3>
                      <span className="text-[#caff00] font-bold text-sm">at {job.company}</span>
                      {job.projectSlug && (
                        <ExternalLink size={13} className="text-[#333] group-hover:text-[#caff00] transition-colors ml-auto shrink-0" />
                      )}
                    </div>
                    <ul className="space-y-2">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[#888] text-sm">
                          <span className="text-[#333] mt-0.5 shrink-0">--</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              );
              return (
                <ScrollReveal key={`${job.company}-${i}`} delay={i * 0.07}>
                  {job.projectSlug ? (
                    <Link href={`/projects/${job.projectSlug}`} className={rowClass}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={rowClass}>{inner}</div>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="bg-[#0e0e0e] border-t border-[#1a1a1a] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <ScrollReveal className="flex items-center gap-4 mb-12">
            <span className="text-[#caff00] text-xs font-mono font-bold">02</span>
            <div className="h-px flex-1 bg-[#1a1a1a]" />
            <span className="text-[#444] text-xs uppercase tracking-widest">Education</span>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {education.map((e, i) => (
              <ScrollReveal key={e.institution} delay={i * 0.1}>
                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-8 hover:border-[#2a2a2a] transition-colors">
                  <span className="text-[#caff00] text-xs font-bold uppercase tracking-widest">{e.year}</span>
                  <h3 className="text-white font-black text-lg mt-3 mb-1">{e.degree}</h3>
                  <p className="text-[#888] text-sm">{e.institution}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
