"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { submitDonation } from "@/app/actions/donation";

const presets = [100, 250, 500, 1000];

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20";

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function DonationForm() {
  const router = useRouter();
  const [amount, setAmount] = useState<number>(250);
  const [custom, setCustom] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorSurname, setDonorSurname] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [phase, setPhase] = useState<"idle" | "paying" | "saving" | "ok" | "err">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const effectiveAmount = useMemo(() => {
    const c = custom.trim();
    if (c) {
      const n = Number(c.replace(",", "."));
      return Number.isFinite(n) ? Math.floor(n) : amount;
    }
    return amount;
  }, [amount, custom]);

  const busy = phase === "paying" || phase === "saving";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setPhase("paying");
    try {
      await sleep(2000);
      setPhase("saving");
      const fd = new FormData();
      fd.set("donorName", donorName.trim());
      fd.set("donorSurname", donorSurname.trim());
      fd.set("amount", String(effectiveAmount));
      if (anonymous) fd.set("isAnonymous", "on");

      const result = await submitDonation(fd);
      if (!result.ok) {
        setPhase("err");
        setMessage(result.error);
        return;
      }
      setPhase("ok");
      setMessage(
        "Bağışınız başarıyla kaydedildi. Teşekkür ederiz; ana sayfadaki teşekkür panosunda görünebilir.",
      );
      router.refresh();
    } catch {
      setPhase("err");
      setMessage("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  }

  return (
    <div className="relative mx-auto max-w-xl">
      {busy ? (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/80 px-4 text-center backdrop-blur-sm"
          aria-live="polite"
        >
          <p className="rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold text-white shadow-lg">
            {phase === "paying"
              ? "Ödeme simülasyonu işleniyor… (2 sn)"
              : "Bağış veritabanına yazılıyor…"}
          </p>
        </div>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        {message ? (
          <p
            role={phase === "ok" ? "status" : "alert"}
            className={
              phase === "ok"
                ? "rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
                : "rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
            }
          >
            {message}
          </p>
        ) : null}

        <div>
          <p className="text-sm font-medium text-blue-950">Bağış miktarı (TL)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {presets.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setAmount(n);
                  setCustom("");
                }}
                disabled={busy || phase === "ok"}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${
                  !custom && amount === n
                    ? "border-blue-950 bg-blue-950 text-white"
                    : "border-slate-300 bg-white text-slate-800 hover:border-blue-300"
                }`}
              >
                {n} TL
              </button>
            ))}
          </div>
          <label className="mt-3 block text-sm text-slate-700">
            Özel tutar
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              disabled={busy || phase === "ok"}
              inputMode="decimal"
              placeholder="Örn. 1750"
              className={fieldClass}
            />
          </label>
          <p className="mt-2 text-xs text-slate-500">
            Seçilen tutar: <strong>{effectiveAmount} TL</strong>
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-blue-950">
            Ad
            <input
              required
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              disabled={busy || phase === "ok"}
              autoComplete="given-name"
              className={fieldClass}
            />
          </label>
          <label className="block text-sm font-medium text-blue-950">
            Soyad
            <input
              required
              value={donorSurname}
              onChange={(e) => setDonorSurname(e.target.value)}
              disabled={busy || phase === "ok"}
              autoComplete="family-name"
              className={fieldClass}
            />
          </label>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-800">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            disabled={busy || phase === "ok"}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-600"
          />
          <span>
            İsmim ana sayfada gizli kalsın{" "}
            <span className="font-semibold text-red-700">(Anonim)</span>
          </span>
        </label>

        <button
          type="submit"
          disabled={busy || phase === "ok"}
          className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy
            ? phase === "paying"
              ? "Ödeme bekleniyor…"
              : "Kaydediliyor…"
            : phase === "ok"
              ? "Tamamlandı"
              : "Bağışı tamamla"}
        </button>
      </form>
    </div>
  );
}
