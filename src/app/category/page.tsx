import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen } from "lucide-react";
import { getCategories } from "@/lib/notion";
import { EmptyState } from "@/components/guide/EmptyState";

export const revalidate = 60;
export const metadata: Metadata = { title: "카테고리" };

export default async function CategoryIndexPage() {
  const categories = await getCategories();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">카테고리</h1>
      {categories.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/category/${encodeURIComponent(c.name)}`}
              className="flex items-center justify-between rounded-lg border p-4 hover:border-primary"
            >
              <span className="inline-flex items-center gap-2 font-medium">
                <FolderOpen className="size-4 text-primary" aria-hidden /> {c.name}
              </span>
              <span className="text-sm text-muted-foreground">{c.count}개</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
