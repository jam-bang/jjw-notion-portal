/** 2026-11-18 → 2026. 11. 18. */
export function formatDate(value: string): string {
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeZone: "Asia/Seoul" }).format(
    new Date(value),
  );
}
