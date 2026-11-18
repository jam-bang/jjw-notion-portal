import { CalendarDays, UserRound } from "lucide-react";
import { formatDate } from "@/lib/format";

export function GuideMeta({ author, date }: { author?: string; date: string | null }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      {author && (
        <span className="inline-flex items-center gap-1">
          <UserRound className="size-3.5" aria-hidden />
          {author}
        </span>
      )}
      {date && (
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="size-3.5" aria-hidden />
          {formatDate(date)}
        </span>
      )}
    </div>
  );
}
