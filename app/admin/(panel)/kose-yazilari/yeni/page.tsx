import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { AdminNewArticleForm } from "@/components/admin-new-article-form";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Yeni köşe yazısı",
};

export default async function AdminYeniKoseYazisiPage() {
  let galleryOptions: { id: string; previewUrl: string; label: string }[] = [];
  try {
    const rows = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: { id: true, imageUrl: true, caption: true },
    });
    galleryOptions = rows.map((row) => ({
      id: row.id,
      previewUrl: row.imageUrl,
      label:
        row.caption?.trim() ||
        row.imageUrl.replace(/^.*\//, "").slice(0, 56) ||
        "Görsel",
    }));
  } catch {
    galleryOptions = [];
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/kose-yazilari"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-950 hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Listeye dön
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Yeni köşe yazısı
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Yazar fotoğrafını yükleyin veya galeriden seçin. Kayıt site köşe yazıları bölümünde
          yayınlanır.
        </p>
      </div>
      <AdminNewArticleForm galleryOptions={galleryOptions} />
    </div>
  );
}
