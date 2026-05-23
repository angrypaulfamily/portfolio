import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

const accentMap: Record<string, string> = {
  violet: "bg-violet-600",
  cyan: "bg-cyan-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  emerald: "bg-emerald-500",
};

const tagMap: Record<string, string> = {
  violet: "bg-violet-100 text-violet-700",
  cyan: "bg-cyan-100 text-cyan-700",
  orange: "bg-orange-100 text-orange-700",
  pink: "bg-pink-100 text-pink-700",
  emerald: "bg-emerald-100 text-emerald-700",
};

export default function ProjectCard({ project }: { project: Project }) {
  const accent = accentMap[project.accent] ?? "bg-violet-600";
  const tag = tagMap[project.accent] ?? "bg-violet-100 text-violet-700";

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className={`h-1.5 ${accent}`} />
      <div className="p-7">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.type.map((t) => (
            <span key={t} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tag}`}>
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-stone-900 mb-2">{project.title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed mb-5">{project.headline}</p>

        {project.metrics && (
          <div className="grid grid-cols-3 gap-3 mb-5">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-stone-50 rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-stone-900">{m.value}</p>
                <p className="text-xs text-stone-400 mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm font-semibold text-violet-600 hover:text-violet-700 flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            Case Study
            <ArrowUpRight size={15} />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-400 hover:text-stone-600 flex items-center gap-1 transition-colors"
            >
              Live Site
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
