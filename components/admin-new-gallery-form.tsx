"use client";

import { useActionState } from "react";
import {
  createGalleryImage,
  type GalleryActionState,
} from "@/app/actions/gallery";

const initial: GalleryActionState = {};

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20";

export function AdminNewGalleryForm() {
  const [state, formAction, pending] = useActionState(createGalleryImage, initial);

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      {state?.error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.error}
        </p>
      ) : null}

      <label className="block text-sm font-medium text-blue-950">
        Görsel dosyası
        <input
          required
          name="imageFile"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={pending}
          className={`${fieldClass} border-dashed bg-slate-50/50 file:mr-3 file:rounded-md file:border-0 file:bg-blue-950 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white`}
        />
        <span className="mt-1 block text-xs text-slate-500">
          JPEG, PNG, WebP veya GIF — en fazla 8 MB. Dosya sunucuda{" "}
          <code className="rounded bg-slate-100 px-1">public/uploads</code> altına kaydedilir.
        </span>
      </label>

      <label className="block text-sm font-medium text-blue-950">
        Açıklama / alt metin{" "}
        <span className="font-normal text-slate-500">(isteğe bağlı)</span>
        <input
          name="caption"
          disabled={pending}
          placeholder="Örn. Kösedağ manzarası"
          className={fieldClass}
        />
      </label>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Ekleniyor…" : "Galeriye ekle"}
        </button>
      </div>
    </form>
  );
}
