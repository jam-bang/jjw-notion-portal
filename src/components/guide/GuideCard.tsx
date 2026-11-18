import Link from "next/link";
import type { Guide } from "@/types/guide";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryBadge } from "./CategoryBadge";
import { LevelBadge } from "./LevelBadge";
import { GuideMeta } from "./GuideMeta";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col transition group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
        <CardHeader>
          <div className="flex flex-wrap gap-1.5">
            <CategoryBadge category={guide.category} />
            <LevelBadge level={guide.level} />
          </div>
          <CardTitle className="text-lg group-hover:text-primary">{guide.title}</CardTitle>
          {guide.summary && <CardDescription className="line-clamp-2">{guide.summary}</CardDescription>}
        </CardHeader>
        <CardContent className="mt-auto space-y-3">
          {guide.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {guide.tags.map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <GuideMeta author={guide.author} date={guide.publishedAt} />
        </CardContent>
      </Card>
    </Link>
  );
}
