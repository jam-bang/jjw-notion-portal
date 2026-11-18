import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getCategories, getGuides, isNotionConfigured } from "@/lib/notion";
import { GuideGrid } from "@/components/guide/GuideGrid";
import { NotionSetupNotice } from "@/components/guide/NotionSetupNotice";

export const revalidate = 60;

export default async function HomePage() {
  const [guides, categories] = await Promise.all([getGuides(), getCategories()]);

  return (
    <div className="space-y-12">
      <section className="rounded-2xl border bg-gradient-to-br from-accent to-background px-6 py-12 sm:px-10">
        <p className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          <Sparkles className="size-4" aria-hidden /> 팀 AI 개발 가이드
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          클로드 코드, 팀 방식으로 쓰는 법
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          사업 현장에서 검증한 프롬프트·설정·MCP 활용법을 Notion에 정리하고 이곳에서 찾아봅니다.
        </p>
        <Link
          href="/guides"
          className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          전체 가이드 보기 <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      {!isNotionConfigured() && <NotionSetupNotice />}

      {categories.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">카테고리</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={`/category/${encodeURIComponent(c.name)}`}
                className="rounded-full border px-3 py-1 text-sm hover:border-primary hover:text-primary"
              >
                {c.name} <span className="text-muted-foreground">{c.count}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">최근 가이드</h2>
        <GuideGrid guides={guides.slice(0, 6)} />
      </section>
    </div>
  );
}
