"use server";

import { prisma } from "@/lib/prisma";
import {
  duplicatePublicUpload,
  isPublicUploadPath,
  saveAdminImageUpload,
} from "@/lib/admin-image-upload";

export type ResolvedFormImage =
  | { ok: true; imageUrl: string | null }
  | { ok: false; error: string };

/** Önce dosya yüklemesi; yoksa galeri kaydı. Yerel galeri dosyası seçildiyse bağımsız kopya üretir. */
export async function resolveCoverImageFromForm(
  formData: FormData,
  fileKey: string,
  galleryIdKey: string,
): Promise<ResolvedFormImage> {
  const imageFile = formData.get(fileKey);
  if (imageFile instanceof File && imageFile.size > 0) {
    const saved = await saveAdminImageUpload(imageFile);
    if (!saved.ok) return { ok: false, error: saved.error };
    return { ok: true, imageUrl: saved.publicPath };
  }

  const gidRaw = formData.get(galleryIdKey);
  if (typeof gidRaw !== "string" || !gidRaw.trim()) {
    return { ok: true, imageUrl: null };
  }

  try {
    const row = await prisma.galleryImage.findUnique({
      where: { id: gidRaw.trim() },
      select: { imageUrl: true },
    });
    if (!row?.imageUrl) return { ok: true, imageUrl: null };

    if (isPublicUploadPath(row.imageUrl)) {
      const dup = await duplicatePublicUpload(row.imageUrl);
      if (!dup.ok) return { ok: false, error: dup.error };
      return { ok: true, imageUrl: dup.publicPath };
    }
    return { ok: true, imageUrl: row.imageUrl };
  } catch {
    return { ok: false, error: "Galeri kaydı okunamadı." };
  }
}
