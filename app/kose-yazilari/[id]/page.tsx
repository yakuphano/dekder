import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const article = await prisma.article.findUnique({ where: { id } });
    if (!article) return { title: "Yazı bulunamadı" };
    return {
      title: article.title,
      description: article.content.slice(0, 160),
    };
  } catch {
    return { title: "Köşe yazısı" };
  }
}

export default async function KoseYaziDetayPage({ params }: Props) {
  const { id } = await params;
  let article: Awaited<ReturnType<typeof prisma.article.findUnique>> = null;
  try {
    article = await prisma.article.findUnique({ where: { id } });
  } catch {
    article = null;
  }

  if (!article) notFound();

  return (
    <article className="min-h-screen bg-slate-50 pb-16">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-950 hover:text-red-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Ana sayfaya dön
          </Link>

          <div className="mt-10 flex flex-col items-center border-b border-slate-100 pb-10 text-center md:mt-12">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-blue-950/15 shadow-lg md:h-36 md:w-36">
              {article.authorImageUrl ? (
                <Image
                  src={article.authorImageUrl}
                  alt={`${article.authorName} profil fotoğrafı`}
                  fill
                  className="object-cover"
                  sizes="144px"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 text-3xl font-bold text-white md:text-4xl">
                  {article.authorName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <p className="mt-6 text-xl font-bold text-slate-900 md:text-2xl">{article.authorName}</p>
            <p className="mt-1 text-sm font-semibold text-red-700 md:text-base">{article.authorTitle}</p>
            <time
              dateTime={article.createdAt.toISOString()}
              className="mt-3 text-sm text-slate-500"
            >
              {dateFmt.format(article.createdAt)}
            </time>
          </div>

          <h1 className="mt-10 text-3xl font-bold leading-tight tracking-tight text-blue-950 md:mt-12 md:text-4xl md:leading-tight">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <div className="max-w-none rounded-2xl border border-slate-200 bg-white p-6 shadow-md md:p-12">
          <div
            className="prose-content max-w-none font-serif text-[1.0625rem] leading-[1.85] text-slate-800 md:text-lg md:leading-[1.9]"
          >
            {article.content.split("\n\n").map((para, i) => {
              const lines = para.split("\n");
              return (
                <p key={i} className="mb-5 last:mb-0">
                  {lines.map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < lines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
