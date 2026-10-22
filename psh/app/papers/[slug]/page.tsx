import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPapers, getPaper } from "@/lib/papers";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPapers().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const paper = getPaper((await params).slug);
  return { title: paper ? `${paper.title} · Park Suhyeon` : "Not found" };
}

const button =
  "rounded-full border border-[var(--border)] px-4 py-1.5 text-sm hover:bg-[var(--surface-hover)] hover:border-[var(--accent)] duration-150";

export default async function PaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const paper = getPaper((await params).slug);
  if (!paper) notFound();

  return (
    <article className="flex flex-col gap-8">
      <Link href="/papers" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
        ← Papers
      </Link>

      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <time>{paper.date}</time>
          {paper.venue && <span>· {paper.venue}</span>}
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{paper.title}</h1>
        {paper.authors && <p className="text-[var(--muted)]">{paper.authors}</p>}
        <div className="flex flex-wrap items-center gap-2">
          {paper.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {paper.link && (
            <a href={paper.link} className={button}>
              원문 →
            </a>
          )}
          {paper.pdf && (
            <a href={paper.pdf} download className={button}>
              PDF 다운로드
            </a>
          )}
          {paper.pptx && (
            <a href={paper.pptx} download className={button}>
              PPT 다운로드
            </a>
          )}
        </div>
      </header>

      {paper.pdf ? (
        <iframe
          src={`${paper.pdf}#view=FitH`}
          title={`${paper.title} 슬라이드`}
          className="h-[70vh] min-h-[420px] w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
        />
      ) : (
        <p className="rounded-2xl border border-dashed border-[var(--border)] p-6 text-sm text-[var(--muted)]">
          슬라이드를 준비 중입니다.
        </p>
      )}

      {paper.content.trim() && (
        <div className="prose-doc">
          <MDXRemote source={paper.content} />
        </div>
      )}
    </article>
  );
}
