import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type Body = {
  firstName?: string;
  lastName?: string;
  amount?: number;
  isAnonymous?: boolean;
  simulateSuccess?: boolean;
};

function parseAmount(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.replace(",", ".").trim());
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

function parseBody(raw: unknown): Body | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const firstName =
    typeof o.firstName === "string" ? o.firstName.trim() : undefined;
  const lastName = typeof o.lastName === "string" ? o.lastName.trim() : undefined;
  const amount = parseAmount(o.amount);
  const isAnonymous = Boolean(o.isAnonymous);
  const simulateSuccess = o.simulateSuccess !== false;
  return { firstName, lastName, amount, isAnonymous, simulateSuccess };
}

/** Eski JSON API (isteğe bağlı). Formlar `submitDonation` server action kullanır. */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const body = parseBody(json);
  if (!body || !body.firstName || !body.lastName) {
    return NextResponse.json(
      { ok: false, error: "Ad ve soyad zorunludur." },
      { status: 400 },
    );
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount < 1 || amount > 1_000_000) {
    return NextResponse.json(
      { ok: false, error: "Geçerli bir bağış tutarı girin (1–1.000.000 TL)." },
      { status: 400 },
    );
  }

  const wholeAmount = Math.floor(amount);
  if (!body.simulateSuccess) {
    return NextResponse.json(
      { ok: false, error: "Ödeme simülasyonu başarısız (test)." },
      { status: 402 },
    );
  }

  const donation = await prisma.donation.create({
    data: {
      donorName: body.firstName,
      donorSurname: body.lastName,
      amount: wholeAmount,
      isAnonymous: Boolean(body.isAnonymous),
    },
  });

  revalidatePath("/");
  revalidatePath("/bagis");

  return NextResponse.json({
    ok: true,
    paymentId: `mock_${donation.id}`,
    donation: {
      id: donation.id,
      amount: donation.amount,
      isAnonymous: donation.isAnonymous,
      createdAt: donation.createdAt.toISOString(),
    },
  });
}
