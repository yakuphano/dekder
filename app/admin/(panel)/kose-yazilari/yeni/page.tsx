import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { AdminNewArticleForm } from "@/components/admin-new-article-form";

export const metadata: Metadata = {
  title: "Yeni köşe yazısı",
};

export default function AdminYeniKoseYazisiPage() {
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
          Yazar bilgileri ve metin kaydedildikten sonra site köşe yazıları bölümünde yayınlanır.
        </p>
      </div>
      <AdminNewArticleForm />
    </div>
  );
}
