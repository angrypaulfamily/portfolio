import ProjectCard from "@/components/ProjectCard";
import ContactCTA from "@/components/ContactCTA";
import AnimatedSection from "@/components/AnimatedSection";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Keith Paul",
  description: "Case studies and work by Keith Paul — UI/UX design, Shopify, branding, and more.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <>
      <section className="bg-stone-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-3">
              My work
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-4">Projects</h1>
            <p className="text-stone-500 text-lg max-w-xl">
              A selection of case studies and projects from UI/UX design, Shopify, branding, and ad
              design.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-stone-50 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-6">
              Featured
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {featured.map((project, i) => (
              <AnimatedSection key={project.slug} delay={i * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>

          {other.length > 0 && (
            <>
              <AnimatedSection>
                <p className="text-stone-400 text-xs font-semibold uppercase tracking-widest mb-6">
                  More work
                </p>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {other.map((project, i) => (
                  <AnimatedSection key={project.slug} delay={i * 0.1}>
                    <ProjectCard project={project} />
                  </AnimatedSection>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
