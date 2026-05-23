import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Haberler ve duyurular",
  description: "DEKDER duyuruları, etkinlikler ve haberler.",
};

export const revalidate = 60;

async function loadPosts() {
  try {
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
});

export default async function DuyurularPage() {
  const posts = await loadPosts();

  return (
    <div className="mx-auto max-w-6xl px-3 py-10 sm:px-4 md:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--dekder-red)]">
          Duyurular
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Haberler ve duyurular
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Genel kurul, etkinlikler, yardım kampanyaları ve topluluk duyuruları.
        </p>
      </header>

      <ul className="mt-10 space-y-4">
        {posts.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-600">
            Henüz duyuru yok.
          </li>
        ) : (
          posts.map((p) => (
            <li key={p.id}>
              <Link
                href={`/duyurular/${p.id}`}
                className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <p className="text-xs font-medium text-slate-500">
                  {dateFmt.format(p.createdAt)}
                </p>
                <h2 className="mt-2 text-lg font-bold text-slate-900">{p.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                  {p.content}
                </p>
                <span className="mt-3 inline-block text-sm font-semibold text-[var(--dekder-red)]">
                  Detaya git →
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
