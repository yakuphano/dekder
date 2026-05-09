"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
  const title = requiredString(formData, "title");
  const content = requiredString(formData, "content");
  const authorName = requiredString(formData, "authorName");
  const authorTitleRaw = formData.get("authorTitle");
  const authorTitle =
    typeof authorTitleRaw === "string" && authorTitleRaw.trim().length > 0
      ? authorTitleRaw.trim()
      : "Köşe Yazarı";
  const imgRaw = formData.get("authorImageUrl");
  const authorImageUrl =
    typeof imgRaw === "string" && imgRaw.trim().length > 0 ? imgRaw.trim() : null;

  if (!title || !content || !authorName) {
    return { error: "Başlık, içerik ve yazar adı zorunludur." };
  }

  try {
    await prisma.article.create({
      data: {
        title,
        content,
        authorName,
        authorTitle,
        authorImageUrl,
      },
    });
  } catch {
    return { error: "Kayıt oluşturulamadı. Veritabanını kontrol edin (prisma db push)." };
  }

  revalidatePath("/");
  redirect("/admin/kose-yazilari");
}

export async function deleteArticle(formData: FormData) {
  const id = formData.get("articleId");
  if (typeof id !== "string" || !id.trim()) return;

  const trimmed = id.trim();
  try {
    await prisma.article.delete({ where: { id: trimmed } });
  } catch {
    return;
  }

  revalidatePath("/");
}
