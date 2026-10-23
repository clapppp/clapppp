import { getAllPapers } from "@/lib/papers";
import EntryList from "../ui/entrylist";

export const metadata = { title: "Papers · Park Suhyeon" };

export default function PapersPage() {
  const papers = getAllPapers();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold tracking-tight">papers</h1>
        <p className="text-sm text-[var(--muted)]">읽고 리뷰한 논문과 발표 슬라이드입니다.</p>
      </header>

      {papers.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">아직 올린 리뷰가 없습니다.</p>
      ) : (
        <EntryList
          entries={papers.map((p) => ({
            href: `/papers/${p.slug}`,
            label: p.date,
            title: p.title,
            summary: [p.authors, p.venue].filter(Boolean).join(" · "),
          }))}
        />
      )}
    </div>
  );
}
