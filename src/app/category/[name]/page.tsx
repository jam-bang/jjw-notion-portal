import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuidesByCategory } from "@/lib/notion";
import { GuideGrid } from "@/components/guide/GuideGrid";

export const revalidate = 60;

type Props = { params: Promise<{ name: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: decodeURIComponent((await params).name) };
}

export default async function CategoryPage({ params }: Props) {
  const name = decodeURIComponent((await params).name);
  const guides = await getGuidesByCategory(name);
  if (guides.length === 0) notFound();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-sm text-muted-foreground">카테고리</p>
        <h1 className="text-2xl font-bold">{name}</h1>
      </header>
      <GuideGrid guides={guides} />
    </div>
  );
}
