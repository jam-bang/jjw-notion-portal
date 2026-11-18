# AI 개발 가이드 포탈 (jjw-notion-portal)

Notion을 CMS로 사용하는 **팀 AI 개발 가이드 포탈**입니다.
가이드는 Notion 데이터베이스에서 작성하고, 웹사이트는 Notion API로 가져와 목록·상세·카테고리·검색 화면으로 보여줍니다.

- 기획 문서: [docs/PRD.md](docs/PRD.md)
- 기술 스택(예정): Next.js 15, TypeScript, Notion API, Tailwind CSS, shadcn/ui, Lucide React, Vercel

## 현재 상태
- 나만의 Starter Kit(`jjw-starter-kit`)을 복제해 Git 연결을 끊고 새 저장소로 시작했습니다.
- Spring Boot 소스(`src/`, `build.gradle` 등)는 Starter Kit에서 넘어온 것으로, Next.js 골격 구성 단계(ROADMAP Phase 1)에서 정리합니다.
- `.claude/`(커맨드·서브에이전트·훅)와 `.mcp.json`은 계속 활용합니다.

## 환경 변수
`.env.example` 참고. 실제 값은 `.env.local`에만 두고 커밋하지 않습니다.
