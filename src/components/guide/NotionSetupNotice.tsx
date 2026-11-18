import { PlugZap } from "lucide-react";

/** NOTION_API_KEY / NOTION_DATABASE_ID 미설정 시 안내 */
export function NotionSetupNotice() {
  return (
    <div className="flex gap-3 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
      <PlugZap className="size-5 shrink-0 text-amber-600" aria-hidden />
      <p>
        Notion 연결이 아직 설정되지 않았습니다. <code>NOTION_API_KEY</code>와{" "}
        <code>NOTION_DATABASE_ID</code> 환경 변수를 설정하면 가이드가 표시됩니다.
      </p>
    </div>
  );
}
