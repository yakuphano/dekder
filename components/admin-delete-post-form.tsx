"use client";

import { deletePost } from "@/app/actions/post";

type Props = { postId: string };

export function AdminDeletePostForm({ postId }: Props) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="postId" value={postId} />
      <button
        type="submit"
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
      >
        Sil
      </button>
    </form>
  );
}
