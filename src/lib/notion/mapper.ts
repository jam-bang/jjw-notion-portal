import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Guide } from "@/types/guide";

type Property = PageObjectResponse["properties"][string];

/** 영문/한글 속성 이름 모두 허용 (Notion AI로 만든 DB 대응) */
const ALIASES: Record<string, string[]> = {
  title: ["Title", "Name", "제목", "이름"],
  slug: ["Slug", "슬러그"],
  summary: ["Summary", "요약"],
  category: ["Category", "카테고리"],
  tags: ["Tags", "태그"],
  level: ["Level", "난이도"],
  status: ["Status", "상태"],
  author: ["Author", "작성자"],
  published: ["Published", "발행일"],
};

function pick(page: PageObjectResponse, key: keyof typeof ALIASES): Property | undefined {
  for (const name of ALIASES[key]) {
    if (page.properties[name]) return page.properties[name];
  }
  // title 속성은 이름과 무관하게 하나만 존재
  if (key === "title") return Object.values(page.properties).find((p) => p.type === "title");
  return undefined;
}

function plainText(prop: Property | undefined): string {
  if (!prop) return "";
  switch (prop.type) {
    case "title":
      return prop.title.map((t) => t.plain_text).join("");
    case "rich_text":
      return prop.rich_text.map((t) => t.plain_text).join("");
    case "select":
      return prop.select?.name ?? "";
    case "status":
      return prop.status?.name ?? "";
    case "people":
      return prop.people.map((p) => ("name" in p ? (p.name ?? "") : "")).join(", ");
    default:
      return "";
  }
}

function multiSelect(prop: Property | undefined): string[] {
  return prop?.type === "multi_select" ? prop.multi_select.map((o) => o.name) : [];
}

function date(prop: Property | undefined): string | null {
  return prop?.type === "date" ? (prop.date?.start ?? null) : null;
}

/** Notion 페이지 → Guide. Status는 select·status 어느 타입이든 처리 */
export function toGuide(page: PageObjectResponse): Guide {
  const slug = plainText(pick(page, "slug")).trim();
  return {
    id: page.id,
    slug: slug || page.id.replace(/-/g, ""),
    title: plainText(pick(page, "title")) || "(제목 없음)",
    summary: plainText(pick(page, "summary")),
    category: plainText(pick(page, "category")) || "기타",
    tags: multiSelect(pick(page, "tags")),
    level: plainText(pick(page, "level")),
    status: plainText(pick(page, "status")),
    author: plainText(pick(page, "author")),
    publishedAt: date(pick(page, "published")),
    lastEditedAt: page.last_edited_time,
    notionUrl: page.url,
  };
}

/** 발행 여부: 상태 값이 '발행됨' 또는 'Published' */
export function isPublished(guide: Guide): boolean {
  return ["발행됨", "published", "done", "완료"].includes(guide.status.toLowerCase());
}
