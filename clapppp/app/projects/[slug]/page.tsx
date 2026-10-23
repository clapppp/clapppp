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
      <header className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold tracking-tight">{project.title}</h1>
        <p className="text-[var(--muted)]">{project.summary}</p>
        <p className="flex flex-wrap gap-x-3 text-sm text-[var(--muted)]">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          {project.repo && (
            <a href={project.repo} className="underline hover:text-[var(--text)]">
              github
            </a>
          )}
        </p>
      </header>

      {project.demo && <Demo slug={project.slug} />}

      <div className="prose-doc">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}
