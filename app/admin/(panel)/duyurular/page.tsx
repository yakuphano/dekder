import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminDeletePostForm } from "@/components/admin-delete-post-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeStyle: "short",
});

export default async function AdminDuyurularPage() {
  let posts: Awaited<ReturnType<typeof prisma.post.findMany>> = [];
  try {
    posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    posts = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
            Duyurular ve haberler
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Toplam {posts.length} kayıt — en yeni üstte.
          </p>
        </div>
        <Link
          href="/admin/duyurular/yeni"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
        >
          <Plus className="h-4 w-4" aria-hidden />
          Yeni Duyuru Ekle
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Başlık</th>
                <th className="px-4 py-3 whitespace-nowrap">Tarih</th>
                <th className="px-4 py-3 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-12 text-center text-slate-500">
                    Henüz duyuru yok.{" "}
                    <Link href="/admin/duyurular/yeni" className="font-semibold text-red-600 hover:underline">
                      İlk duyuruyu ekleyin
                    </Link>
                    .
                  </td>
                </tr>
              ) : (
                posts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{p.title}</p>
                      {p.imageUrl ? (
                        <p className="mt-1 max-w-xl truncate text-xs text-slate-500">{p.imageUrl}</p>
                      ) : null}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {dateFmt.format(p.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AdminDeletePostForm postId={p.id} />
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
