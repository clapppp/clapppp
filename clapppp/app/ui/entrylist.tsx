import Link from "next/link";

export type Entry = {
  href: string;
  label: string; // 왼쪽 열: 날짜나 분류
  title: string;
  summary?: string;
};

export default function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {entries.map((entry) => (
        <li key={entry.href}>
          <Link href={entry.href} className="group grid grid-cols-[6.5rem_1fr] gap-4">
            <span className="text-sm text-[var(--muted)] tabular-nums">{entry.label}</span>
            <span>
              <span className="group-hover:underline">{entry.title}</span>
              {entry.summary && <span className="mt-0.5 block text-sm text-[var(--muted)]">{entry.summary}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
