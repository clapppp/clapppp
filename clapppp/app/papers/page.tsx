import Link from "next/link";
import { getAllPapers } from "@/lib/papers";

export const metadata = { title: "Papers · Park Suhyeon" };

export default function PapersPage() {
  const papers = getAllPapers();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Papers</h1>
        <p className="text-[var(--muted)]">읽고 리뷰한 논문과 발표 슬라이드를 모아 둔 곳입니다.</p>
      </header>

      {papers.length === 0 ? (
        <p className="text-[var(--muted)]">아직 올린 리뷰가 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {papers.map((paper) => (
            <li key={paper.slug}>
              <Link
                href={`/papers/${paper.slug}`}
                className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:bg-[var(--surface-hover)] hover:border-[var(--accent)] duration-150"
              >
                <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <time>{paper.date}</time>
                  {paper.venue && <span>· {paper.venue}</span>}
                </div>
                <h2 className="mt-1 text-lg font-semibold">{paper.title}</h2>
                {paper.authors && <p className="mt-0.5 text-sm text-[var(--muted)]">{paper.authors}</p>}
                {paper.summary && <p className="mt-2 text-sm text-[var(--muted)]">{paper.summary}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {paper.pdf && (
                    <span className="rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-xs text-[var(--accent)]">Slides</span>
                  )}
                  {paper.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs text-[var(--muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
