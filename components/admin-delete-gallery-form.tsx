"use client";

import { deleteGalleryImage } from "@/app/actions/gallery";

type Props = { galleryImageId: string };

export function AdminDeleteGalleryForm({ galleryImageId }: Props) {
  return (
    <form
      action={deleteGalleryImage}
      onSubmit={(e) => {
        if (!confirm("Bu görseli galeriden kaldırmak istediğinize emin misiniz?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="galleryImageId" value={galleryImageId} />
      <button
        type="submit"
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
      >
        Sil
      </button>
    </form>
  );
}
