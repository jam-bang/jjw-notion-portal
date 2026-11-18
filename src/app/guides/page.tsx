import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getGuides } from "@/lib/notion";
import { GuideGrid } from "@/components/guide/GuideGrid";
import { cn } from "@/lib/utils";

export const revalidate = 60;
export const metadata: Metadata = { title: "가이드" };

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [guides, categories] = await Promise.all([getGuides(), getCategories()]);
  const filtered = category ? guides.filter((g) => g.category === category) : guides;
  const tabs = [{ name: "전체", href: "/guides", active: !category }].concat(
    categories.map((c) => ({
      name: c.name,
      href: `/guides?category=${encodeURIComponent(c.name)}`,
      active: c.name === category,
    })),
  );

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">가이드</h1>
        <p className="text-sm text-muted-foreground">총 {filtered.length}개</p>
      </header>
      <nav className="flex flex-wrap gap-2" aria-label="카테고리">
        {tabs.map((t) => (
          <Link
            key={t.name}
            href={t.href}
            className={cn(
              "rounded-full border px-3 py-1 text-sm",
              t.active ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary",
            )}
          >
            {t.name}
          </Link>
        ))}
      </nav>
      <GuideGrid guides={filtered} />
    </div>
  );
}
