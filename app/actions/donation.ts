"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type DonationSubmitResult = { ok: true } | { ok: false; error: string };

function requiredString(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

export async function submitDonation(formData: FormData): Promise<DonationSubmitResult> {
  const donorName = requiredString(formData, "donorName");
  const donorSurname = requiredString(formData, "donorSurname");
  const amountRaw = formData.get("amount");
  const amountStr =
    typeof amountRaw === "string" ? amountRaw.trim().replace(",", ".") : "";
  const amount = Math.floor(Number(amountStr));
  const anonRaw = formData.get("isAnonymous");
  const isAnonymous = anonRaw === "on" || anonRaw === "true";

  if (!donorName || !donorSurname) {
    return { ok: false, error: "Ad ve soyad zorunludur." };
  }

  if (!Number.isFinite(amount) || amount < 1 || amount > 1_000_000) {
    return {
      ok: false,
      error: "Geçerli bir bağış tutarı girin (1–1.000.000 TL).",
    };
  }

  try {
    await prisma.donation.create({
      data: {
        donorName,
        donorSurname,
        amount,
        isAnonymous,
      },
    });
  } catch {
    return {
      ok: false,
      error: "Bağış kaydedilemedi. Veritabanını kontrol edin (prisma db push).",
    };
  }

  revalidatePath("/");
  revalidatePath("/bagis");
  return { ok: true };
}
