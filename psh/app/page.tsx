import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import ProjectCard from "./ui/projectcard";

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-4">
        <p className="text-sm text-[var(--accent)]">Backend / Network Developer</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Park Suhyeon<span className="text-[var(--muted)]">,</span>
          <br />
          <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent">
            building things to learn how they work.
          </span>
        </h1>
        <p className="max-w-xl text-[var(--muted)] leading-relaxed">
          공부한 내용을 기록하고, 만들어보고 싶은 것들을 만들어 올리는 공간입니다.
          WebSocket, P2P 같은 네트워크를 직접 구현하면서 배운 것을 정리합니다.
        </p>
        <div className="mt-2 flex gap-3">
          <Link href="/projects" className="rounded-full bg-[var(--text)] px-5 py-2 text-sm font-medium text-[var(--bg)] hover:opacity-90 duration-150">
            프로젝트 보기
          </Link>
          <a href="https://github.com/clapppp" className="rounded-full border border-[var(--border)] px-5 py-2 text-sm hover:bg-[var(--surface-hover)] duration-150">
            GitHub
          </a>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm uppercase tracking-widest text-[var(--muted)]">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
