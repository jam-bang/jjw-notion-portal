import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getAllGuides, isNotionConfigured } from "@/lib/notion";
import { isPublished } from "@/lib/notion/mapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotionSetupNotice } from "@/components/guide/NotionSetupNotice";
import { formatDate } from "@/lib/format";

export const revalidate = 60;
export const metadata: Metadata = { title: "가이드 현황", robots: { index: false } };

function countBy<T>(items: T[], key: (item: T) => string) {
  const map = new Map<string, number>();
  for (const item of items) map.set(key(item), (map.get(key(item)) ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

/** v1.1 관리자 현황: 발행/초안 수, 카테고리·난이도 분포, 최근 수정 (읽기 전용) */
export default async function AdminPage() {
  const guides = await getAllGuides();
  const published = guides.filter(isPublished);
  const drafts = guides.length - published.length;
  const recent = [...guides].sort((a, b) => b.lastEditedAt.localeCompare(a.lastEditedAt)).slice(0, 5);

  const stats = [
    { label: "전체 가이드", value: guides.length },
    { label: "발행됨", value: published.length },
    { label: "초안", value: drafts },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">가이드 현황</h1>
        <p className="text-sm text-muted-foreground">Notion 데이터베이스 기준 · 60초마다 갱신 · 편집은 Notion에서</p>
      </header>

      {!isNotionConfigured() && <NotionSetupNotice />}

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {[
          { title: "카테고리별 (발행)", rows: countBy(published, (g) => g.category) },
          { title: "난이도별 (발행)", rows: countBy(published, (g) => g.level || "미지정") },
        ].map((block) => (
          <Card key={block.title}>
            <CardHeader>
              <CardTitle className="text-base">{block.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {block.rows.map(([name, count]) => (
                  <li key={name} className="flex items-center gap-3">
                    <span className="w-28 shrink-0">{name}</span>
                    <span
                      className="h-2 rounded-full bg-primary/70"
                      style={{ width: `${(count / Math.max(published.length, 1)) * 100}%` }}
                    />
                    <span className="text-muted-foreground">{count}</span>
                  </li>
                ))}
                {block.rows.length === 0 && <li className="text-muted-foreground">데이터 없음</li>}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">최근 수정 5건</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y text-sm">
              {recent.map((g) => (
                <li key={g.id} className="flex items-center justify-between gap-3 py-2">
                  <span className="truncate">
                    {g.title} <span className="text-xs text-muted-foreground">· {g.status || "상태 없음"}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                    {formatDate(g.lastEditedAt)}
                    <a href={g.notionUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-primary">
                      Notion <ExternalLink className="size-3" aria-hidden />
                    </a>
                  </span>
                </li>
              ))}
              {recent.length === 0 && <li className="py-2 text-muted-foreground">데이터 없음</li>}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
