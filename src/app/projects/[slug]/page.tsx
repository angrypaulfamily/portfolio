import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import ContactCTA from "@/components/ContactCTA";
import AnimatedSection from "@/components/AnimatedSection";
import ProjectCard from "@/components/ProjectCard";
import { projects, getProjectBySlug } from "@/data/projects";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Keith Paul`,
    description: project.headline,
  };
}

const accentBg: Record<string, string> = {
  violet: "bg-violet-600",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  emerald: "bg-emerald-500",
};

const accentText: Record<string, string> = {
  violet: "text-violet-600",
  cyan: "text-cyan-600",
  orange: "text-orange-600",
  pink: "text-pink-600",
  emerald: "text-emerald-600",
};

const accentLight: Record<string, string> = {
  violet: "bg-violet-50",
  cyan: "bg-cyan-50",
  orange: "bg-orange-50",
  pink: "bg-pink-50",
  emerald: "bg-emerald-50",
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const bg = accentBg[project.accent] ?? "bg-violet-600";
  const textAccent = accentText[project.accent] ?? "text-violet-600";
  const lightBg = accentLight[project.accent] ?? "bg-violet-50";

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <>
      {/* Back link */}
      <div className="bg-stone-50 border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-sm font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            All projects
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-stone-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.type.map((t) => (
                <span
                  key={t}
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${lightBg} ${textAccent}`}
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4 max-w-3xl">
              {project.title}
            </h1>
            <p className="text-xl text-stone-500 max-w-2xl mb-8">{project.headline}</p>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 ${bg} text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-opacity hover:opacity-90`}
              >
                View Live Site
                <ArrowUpRight size={15} />
              </a>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Metrics */}
      {project.metrics && (
        <section className="bg-stone-900 py-14">
          <div className="max-w-6xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-stone-400 text-sm font-medium uppercase tracking-widest mb-8 text-center">
                Results after 3 months
              </p>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.metrics.map((m, i) => (
                <AnimatedSection key={m.label} delay={i * 0.1}>
                  <div className="bg-stone-800/50 rounded-2xl p-8 text-center border border-stone-700/50">
                    <p className={`text-3xl font-bold ${textAccent} mb-2`}>{m.value}</p>
                    <p className="text-stone-400 text-sm">{m.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="bg-white py-16 border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <h2 className={`text-sm font-semibold uppercase tracking-widest ${textAccent} mb-3`}>
              Overview
            </h2>
            <p className="text-stone-700 text-lg leading-relaxed">{project.overview}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Process sections */}
      {project.sections && (
        <section className="bg-white py-4 pb-20">
          <div className="max-w-3xl mx-auto px-6 space-y-12">
            {project.sections.map((s, i) => (
              <AnimatedSection key={s.heading} delay={i * 0.05}>
                <div className={`border-l-4 ${bg.replace("bg-", "border-")} pl-6`}>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{s.heading}</h3>
                  <p className="text-stone-600 leading-relaxed">{s.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      {/* Deliverables */}
      {project.deliverables && (
        <section className="bg-white py-4 pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <AnimatedSection>
              <h2 className={`text-sm font-semibold uppercase tracking-widest ${textAccent} mb-6`}>
                What I Delivered
              </h2>
              <ul className="space-y-3">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className={`${textAccent} mt-0.5 shrink-0`} />
                    <span className="text-stone-700">{d}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="bg-stone-50 py-20 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-stone-900 mb-8">More projects</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((p, i) => (
              <AnimatedSection key={p.slug} delay={i * 0.1}>
                <ProjectCard project={p} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
