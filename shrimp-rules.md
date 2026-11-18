# Development Guidelines — jjw-notion-portal

## 프로젝트 개요
- Notion을 CMS로 쓰는 AI 개발 가이드 포탈
- 스택: Next.js 15 (App Router) · TypeScript strict · Tailwind CSS · shadcn/ui · Lucide React · @notionhq/client · Vercel
- 기준 문서: `docs/PRD.md`(무엇을), `docs/ROADMAP.md`(어떤 순서로)

## 작업 순서 규칙
- ROADMAP Phase 순서(골격 → 공통 → 핵심 → 추가 → 최적화·배포)를 지켜라
- 공통 타입·Notion 모듈·공통 UI가 끝나기 전에 화면(page.tsx)을 만들지 마라
- 각 Phase가 끝나면 Phase 단위로 커밋하라 (예: `feat(phase2): Notion 공통 모듈`)

## 디렉터리 규칙
- `src/app/` : 라우트(page·layout·error·loading·not-found)만 둔다
- `src/lib/notion/` : Notion API 호출의 유일한 위치 (`client.ts`, `mapper.ts`, `index.ts`)
- `src/types/` : 도메인 타입 (`guide.ts`)
- `src/components/ui/` : shadcn/ui 원본 컴포넌트, `src/components/guide/`·`layout/` : 도메인 컴포넌트
- Starter Kit의 `.claude/`, `.mcp.json`, `shrimp_data/`는 삭제하지 마라

## Notion 연동 규칙
- `NOTION_API_KEY`, `NOTION_DATABASE_ID`는 `process.env`로 서버에서만 읽어라. `NEXT_PUBLIC_` 접두사 금지
- Status 속성은 `select`·`status` 타입 모두 처리하고 `발행됨`만 반환하라 (DB 필터에 의존하지 말고 코드에서 필터)
- 새 Notion 속성을 쓰면 `src/types/guide.ts`, `src/lib/notion/mapper.ts`, `docs/PRD.md` 4장을 함께 수정하라

## 렌더링·캐싱 규칙
- 페이지에서 `export const revalidate = 60;`처럼 리터럴로 선언하라 (상수 참조 금지)
- 없는 slug는 `notFound()`를 호출하라

## 코드 스타일
- 컴포넌트 PascalCase, 함수·변수 camelCase, 파일명은 컴포넌트명과 동일
- 주석·커밋 메시지·문서는 한국어
- 클래스 병합은 `cn()` 사용

## 파일 동시 수정 규칙
- 환경 변수 추가 시 `.env.example`, `README.md`를 함께 수정하라
- 로드맵 범위가 바뀌면 `docs/ROADMAP.md` 버전 기록을 갱신하라

## AI 판단 기준
- 기능 추가 요청이 PRD에 없으면 ROADMAP Phase 4 이후로 분류하고 사용자에게 확인하라
- 공통 모듈과 화면 중 어디에 둘지 애매하면 두 곳 이상에서 쓰이면 공통으로 둔다

## 금지
- `.env`, `.env.local` 읽기·수정·커밋 금지
- 페이지·컴포넌트에서 `@notionhq/client` 직접 import 금지
- `shrimp_data/`를 `.gitignore`에 추가 금지
