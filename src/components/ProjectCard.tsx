import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

const accentColors: Record<string, string> = {
  violet: "#8B5CF6",
  cyan: "#06B6D4",
  orange: "#F97316",
  pink: "#EC4899",
  emerald: "#10B981",
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  const color = accentColors[project.accent] ?? "#7C3AED";

  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#333] transition-all duration-300 hover:-translate-y-1">
        {/* Image or color art */}
        <div className="relative h-48 overflow-hidden" style={{ backgroundColor: `${color}12` }}>
          {project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[80px] font-black uppercase leading-none tracking-tighter opacity-20 select-none"
                style={{ color }}
              >
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          {index !== undefined && (
            <span
              className="absolute top-3 left-4 text-xs font-mono font-bold z-10"
              style={{ color: `${color}cc`, textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
            >
              0{index + 1}
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111] to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.type.map((t) => (
              <span
                key={t}
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border"
                style={{ borderColor: `${color}40`, color }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl font-black text-white">{project.title}</h3>
            <ArrowUpRight
              size={18}
              className="text-[#444] group-hover:text-[#caff00] shrink-0 mt-0.5 transition-colors"
            />
          </div>

          <p className="text-[#888] text-sm leading-relaxed">{project.headline}</p>

          {project.metrics && (
            <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-[#1e1e1e]">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-xs font-black text-white">{m.value}</p>
                  <p className="text-[10px] text-[#888] mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
