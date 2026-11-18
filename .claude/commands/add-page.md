---
description: 새 페이지를 공통 모듈(src/lib/notion, 공통 UI) 위에 규칙대로 추가
argument-hint: <경로> [설명]
---

`$1` 경로에 페이지를 추가해줘. 설명: $2

규칙:
1. 데이터는 `src/lib/notion`의 함수만 사용한다. 필요한 조회 함수가 없으면 먼저 `src/lib/notion`에 추가한다
2. UI는 `src/components/guide`, `src/components/ui` 컴포넌트를 재사용한다
3. 페이지에 `export const revalidate = 60;` (리터럴)과 `generateMetadata`를 둔다
4. 마지막에 `npm run lint && npm run typecheck && npm run build`를 실행하고 결과를 요약
