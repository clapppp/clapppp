import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// 프로젝트 레포를 npm 의존성으로 받아서, 레포 안의 docs/index.mdx 를 설명 페이지로 쓴다.
export type ProjectMeta = {
  slug: string;
  pkg: string;
  demo: boolean; // 사이트 안에서 바로 실행되는 데모가 있는지
};

// 프로젝트를 붙일 때 여기에 한 줄씩 추가한다. (지금은 비워 둠)
export const projects: ProjectMeta[] = [
  // { slug: "websocket", pkg: "websocket-playground", demo: true },
  // { slug: "peercon", pkg: "peercon-docs", demo: false },
];

export type Project = ProjectMeta & {
  title: string;
  summary: string;
  tags: string[];
  repo: string;
  content: string;
};

export function getProject(slug: string): Project | undefined {
  const meta = projects.find((p) => p.slug === slug);
  if (!meta) return undefined;
  const file = path.join(process.cwd(), "node_modules", meta.pkg, "docs", "index.mdx");
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    ...meta,
    title: data.title ?? meta.slug,
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    repo: data.repo ?? "",
    content,
  };
}

export function getAllProjects(): Project[] {
  return projects.map((p) => getProject(p.slug)).filter((p): p is Project => !!p);
}
