"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type FeedbackFormState = { ok?: boolean; error?: string };

const allowedSubjects = new Set(["Öneri", "Dilek", "Şikayet", "Diğer"]);

function requiredString(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

export async function submitFeedback(
  _prev: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  const senderName = requiredString(formData, "senderName");
  const email = requiredString(formData, "email");
  const subjectTypeRaw = requiredString(formData, "subjectType");
  const message = requiredString(formData, "message");

  if (!senderName || !email || !message) {
    return { ok: false, error: "Lütfen tüm zorunlu alanları doldurun." };
  }

  const subjectType =
    subjectTypeRaw && allowedSubjects.has(subjectTypeRaw)
      ? subjectTypeRaw
      : "Diğer";

  try {
    await prisma.feedback.create({
      data: {
        senderName,
        email,
        subjectType,
        message,
        isRead: false,
      },
    });
  } catch {
    return {
      ok: false,
      error: "Mesaj kaydedilemedi. Veritabanını kontrol edin (prisma db push).",
    };
  }

  revalidatePath("/iletisim");
  return { ok: true };
}
