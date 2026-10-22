import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// 리뷰 한 편 = content/papers/<slug>.mdx (정보 + 메모) + public/papers/<slug>.pdf (슬라이드).
// 파일명이 곧 주소(/papers/<slug>)가 된다.
const dir = path.join(process.cwd(), "content", "papers");

export type Paper = {
  slug: string;
  title: string; // 논문 제목
  authors: string;
  venue: string; // 학회/저널, 연도
  date: string; // 리뷰한 날짜 YYYY-MM-DD
  summary: string;
  tags: string[];
  pdf?: string; // public/ 기준 경로, 예: /papers/attention.pdf
  pptx?: string;
  link?: string; // 원문 링크
  content: string;
};

function read(file: string): Paper {
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title ?? file,
    authors: data.authors ?? "",
    venue: data.venue ?? "",
    // YAML 이 날짜를 Date 로 파싱하므로 문자열로 맞춘다.
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    pdf: data.pdf,
    pptx: data.pptx,
    link: data.link,
    content,
  };
}

export function getAllPapers(): Paper[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map(read)
    .sort((a, b) => b.date.localeCompare(a.date)); // 최신순
}

export function getPaper(slug: string): Paper | undefined {
  return getAllPapers().find((p) => p.slug === slug);
}
