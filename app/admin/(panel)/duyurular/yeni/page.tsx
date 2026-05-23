import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { AdminNewPostForm } from "@/components/admin-new-post-form";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Yeni duyuru",
};

export default async function AdminYeniDuyuruPage() {
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
          href="/admin/duyurular"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-950 hover:text-red-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Duyuru listesine dön
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Yeni duyuru ekle
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Kapak görselini bilgisayarınızdan yükleyin veya galeriden seçin. Kayıt sonrası ana sayfa ve
          duyurular güncellenir.
        </p>
      </div>

      <AdminNewPostForm galleryOptions={galleryOptions} />
    </div>
  );
}
