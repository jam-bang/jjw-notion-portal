import type { Guide } from "@/types/guide";
import { GuideCard } from "./GuideCard";
import { EmptyState } from "./EmptyState";

export function GuideGrid({ guides, emptyText }: { guides: Guide[]; emptyText?: string }) {
  if (guides.length === 0) return <EmptyState text={emptyText} />;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((g) => (
        <GuideCard key={g.id} guide={g} />
      ))}
    </div>
  );
}
