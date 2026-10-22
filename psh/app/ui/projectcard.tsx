import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:bg-[var(--surface-hover)] hover:border-[var(--accent)] duration-150"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <span className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 duration-150">→</span>
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.demo && (
          <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs text-[var(--accent)]">Live demo</span>
        )}
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted)]">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
