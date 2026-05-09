"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
  const title = requiredString(formData, "title");
  const content = requiredString(formData, "content");
  const imageUrlRaw = formData.get("imageUrl");
  const imageUrl =
    typeof imageUrlRaw === "string" && imageUrlRaw.trim().length > 0
      ? imageUrlRaw.trim()
      : null;

  if (!title || !content) {
    return { error: "Başlık ve içerik zorunludur." };
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        imageUrl,
      },
    });
  } catch {
    return { error: "Kayıt oluşturulamadı. Veritabanını kontrol edin." };
  }

  revalidatePath("/");
  revalidatePath("/duyurular");
  redirect("/admin/duyurular");
}

export async function deletePost(formData: FormData) {
  const id = formData.get("postId");
  if (typeof id !== "string" || !id.trim()) return;

  try {
    await prisma.post.delete({ where: { id: id.trim() } });
  } catch {
    return;
  }

  revalidatePath("/");
  revalidatePath("/duyurular");
  revalidatePath(`/duyurular/${id.trim()}`);
}
