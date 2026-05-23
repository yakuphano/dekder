"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { removeStoredUploadIfOwned, saveAdminImageUpload } from "@/lib/admin-image-upload";
import { verifyAdminCookie } from "@/lib/verify-admin";

export type GalleryActionState = { error?: string };

function optionalCaption(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const t = raw.trim();
  return t.length ? t : null;
}

export async function createGalleryImage(
  _prev: GalleryActionState,
  formData: FormData,
): Promise<GalleryActionState> {
  if (!(await verifyAdminCookie())) {
    return { error: "Bu işlem için yönetici oturumu gerekir." };
  }

  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Görsel dosyası seçin." };
  }

  const saved = await saveAdminImageUpload(file);
  if (!saved.ok) return { error: saved.error };

  const caption = optionalCaption(formData.get("caption"));

  try {
    await prisma.galleryImage.create({
      data: { imageUrl: saved.publicPath, caption },
    });
  } catch {
    await removeStoredUploadIfOwned(saved.publicPath);
    return { error: "Kayıt oluşturulamadı. Veritabanını kontrol edin." };
  }

  revalidatePath("/galeri");
  revalidatePath("/admin/galeri");
  redirect("/admin/galeri");
}

export async function deleteGalleryImage(formData: FormData) {
  if (!(await verifyAdminCookie())) return;

  const id = formData.get("galleryImageId");
  if (typeof id !== "string" || !id.trim()) return;

  const trimmed = id.trim();
  let imageUrl: string | null = null;
  try {
    const row = await prisma.galleryImage.findUnique({
      where: { id: trimmed },
      select: { imageUrl: true },
    });
    imageUrl = row?.imageUrl ?? null;
    await prisma.galleryImage.delete({ where: { id: trimmed } });
  } catch {
    return;
  }

  if (imageUrl) await removeStoredUploadIfOwned(imageUrl);

  revalidatePath("/galeri");
  revalidatePath("/admin/galeri");
}
