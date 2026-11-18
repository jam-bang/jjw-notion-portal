# PRD — AI 개발 가이드 포탈 (AI Dev Guide Portal)

## 1. 프로젝트 개요
| 항목 | 내용 |
|------|------|
| 프로젝트명 | AI 개발 가이드 포탈 (jjw-notion-portal) |
| 목적 | Notion을 CMS로 활용해, 팀이 정리한 **클로드 코드·AI 개발 도구 활용 가이드**를 사내 구성원이 쉽게 찾아보는 웹 포탈 |
| 대상 사용자 | 공공 SI 사업 수행 팀원(개발자·PL·PM), 신규 투입 인력 |
| CMS 선택 이유 | 가이드 작성자는 익숙한 Notion에서 글만 쓰면 되고(비개발자도 관리 가능), 별도 DB·관리자 화면 없이 Notion API로 웹에 바로 반영 |

### 배경
- AI 개발 도구 도입 가이드, 프롬프트 모음, 사업별 설정 예시가 메신저·개인 메모에 흩어져 있어 찾기 어렵다.
- 가이드 작성은 Notion에서 하고, 열람은 검색·분류가 되는 웹 포탈에서 하도록 분리한다.

## 2. 주요 기능
| # | 기능 | 설명 | MVP |
|---|------|------|-----|
| F1 | 가이드 목록 | Notion DB에서 `발행됨` 상태 가이드를 최신순으로 표시 (카드형) | ✅ |
| F2 | 가이드 상세 | Notion 페이지 본문(블록)을 HTML로 렌더링, 코드 블록 하이라이팅 | ✅ |
| F3 | 카테고리 필터 | 시작하기 / 프롬프트 / 설정·훅 / MCP / 사업 적용 사례 | ✅ |
| F4 | 검색 | 제목·요약·태그 기준 키워드 검색 | ✅ |
| F5 | 난이도 표시 | 입문/중급/고급 배지 | ✅ |
| F6 | 반응형 디자인 | 모바일·태블릿·데스크톱 대응 | ✅ |
| F7 | 목차(TOC) | 상세 페이지 heading 기반 목차 | 확장 |
| F8 | 관련 가이드 추천 | 같은 카테고리·태그 가이드 3개 | 확장 |
| F9 | 관리자 현황 | 상태별·카테고리별 가이드 수 (읽기 전용) | 확장 |

## 3. 기술 스택
| 구분 | 내용 |
|------|------|
| Frontend | Next.js 15 (App Router, Server Components), TypeScript |
| CMS | Notion API (`@notionhq/client`) |
| Styling | Tailwind CSS, shadcn/ui |
| Icons | Lucide React |
| 렌더링 | `notion-to-md` + `react-markdown` (코드 하이라이팅: `rehype-highlight`) |
| 캐싱 | ISR (`export const revalidate = 60`) |
| Deployment | Vercel |
| 품질 | ESLint, Prettier, TypeScript strict |

## 4. Notion 데이터베이스 구조 (DB명: `AI 개발 가이드`)
| 필드 | Notion 타입 | 설명 |
|------|-------------|------|
| Title | title | 가이드 제목 |
| Slug | rich_text | URL 경로 (예: `claude-code-hooks`) — 비어 있으면 page id 사용 |
| Summary | rich_text | 목록 카드에 보일 한 줄 요약 |
| Category | select | 시작하기 / 프롬프트 / 설정·훅 / MCP / 사업 적용 사례 |
| Tags | multi_select | 예: Claude Code, Cursor, Spring, Oracle |
| Level | select | 입문 / 중급 / 고급 |
| Status | select 또는 status | 초안 / 발행됨 — `발행됨`만 노출 |
| Author | rich_text | 작성자 |
| Published | date | 발행일 (정렬 기준) |
| Content | page content | 가이드 본문 (Notion 블록) |

> 참고: Notion AI로 DB를 만들면 Status가 `status` 타입으로 생길 수 있으므로, 조회 시 select/status 모두 지원하거나 필터를 코드에서 처리한다.

## 5. 화면 구성
| 화면 | 경로 | 내용 |
|------|------|------|
| 홈 | `/` | 소개 배너, 최근 가이드 6개, 카테고리 바로가기 |
| 가이드 목록 | `/guides` | 전체 목록, 카테고리 탭, 검색창(`?q=`), 난이도 배지 |
| 가이드 상세 | `/guides/[slug]` | 제목·메타(카테고리·태그·작성자·발행일), 본문, 목차 |
| 카테고리 | `/category/[name]` | 카테고리별 목록 |
| 404 / 에러 | - | 없는 가이드, Notion API 오류 시 안내 |

## 6. MVP 범위
- Notion API 연동 (`NOTION_API_KEY`, `NOTION_DATABASE_ID` 환경 변수)
- 가이드 목록 / 상세 / 카테고리 필터 / 검색
- 기본 스타일링(shadcn/ui Card·Badge·Input) 및 반응형
- Vercel 배포

**MVP 제외**: 로그인, 댓글, 좋아요, 웹에서 글 작성(작성은 Notion에서만)

## 7. 비기능 요구사항
- 비밀 값(`NOTION_API_KEY`)은 서버에서만 사용, 클라이언트 번들·저장소에 노출 금지 (`.env.local`, Vercel 환경 변수)
- Notion API 호출은 `src/lib/notion` 모듈에서만 수행
- ISR로 Notion API 호출량 제한, 목록 첫 로딩 2초 이내

## 8. 구현 단계
1. Next.js 15 프로젝트 골격 생성, Tailwind·shadcn/ui·Lucide 설정
2. Notion 통합(연결) 생성, API 토큰 발급, DB 생성 및 `콘텐츠 사용 권한` 부여
3. Notion 공통 모듈(목록·상세·카테고리 조회, 타입 매핑) 구현
4. 가이드 목록·검색·카테고리 페이지 구현
5. 가이드 상세 페이지(본문 렌더링) 구현
6. 스타일링·반응형 정리, Vercel 배포
