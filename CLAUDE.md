# jjw-notion-portal

Notion을 CMS로 사용하는 AI 개발 가이드 포탈 (Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui).

## 규칙
- Notion API 호출은 `src/lib/notion` 에서만 한다. 페이지/컴포넌트에서 직접 호출 금지
- `NOTION_API_KEY` 는 서버 전용. `NEXT_PUBLIC_` 접두사 금지, 코드·문서에 값 하드코딩 금지
- 작업 순서는 골격 → 공통 모듈 → 개별 기능
- 주석·커밋 메시지·문서는 한국어, 커밋은 Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`)

## 금지
- `.env`, `.env.local` 읽기·수정 금지
- 비밀 값 커밋 금지
