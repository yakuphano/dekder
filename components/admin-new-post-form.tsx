"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createPost, type CreatePostState } from "@/app/actions/post";

const initial: CreatePostState = {};

const defaultImageUrl =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80";

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20";

export function AdminNewPostForm() {
  const [state, formAction, pending] = useActionState(createPost, initial);

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
        Başlık
        <input
          required
          name="title"
          disabled={pending}
          placeholder="Duyuru başlığı"
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-medium text-blue-950">
        Resim URL
        <input
          name="imageUrl"
          type="url"
          disabled={pending}
          placeholder={defaultImageUrl}
          defaultValue={defaultImageUrl}
          className={fieldClass}
        />
        <span className="mt-1 block text-xs text-slate-500">
          Harici görsel bağlantısı (dosya yükleme yok). İsterseniz alanı temizleyebilirsiniz.
        </span>
      </label>

      <label className="block text-sm font-medium text-blue-950">
        İçerik / detay
        <textarea
          required
          name="content"
          rows={12}
          disabled={pending}
          placeholder="Haber veya duyuru metni…"
          className={fieldClass}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/admin/duyurular"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          İptal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Kaydediliyor…" : "Kaydet"}
        </button>
      </div>
    </form>
  );
}
