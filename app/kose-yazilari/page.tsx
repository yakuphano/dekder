import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, PenLine } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Köşe Yazıları",
  description: "DEKDER köşe yazıları ve düşünce yazıları.",
};

export const dynamic = "force-dynamic";

function excerpt(text: string, max = 180): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
});

export default async function KoseYazilariPage() {
  let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = [];
  try {
    articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    articles = [];
  }

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-300">
            <PenLine className="h-4 w-4" aria-hidden />
            Köşe
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">Köşe Yazıları</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            Hemşehrilerimizden ve konuk yazarlarımızdan düşünce yazıları, hatıralar ve
            güncel değerlendirmeler.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm">
            <PenLine className="mx-auto h-12 w-12 text-blue-950/40" aria-hidden />
            <p className="mt-4 text-lg font-semibold text-blue-950">Henüz köşe yazısı yok</p>
            <p className="mt-2 text-sm text-slate-600">
              İlk yazılar yakında burada yer alacak. Yönetim panelinden içerik eklenebilir.
            </p>
          </div>
        ) : (
          <ul className="grid gap-8 md:grid-cols-2">
            {articles.map((a) => (
              <li key={a.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg">
                  <div className="flex gap-4 border-b border-slate-100 p-5 md:p-6">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-blue-950/10 bg-slate-200 shadow-sm">
                      {a.authorImageUrl ? (
                        <Image
                          src={a.authorImageUrl}
                          alt={`${a.authorName} profil fotoğrafı`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 text-lg font-bold text-white">
                          {a.authorName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-blue-950">{a.authorName}</p>
                      <p className="text-sm font-medium text-red-700">{a.authorTitle}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {dateFmt.format(a.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-4 md:px-6 md:pb-6">
                    <h2 className="text-lg font-bold text-slate-900 md:text-xl">{a.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                      {excerpt(a.content)}
                    </p>
                    <Link
                      href={`/kose-yazilari/${a.id}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
                    >
                      Devamını oku
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
