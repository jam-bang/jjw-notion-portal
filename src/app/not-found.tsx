import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <p className="text-5xl font-bold text-primary">404</p>
      <p className="text-muted-foreground">요청한 가이드를 찾을 수 없습니다.</p>
      <Link href="/guides" className="text-sm text-primary underline underline-offset-4">
        가이드 목록으로
      </Link>
    </div>
  );
}
