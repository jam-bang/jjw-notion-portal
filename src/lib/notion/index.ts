import "server-only";
import { cache } from "react";
import { isFullPage } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import type { Guide, GuideDetail } from "@/types/guide";
import { getDatabaseId, getNotionClient, isNotionConfigured } from "./client";
import { isPublished, toGuide } from "./mapper";

export { isNotionConfigured } from "./client";

/** 모든 가이드 (상태 무관). 상태 필터는 DB 쿼리가 아닌 코드에서 처리 */
export const getAllGuides = cache(async (): Promise<Guide[]> => {
  if (!isNotionConfigured()) return [];
  const notion = getNotionClient();
  const guides: Guide[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion.databases.query({
      database_id: getDatabaseId(),
      start_cursor: cursor,
      page_size: 100,
    });
    for (const page of res.results) {
      if (isFullPage(page)) guides.push(toGuide(page));
    }
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return guides;
});

function byPublishedDesc(a: Guide, b: Guide) {
  return (b.publishedAt ?? b.lastEditedAt).localeCompare(a.publishedAt ?? a.lastEditedAt);
}

/** 발행된 가이드만, 발행일 내림차순 */
export const getGuides = cache(async (): Promise<Guide[]> => {
  const all = await getAllGuides();
  return all.filter(isPublished).sort(byPublishedDesc);
});

export async function getGuidesByCategory(category: string): Promise<Guide[]> {
  return (await getGuides()).filter((g) => g.category === category);
}

/** 발행된 가이드에 쓰인 카테고리 목록과 개수 */
export async function getCategories(): Promise<{ name: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const g of await getGuides()) counts.set(g.category, (counts.get(g.category) ?? 0) + 1);
  return [...counts.entries()].map(([name, count]) => ({ name, count }));
}

export const getGuideBySlug = cache(async (slug: string): Promise<Guide | null> => {
  const guides = await getGuides();
  return guides.find((g) => g.slug === slug) ?? null;
});

/** 본문 블록 → 마크다운 */
export async function getGuideContent(pageId: string): Promise<string> {
  const n2m = new NotionToMarkdown({ notionClient: getNotionClient() });
  const blocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(blocks).parent ?? "";
}

export async function getGuideDetail(slug: string): Promise<GuideDetail | null> {
  const guide = await getGuideBySlug(slug);
  if (!guide) return null;
  return { ...guide, content: await getGuideContent(guide.id) };
}
