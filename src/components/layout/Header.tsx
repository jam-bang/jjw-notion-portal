import Link from "next/link";
import { BookOpenText } from "lucide-react";

const NAV = [
  { href: "/", label: "홈" },
  { href: "/guides", label: "가이드" },
  { href: "/category", label: "카테고리" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <BookOpenText className="size-5 text-primary" aria-hidden />
          AI 개발 가이드
        </Link>
        <nav className="flex gap-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
