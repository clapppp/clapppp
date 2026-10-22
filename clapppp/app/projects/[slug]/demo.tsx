"use client";

import dynamic from "next/dynamic";

// slug -> 사이트에서 실행할 데모 컴포넌트 (three.js / WebSocket 은 브라우저 전용)
const demos: Record<string, React.ComponentType> = {
  websocket: dynamic(() => import("websocket-playground/client").then((m) => m.Playground), { ssr: false }),
};

export default function Demo({ slug }: { slug: string }) {
  const Component = demos[slug];
  if (!Component) return null;
  return (
    <div className="h-[420px] sm:h-[520px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <Component />
    </div>
  );
}
