"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <p className="text-lg font-semibold">가이드를 불러오지 못했습니다.</p>
      <p className="text-sm text-muted-foreground">Notion 연결 상태를 확인한 뒤 다시 시도해 주세요.</p>
      <button onClick={reset} className="rounded-md border px-4 py-2 text-sm hover:bg-secondary">
        다시 시도
      </button>
    </div>
  );
}
