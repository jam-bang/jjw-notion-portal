/** 가이드 카테고리 (Notion select: Category) */
export const GUIDE_CATEGORIES = ["시작하기", "프롬프트", "설정·훅", "MCP", "사업 적용 사례"] as const;
export type GuideCategory = (typeof GUIDE_CATEGORIES)[number];

/** 난이도 (Notion select: Level) */
export const GUIDE_LEVELS = ["입문", "중급", "고급"] as const;
export type GuideLevel = (typeof GUIDE_LEVELS)[number];

/** 상태 (Notion select 또는 status: Status) */
export type GuideStatus = "초안" | "발행됨";

/** 웹에서 사용하는 가이드 모델 (Notion 페이지 → mapper로 변환) */
export interface Guide {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  level: string;
  status: string;
  author: string;
  publishedAt: string | null;
  lastEditedAt: string;
  notionUrl: string;
}

/** 상세 페이지용: 메타 + 본문 마크다운 */
export interface GuideDetail extends Guide {
  content: string;
}
