"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type MembershipFormState = { ok?: boolean; error?: string };

function requiredString(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

export async function submitMembership(
  _prev: MembershipFormState,
  formData: FormData,
): Promise<MembershipFormState> {
  const name = requiredString(formData, "name");
  const surname = requiredString(formData, "surname");
  const email = requiredString(formData, "email");
  const phone = requiredString(formData, "phone");
  const birthplace = requiredString(formData, "birthplace");
  const profession = requiredString(formData, "profession");
  const address = requiredString(formData, "address");

  if (
    !name ||
    !surname ||
    !email ||
    !phone ||
    !birthplace ||
    !profession ||
    !address
  ) {
    return { ok: false, error: "Lütfen tüm zorunlu alanları doldurun." };
  }

  try {
    await prisma.member.create({
      data: {
        name,
        surname,
        email,
        phone,
        birthplace,
        profession,
        address,
      },
    });
  } catch {
    return {
      ok: false,
      error: "Kayıt oluşturulamadı. Veritabanını kontrol edin (prisma db push).",
    };
  }

  revalidatePath("/uye-ol");
  revalidatePath("/");
  return { ok: true };
}
