"use client";

import { deleteArticle } from "@/app/actions/article";

type Props = { articleId: string };

export function AdminDeleteArticleForm({ articleId }: Props) {
  return (
    <form
      action={deleteArticle}
      onSubmit={(e) => {
        if (!confirm("Bu köşe yazısını silmek istediğinize emin misiniz?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="articleId" value={articleId} />
      <button
        type="submit"
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
      >
        Sil
      </button>
    </form>
  );
}
