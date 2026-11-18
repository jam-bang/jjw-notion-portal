import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LEVEL_STYLE: Record<string, string> = {
  입문: "border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  중급: "border-amber-500/40 text-amber-700 dark:text-amber-300",
  고급: "border-rose-500/40 text-rose-700 dark:text-rose-300",
};

export function LevelBadge({ level }: { level: string }) {
  if (!level) return null;
  return (
    <Badge variant="outline" className={cn(LEVEL_STYLE[level])}>
      {level}
    </Badge>
  );
}
