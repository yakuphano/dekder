"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { removeStoredUploadIfOwned } from "@/lib/admin-image-upload";
import { resolveCoverImageFromForm } from "@/app/actions/resolve-form-image";
import { verifyAdminCookie } from "@/lib/verify-admin";

export type CreatePostState = { error?: string };

function requiredString(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

export async function createPost(
  _prev: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  if (!(await verifyAdminCookie())) {
    return { error: "Bu işlem için yönetici oturumu gerekir." };
  }

  const title = requiredString(formData, "title");
  const content = requiredString(formData, "content");
  if (!title || !content) {
    return { error: "Başlık ve içerik zorunludur." };
  }

  const resolved = await resolveCoverImageFromForm(formData, "imageFile", "galleryImageId");
  if (!resolved.ok) return { error: resolved.error };

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        imageUrl: resolved.imageUrl,
      },
    });
  } catch {
    if (resolved.imageUrl) await removeStoredUploadIfOwned(resolved.imageUrl);
    return { error: "Kayıt oluşturulamadı. Veritabanını kontrol edin." };
  }

  revalidatePath("/");
  revalidatePath("/duyurular");
  redirect("/admin/duyurular");
}

export async function deletePost(formData: FormData) {
  if (!(await verifyAdminCookie())) return;

  const id = formData.get("postId");
  if (typeof id !== "string" || !id.trim()) return;

  const trimmed = id.trim();
  let imageUrl: string | null = null;
  try {
    const post = await prisma.post.findUnique({
      where: { id: trimmed },
      select: { imageUrl: true },
    });
    imageUrl = post?.imageUrl ?? null;
    await prisma.post.delete({ where: { id: trimmed } });
  } catch {
    return;
  }

  if (imageUrl) await removeStoredUploadIfOwned(imageUrl);

  revalidatePath("/");
  revalidatePath("/duyurular");
  revalidatePath(`/duyurular/${trimmed}`);
}
