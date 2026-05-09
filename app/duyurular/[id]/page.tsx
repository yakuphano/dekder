import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 120;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return { title: "Duyuru bulunamadı" };
    return {
      title: post.title,
      description: post.content.slice(0, 155),
    };
  } catch {
    return { title: "Duyuru" };
  }
}

export default async function DuyuruDetayPage({ params }: Props) {
  const { id } = await params;
  let post: { id: string; title: string; content: string; createdAt: Date } | null =
    null;
  try {
    post = await prisma.post.findUnique({ where: { id } });
  } catch {
    post = null;
  }

  if (!post) notFound();

  const dateFmt = new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <Link
        href="/duyurular"
        className="text-sm font-semibold text-[var(--dekder-mountain)] hover:underline"
      >
        ← Tüm duyurular
      </Link>
      <p className="mt-6 text-sm font-medium text-slate-500">
        {dateFmt.format(post.createdAt)}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
        {post.title}
      </h1>
      <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-slate-800">
        {post.content}
      </div>
    </article>
  );
}
