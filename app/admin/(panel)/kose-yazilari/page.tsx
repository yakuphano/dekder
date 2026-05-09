import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminDeleteArticleForm } from "@/components/admin-delete-article-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "short",
  timeStyle: "short",
});

export default async function AdminKoseYazilariPage() {
  let articles: Awaited<ReturnType<typeof prisma.article.findMany>> = [];
  try {
    articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    articles = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
            Köşe yazıları
          </h1>
          <p className="mt-1 text-sm text-slate-600">{articles.length} kayıt</p>
        </div>
        <Link
          href="/admin/kose-yazilari/yeni"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Yeni yazı
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Başlık</th>
                <th className="px-4 py-3">Yazar</th>
                <th className="px-4 py-3">Tarih</th>
                <th className="px-4 py-3 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-slate-500">
                    Henüz yazı yok.{" "}
                    <Link href="/admin/kose-yazilari/yeni" className="font-semibold text-red-600 hover:underline">
                      İlk yazıyı ekleyin
                    </Link>
                    .
                  </td>
                </tr>
              ) : (
                articles.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/80">
                    <td className="max-w-xs px-4 py-3">
                      <p className="font-medium text-slate-900">{a.title}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                      {a.authorName}
                      <span className="mt-0.5 block text-xs text-slate-500">{a.authorTitle}</span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {dateFmt.format(a.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AdminDeleteArticleForm articleId={a.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
