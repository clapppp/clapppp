import { getAllProjects } from "@/lib/projects";
import ProjectCard from "../ui/projectcard";

export const metadata = { title: "Projects · Park Suhyeon" };

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
