"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { removeStoredUploadIfOwned } from "@/lib/admin-image-upload";
import { resolveCoverImageFromForm } from "@/app/actions/resolve-form-image";
import { verifyAdminCookie } from "@/lib/verify-admin";

export type CreateArticleState = { error?: string };

function requiredString(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

export async function createArticle(
  _prev: CreateArticleState,
  formData: FormData,
): Promise<CreateArticleState> {
  if (!(await verifyAdminCookie())) {
    return { error: "Bu işlem için yönetici oturumu gerekir." };
  }

  const title = requiredString(formData, "title");
  const content = requiredString(formData, "content");
  const authorName = requiredString(formData, "authorName");
  const authorTitleRaw = formData.get("authorTitle");
  const authorTitle =
    typeof authorTitleRaw === "string" && authorTitleRaw.trim().length > 0
      ? authorTitleRaw.trim()
      : "Köşe Yazarı";

  if (!title || !content || !authorName) {
    return { error: "Başlık, içerik ve yazar adı zorunludur." };
  }

  const resolved = await resolveCoverImageFromForm(
    formData,
    "authorImageFile",
    "galleryImageId",
  );
  if (!resolved.ok) return { error: resolved.error };

  try {
    await prisma.article.create({
      data: {
        title,
        content,
        authorName,
        authorTitle,
        authorImageUrl: resolved.imageUrl,
      },
    });
  } catch {
    if (resolved.imageUrl) await removeStoredUploadIfOwned(resolved.imageUrl);
    return { error: "Kayıt oluşturulamadı. Veritabanını kontrol edin (prisma db push)." };
  }

  revalidatePath("/");
  redirect("/admin/kose-yazilari");
}

export async function deleteArticle(formData: FormData) {
  if (!(await verifyAdminCookie())) return;

  const id = formData.get("articleId");
  if (typeof id !== "string" || !id.trim()) return;

  const trimmed = id.trim();
  let authorImageUrl: string | null = null;
  try {
    const article = await prisma.article.findUnique({
      where: { id: trimmed },
      select: { authorImageUrl: true },
    });
    authorImageUrl = article?.authorImageUrl ?? null;
    await prisma.article.delete({ where: { id: trimmed } });
  } catch {
    return;
  }

  if (authorImageUrl) await removeStoredUploadIfOwned(authorImageUrl);

  revalidatePath("/");
}
