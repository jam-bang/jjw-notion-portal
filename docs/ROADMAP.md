# ROADMAP — AI 개발 가이드 포탈

> 기준 문서: [PRD.md](PRD.md)
> 개발 순서 원칙: **골격 → 공통 → 개별 기능**. 공통 모듈 없이 화면부터 만들지 않는다.

| Phase | 이름 | 예상 기간 | 핵심 산출물 |
|-------|------|-----------|-------------|
| 1 | 프로젝트 초기 설정 (골격) | 1일 | Next.js 15 골격, Tailwind·shadcn/ui, 레이아웃, 환경 변수 템플릿 |
| 2 | 공통 모듈/컴포넌트 | 1~2일 | `src/lib/notion`, 공통 타입, GuideCard·Badge 등 공통 UI |
| 3 | 핵심 기능 | 2일 | 가이드 목록·상세·카테고리 페이지 |
| 4 | 추가 기능 | 1~2일 | 검색, 목차, 관련 가이드 |
| 5 | 최적화 및 배포 | 1일 | ISR·SEO·에러 처리, Vercel 배포 |

---

## Phase 1: 프로젝트 초기 설정 (골격) — 1일
### 작업
- [ ] Starter Kit에서 넘어온 Spring Boot 소스(`src/main`, `build.gradle`, gradle wrapper, `docker-compose.yml`) 정리
- [ ] Next.js 15 (App Router, TypeScript, ESLint, `src/` 디렉터리) 생성
- [ ] Tailwind CSS, shadcn/ui 기본 설정(`components.json`, `cn()` 유틸), Lucide React 설치
- [ ] 루트 레이아웃(Header·Footer 자리), 폴더 구조(`app/`, `components/`, `lib/`, `types/`)
- [ ] `.env.example`(`NOTION_API_KEY`, `NOTION_DATABASE_ID`), `.gitignore` 정리

### 왜 먼저인가
폴더 구조·스타일 체계·환경 변수 규칙이 정해져 있어야 이후 모든 모듈이 같은 자리에 같은 방식으로 만들어진다.

### 완료 기준
- `npm run dev`로 빈 레이아웃이 뜬다
- `npm run lint`, `npm run build` 통과

## Phase 2: 공통 모듈/컴포넌트 — 1~2일
### 작업
- [ ] 공통 타입: `Guide`, `GuideCategory`, `GuideLevel` (`src/types/guide.ts`)
- [ ] Notion 공통 모듈 `src/lib/notion/`
  - `client.ts` (서버 전용 클라이언트), `mapper.ts` (Notion 속성 → `Guide`)
  - `getGuides()`, `getGuideBySlug()`, `getGuideContent()` (블록 → 마크다운)
  - Status가 select/status 어느 타입이어도 `발행됨`만 반환
- [ ] 공통 UI: `GuideCard`, `CategoryBadge`, `LevelBadge`, `EmptyState`, shadcn/ui `Card`·`Badge`·`Input`
- [ ] Header 내비게이션(홈·가이드·카테고리)

### 왜 이 순서인가
목록·상세·카테고리·검색 화면이 모두 같은 Notion 조회 함수와 카드 컴포넌트를 쓴다. 공통부를 먼저 만들면 화면마다 API 호출·매핑 코드가 중복되지 않는다.

### 완료 기준
- `getGuides()`가 샘플 DB에서 `발행됨` 가이드만 반환
- Notion API 호출이 `src/lib/notion` 밖에 없음

## Phase 3: 핵심 기능 — 2일
### 작업
- [ ] 홈 `/`: 소개 배너, 최근 가이드 6개, 카테고리 바로가기
- [ ] 가이드 목록 `/guides`: 최신순 카드 목록, 카테고리 탭
- [ ] 가이드 상세 `/guides/[slug]`: 메타 정보 + 본문 마크다운 렌더링, 코드 하이라이팅
- [ ] 카테고리 `/category/[name]`
- [ ] `not-found`, `error`, `loading` 처리

### 왜 이 순서인가
포탈의 존재 이유인 "가이드를 찾아 읽기"가 가장 중요하다. Phase 2의 공통 모듈 위에 화면만 조립한다.

### 완료 기준
- Notion에서 발행한 가이드가 목록·상세·카테고리에 표시된다
- 초안 상태 가이드는 보이지 않는다

## Phase 4: 추가 기능 — 1~2일
### 작업
- [ ] 검색 `/guides?q=` (제목·요약·태그)
- [ ] 상세 페이지 목차(TOC)
- [ ] 관련 가이드 추천(같은 카테고리·태그 3개)
- [ ] 난이도 필터

### 왜 이 순서인가
핵심 열람 흐름이 완성된 뒤에 편의 기능을 붙여야 범위가 흔들리지 않는다.

### 완료 기준
- 키워드 검색 결과가 정확히 필터링된다
- 목차 클릭 시 해당 heading으로 이동

## Phase 5: 최적화 및 배포 — 1일
### 작업
- [ ] ISR(`export const revalidate = 60`), `generateStaticParams`
- [ ] 메타데이터(SEO, OG), 반응형 점검
- [ ] Vercel 배포, 환경 변수 등록(`NOTION_API_KEY`는 Sensitive)

### 왜 마지막인가
기능이 확정된 뒤에 성능·SEO를 다듬어야 재작업이 없다.

### 완료 기준
- Vercel 배포 URL에서 모든 페이지 정상 동작
- `npm run build` 경고 없음

---

## 버전 기록
| 버전 | 내용 |
|------|------|
| v1.0 | MVP (Phase 1~3) |
