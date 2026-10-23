import { getAllProjects } from "@/lib/projects";
import EntryList from "../ui/entrylist";

export const metadata = { title: "Projects · Park Suhyeon" };

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold tracking-tight">projects</h1>
      {projects.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">준비 중입니다.</p>
      ) : (
        <EntryList
          entries={projects.map((p) => ({
            href: `/projects/${p.slug}`,
            label: p.tags[0] ?? "",
            title: p.title,
            summary: p.summary,
          }))}
        />
      )}
    </div>
  );
}
