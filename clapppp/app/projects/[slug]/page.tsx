import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, projects } from "@/lib/projects";
import Demo from "./demo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return { title: project ? `${project.title} · Park Suhyeon` : "Not found" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="text-[var(--muted)]">{project.summary}</p>
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted)]">
              {tag}
            </span>
          ))}
          {project.repo && (
            <a href={project.repo} className="ml-auto text-sm text-[var(--accent)] hover:underline underline-offset-4">
              GitHub →
            </a>
          )}
        </div>
      </header>

      {project.demo && <Demo slug={project.slug} />}

      <div className="prose-doc">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}
