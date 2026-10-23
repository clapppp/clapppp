import { getAllProjects } from "@/lib/projects";
import { getAllPapers } from "@/lib/papers";
import EntryList from "./ui/entrylist";

export default function Home() {
  const projects = getAllProjects();
  const papers = getAllPapers();

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold tracking-tight">Park Suhyeon</h1>
        <p className="leading-relaxed">
          공부한 내용을 기록하고, 만들어보고 싶은 것들을 만들어 올리는 공간입니다.
          WebSocket, P2P 같은 네트워크를 직접 구현하면서 배운 것을 정리합니다.
        </p>
      </section>

      {projects.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm text-[var(--muted)]">projects</h2>
          <EntryList
            entries={projects.map((p) => ({
              href: `/projects/${p.slug}`,
              label: p.tags[0] ?? "",
              title: p.title,
              summary: p.summary,
            }))}
          />
        </section>
      )}

      {papers.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm text-[var(--muted)]">papers</h2>
          <EntryList
            entries={papers.map((p) => ({
              href: `/papers/${p.slug}`,
              label: p.date,
              title: p.title,
            }))}
          />
        </section>
      )}
    </div>
  );
}
