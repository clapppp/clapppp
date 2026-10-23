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

export default async function PaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const paper = getPaper((await params).slug);
  if (!paper) notFound();

  return (
    <article className="flex flex-col gap-8">
      <Link href="/papers" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
        ← papers
      </Link>

      <header className="flex flex-col gap-2">
        <p className="text-sm text-[var(--muted)]">
          {[paper.date, paper.venue].filter(Boolean).join(" · ")}
        </p>
        <h1 className="text-xl font-semibold tracking-tight">{paper.title}</h1>
        {paper.authors && <p className="text-[var(--muted)]">{paper.authors}</p>}
        <p className="flex flex-wrap gap-x-3 text-sm text-[var(--muted)]">
          {paper.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
          {paper.link && <a href={paper.link} className="underline hover:text-[var(--text)]">원문</a>}
          {paper.pdf && <a href={paper.pdf} download className="underline hover:text-[var(--text)]">pdf</a>}
          {paper.pptx && <a href={paper.pptx} download className="underline hover:text-[var(--text)]">ppt</a>}
        </p>
      </header>

      {paper.pdf ? (
        <iframe
          src={`${paper.pdf}#view=FitH`}
          title={`${paper.title} 슬라이드`}
          className="h-[70vh] min-h-[420px] w-full rounded border border-[var(--border)]"
        />
      ) : (
        <p className="text-sm text-[var(--muted)]">슬라이드를 준비 중입니다.</p>
      )}

      {paper.content.trim() && (
        <div className="prose-doc">
          <MDXRemote source={paper.content} />
        </div>
      )}
    </article>
  );
}
