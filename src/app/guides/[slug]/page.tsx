import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getGuideBySlug, getGuideDetail, getGuides } from "@/lib/notion";
import { CategoryBadge } from "@/components/guide/CategoryBadge";
import { LevelBadge } from "@/components/guide/LevelBadge";
import { GuideMeta } from "@/components/guide/GuideMeta";
import { Markdown } from "@/components/markdown/Markdown";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getGuides()).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await getGuideBySlug((await params).slug);
  return guide ? { title: guide.title, description: guide.summary } : { title: "가이드 없음" };
}

export default async function GuideDetailPage({ params }: Props) {
  const guide = await getGuideDetail((await params).slug);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Link href="/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden /> 가이드 목록
      </Link>
      <header className="space-y-3 border-b pb-6">
        <div className="flex flex-wrap gap-1.5">
          <CategoryBadge category={guide.category} />
          <LevelBadge level={guide.level} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{guide.title}</h1>
        {guide.summary && <p className="text-muted-foreground">{guide.summary}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <GuideMeta author={guide.author} date={guide.publishedAt} />
          <a
            href={guide.notionUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
          >
            Notion에서 보기 <ExternalLink className="size-3" aria-hidden />
          </a>
        </div>
        {guide.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {guide.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
        )}
      </header>
      <Markdown content={guide.content} />
    </article>
  );
}
