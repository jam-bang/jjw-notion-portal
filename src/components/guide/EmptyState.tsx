import { FileQuestion } from "lucide-react";

export function EmptyState({ text = "표시할 가이드가 없습니다." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-16 text-center text-muted-foreground">
      <FileQuestion className="size-8" aria-hidden />
      <p className="text-sm">{text}</p>
    </div>
  );
}
