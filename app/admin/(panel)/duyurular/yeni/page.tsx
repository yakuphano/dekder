import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { AdminNewPostForm } from "@/components/admin-new-post-form";

export const metadata: Metadata = {
  title: "Yeni duyuru",
};

export default function AdminYeniDuyuruPage() {
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
          Başlık, isteğe bağlı kapak görseli (URL) ve metin girin. Kayıt sonrası ana sayfa ve
          duyurular bölümü güncellenir.
        </p>
      </div>

      <AdminNewPostForm />
    </div>
  );
}
