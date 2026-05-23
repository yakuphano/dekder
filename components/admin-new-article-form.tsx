"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createArticle, type CreateArticleState } from "@/app/actions/article";
import type { AdminGalleryPickOption } from "@/lib/admin-gallery-pick-option";

const initial: CreateArticleState = {};

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20";

type Props = {
  galleryOptions: AdminGalleryPickOption[];
};

export function AdminNewArticleForm({ galleryOptions }: Props) {
  const [state, formAction, pending] = useActionState(createArticle, initial);

  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      {state?.error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.error}
        </p>
      ) : null}

      <label className="block text-sm font-medium text-blue-950">
        Yazar adı
        <input
          required
          name="authorName"
          disabled={pending}
          placeholder="Örn. Salim Özelçi"
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-medium text-blue-950">
        Yazar unvanı
        <input
          name="authorTitle"
          disabled={pending}
          defaultValue="Köşe Yazarı"
          placeholder="Köşe Yazarı"
          className={fieldClass}
        />
      </label>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
        <p className="text-sm font-medium text-blue-950">Yazar fotoğrafı</p>
        <p className="text-xs text-slate-600">
          Dosyadan yükleyin veya galeriden seçin. Galeri seçiminde görsel yazıya kopyalanır.
        </p>
        <label className="block text-sm font-medium text-slate-800">
          Dosyadan yükle
          <input
            name="authorImageFile"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={pending}
            className={`${fieldClass} border-dashed bg-white file:mr-3 file:rounded-md file:border-0 file:bg-blue-950 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white`}
          />
        </label>
        {galleryOptions.length > 0 ? (
          <label className="block text-sm font-medium text-slate-800">
            Galeriden seç
            <select name="galleryImageId" disabled={pending} className={fieldClass} defaultValue="">
              <option value="">— Seçim yok —</option>
              {galleryOptions.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p className="text-xs text-slate-500">
            Galeri boşsa{" "}
            <Link href="/admin/galeri" className="font-semibold text-red-600 hover:underline">
              buradan
            </Link>{" "}
            görsel ekleyin veya dosya yükleyin.
          </p>
        )}
      </div>

      <label className="block text-sm font-medium text-blue-950">
        Yazı başlığı
        <input required name="title" disabled={pending} className={fieldClass} />
      </label>

      <label className="block text-sm font-medium text-blue-950">
        Yazı içeriği
        <textarea
          required
          name="content"
          rows={14}
          disabled={pending}
          className={fieldClass}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/kose-yazilari"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          İptal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Kaydediliyor…" : "Yayınla"}
        </button>
      </div>
    </form>
  );
}
