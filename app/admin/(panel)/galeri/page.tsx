import { AdminDeleteGalleryForm } from "@/components/admin-delete-gallery-form";
import { AdminNewGalleryForm } from "@/components/admin-new-gallery-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeStyle: "short",
});

export default async function AdminGaleriPage() {
  let images: Awaited<ReturnType<typeof prisma.galleryImage.findMany>> = [];
  try {
    images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    images = [];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">Galeri</h1>
        <p className="mt-1 text-sm text-slate-600">
          Görseller dosya olarak yüklenir (<code className="rounded bg-slate-100 px-1 text-xs">public/uploads</code>
          ). Yalnızca yöneticiler ekleyebilir veya silebilir.
        </p>
      </div>

      <AdminNewGalleryForm />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-800">Yayında olan görseller</h2>
          <p className="text-xs text-slate-500">Toplam {images.length} kayıt</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-white text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Önizleme</th>
                <th className="px-4 py-3">Adres</th>
                <th className="px-4 py-3">Açıklama</th>
                <th className="px-4 py-3 whitespace-nowrap">Tarih</th>
                <th className="px-4 py-3 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {images.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                    Henüz görsel yok. Yukarıdaki formdan ekleyin.
                  </td>
                </tr>
              ) : (
                images.map((img) => (
                  <tr key={img.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <div className="relative h-16 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.imageUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="max-w-xs px-4 py-3">
                      <p className="truncate text-xs text-slate-600" title={img.imageUrl}>
                        {img.imageUrl}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {img.caption ? img.caption : <span className="text-slate-400">—</span>}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {dateFmt.format(img.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <AdminDeleteGalleryForm galleryImageId={img.id} />
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
