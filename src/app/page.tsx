import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";
import AnimatedSection from "@/components/AnimatedSection";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";

const skills = [
  { label: "User Research", color: "bg-violet-100 text-violet-700" },
  { label: "Wireframing", color: "bg-cyan-100 text-cyan-700" },
  { label: "Prototyping", color: "bg-orange-100 text-orange-700" },
  { label: "Usability Testing", color: "bg-pink-100 text-pink-700" },
  { label: "Design Systems", color: "bg-violet-100 text-violet-700" },
  { label: "User Flows", color: "bg-emerald-100 text-emerald-700" },
  { label: "Responsive Design", color: "bg-cyan-100 text-cyan-700" },
  { label: "Developer Handoff", color: "bg-orange-100 text-orange-700" },
  { label: "Branding", color: "bg-pink-100 text-pink-700" },
  { label: "Video Editing", color: "bg-emerald-100 text-emerald-700" },
  { label: "AI-Powered Workflows", color: "bg-violet-100 text-violet-700" },
  { label: "Shopify", color: "bg-cyan-100 text-cyan-700" },
];

const metrics = [
  {
    value: "3.6% → 13.8%",
    label: "Conversion rate",
    color: "from-violet-500 to-violet-700",
  },
  {
    value: "+54.9%",
    label: "Form submissions",
    color: "from-orange-400 to-orange-600",
  },
  {
    value: "+23%",
    label: "Session duration",
    color: "from-cyan-400 to-cyan-600",
  },
];

const featuredProjects = projects.filter((p) => p.featured);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-violet-100/60 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full bg-cyan-100/60 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-orange-100/50 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            <AnimatedSection>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-sm font-semibold px-3 py-1.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for work
                </span>
                <span className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-600 text-sm font-medium px-3 py-1.5 rounded-full">
                  <MapPin size={13} />
                  Remote / Bangkok
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold text-stone-900 mb-4 leading-[1.05]">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
                  Keith Paul.
                </span>
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-2xl md:text-3xl text-stone-500 font-medium mb-6">
                UI/UX Designer
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-lg text-stone-600 max-w-2xl mb-10 leading-relaxed">
                I care about doing things the right way, not just the fast way. I take designs from
                research and wireframing through prototyping, usability testing, and developer
                handoff. Lately I have been going deep into AI, using it actively in my design
                workflow.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-7 py-4 rounded-full transition-colors"
                >
                  View My Work
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white font-semibold px-7 py-4 rounded-full transition-colors"
                >
                  Get In Touch
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="bg-stone-900">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <AnimatedSection>
            <p className="text-stone-400 text-sm font-medium uppercase tracking-widest mb-8 text-center">
              Impact by the numbers
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((m, i) => (
              <AnimatedSection key={m.label} delay={i * 0.1}>
                <div className="bg-stone-800/50 rounded-2xl p-8 text-center border border-stone-700/50">
                  <p
                    className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${m.color} bg-clip-text text-transparent mb-2`}
                  >
                    {m.value}
                  </p>
                  <p className="text-stone-400 text-sm">{m.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-stone-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-2">
                  Selected Work
                </p>
                <h2 className="text-4xl md:text-5xl font-bold text-stone-900">
                  Featured Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden md:inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium transition-colors"
              >
                All projects
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <AnimatedSection key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="mt-10 text-center md:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-violet-600 font-semibold"
              >
                All projects <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white py-20 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-2">
                What I do
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Skills</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((s) => (
                <span
                  key={s.label}
                  className={`text-sm font-semibold px-4 py-2 rounded-full ${s.color}`}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-stone-50 py-20 md:py-28 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-2">
                Kind words
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900">What people say</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, 2).map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <blockquote className="bg-white rounded-2xl p-8 border border-stone-100 hover:shadow-md transition-shadow">
                  <p className="text-4xl text-violet-300 font-serif leading-none mb-4">&ldquo;</p>
                  <p className="text-stone-700 leading-relaxed mb-6">{t.quote}</p>
                  <footer className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                      <p className="text-stone-400 text-xs">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.2}>
            <div className="mt-8 text-center">
              <Link
                href="/about#testimonials"
                className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium text-sm transition-colors"
              >
                <Sparkles size={14} />
                Read all testimonials
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
