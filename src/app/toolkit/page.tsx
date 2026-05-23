import ContactCTA from "@/components/ContactCTA";
import AnimatedSection from "@/components/AnimatedSection";
import { toolkit } from "@/data/toolkit";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolkit — Keith Paul",
  description: "The tools Keith Paul uses across design, development, and AI-powered workflows.",
};

const colorMap: Record<string, { tag: string; dot: string; header: string }> = {
  violet: {
    tag: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
    header: "text-violet-600",
  },
  cyan: {
    tag: "bg-cyan-100 text-cyan-700",
    dot: "bg-cyan-500",
    header: "text-cyan-600",
  },
  orange: {
    tag: "bg-orange-100 text-orange-700",
    dot: "bg-orange-500",
    header: "text-orange-600",
  },
  pink: {
    tag: "bg-pink-100 text-pink-700",
    dot: "bg-pink-500",
    header: "text-pink-600",
  },
};

export default function ToolkitPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-stone-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-widest mb-3">
              My stack
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-4">My Toolkit</h1>
            <p className="text-stone-500 text-lg max-w-xl">
              A curated set of tools I use across design, development, and AI-powered workflows.
              Each one earns its place by actually making the work better.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Tool Categories */}
      <section className="bg-white pb-24 border-t border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          {toolkit.map((category, catIndex) => {
            const colors = colorMap[category.color] ?? colorMap.violet;
            return (
              <div key={category.category} className="py-14 border-b border-stone-100 last:border-none">
                <AnimatedSection delay={catIndex * 0.05}>
                  <div className="flex items-center gap-3 mb-10">
                    <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                    <h2 className={`text-sm font-bold uppercase tracking-widest ${colors.header}`}>
                      {category.category}
                    </h2>
                  </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {category.tools.map((tool, i) => (
                    <AnimatedSection key={tool.name} delay={catIndex * 0.05 + i * 0.07}>
                      <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="font-bold text-stone-900 text-base">{tool.name}</h3>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${colors.tag}`}
                          >
                            {tool.subtitle.split(" ").slice(0, 2).join(" ")}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-stone-400 mb-3">{tool.subtitle}</p>
                        <p className="text-stone-600 text-sm leading-relaxed">{tool.description}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
