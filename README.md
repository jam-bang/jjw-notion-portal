# AI 개발 가이드 포탈 (jjw-notion-portal)

Notion을 CMS로 사용하는 **팀 AI 개발 가이드 포탈**입니다.
가이드는 Notion 데이터베이스에서 작성하고, 웹사이트는 Notion API로 가져와 목록·상세·카테고리 화면으로 보여줍니다.

- 기획: [docs/PRD.md](docs/PRD.md) · 로드맵: [docs/ROADMAP.md](docs/ROADMAP.md) · 작업 계획: `shrimp_data/tasks.json`
- 스택: Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Lucide React · @notionhq/client · notion-to-md · Vercel

## 화면
| 경로 | 내용 |
|------|------|
| `/` | 소개, 카테고리, 최근 가이드 6개 |
| `/guides` | 전체 목록 + 카테고리 탭 (`?category=`) |
| `/guides/[slug]` | 가이드 상세 (Notion 본문 → 마크다운, 코드 하이라이팅) |
| `/category`, `/category/[name]` | 카테고리 목록 / 카테고리별 가이드 |

## 구조
```
src/
├── app/                 # 라우트
├── components/
│   ├── ui/              # shadcn/ui (Card, Badge, Input)
│   ├── guide/           # GuideCard, GuideGrid, 배지, EmptyState
│   ├── layout/          # Header, Footer
│   └── markdown/        # 본문 렌더러
├── lib/notion/          # Notion API 호출 (유일한 위치)
└── types/guide.ts
```

## 실행
```bash
npm install
cp .env.example .env.local   # NOTION_API_KEY, NOTION_DATABASE_ID 입력
npm run dev
```
`npm run lint` · `npm run typecheck` · `npm run build`

## Notion 데이터베이스
속성: `Title`(제목) · `Slug`(텍스트) · `Summary`(텍스트) · `Category`(선택) · `Tags`(다중 선택) · `Level`(선택: 입문/중급/고급) · `Status`(선택 또는 상태: 초안/발행됨) · `Author`(텍스트) · `Published`(날짜)
- `Status`가 `발행됨`인 페이지만 노출됩니다 (select·status 타입 모두 지원, 한글 속성명도 지원)
- Notion 개발자 설정 › **연결** › API 토큰 발급 후, 연결의 **콘텐츠 사용 권한**에 DB 페이지를 추가하세요

## 배포 (Vercel)
환경 변수 `NOTION_API_KEY`(Sensitive), `NOTION_DATABASE_ID` 등록 후 Deploy. 페이지는 60초 ISR로 갱신됩니다.
