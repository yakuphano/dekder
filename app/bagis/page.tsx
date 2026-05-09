import type { Metadata } from "next";
import { DonationForm } from "@/components/donation-form";

export const metadata: Metadata = {
  title: "Bağış yap",
  description: "DEKDER bağış sayfası — mock ödeme simülasyonu ve kayıt.",
};

export default function BagisPage() {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <header className="mx-auto max-w-xl text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            Bağış
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Bağış yap
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            Gönderimden önce yaklaşık <strong>2 saniye</strong> süren bir{" "}
            <strong className="text-red-700">ödeme simülasyonu</strong> gösterilir;
            ardından kayıt <strong className="text-blue-950">donations</strong>{" "}
            tablosuna yazılır. Gerçek ödeme geçidi (Iyzico / PayTR) sonraki adımda
            eklenebilir.
          </p>
        </header>

        <div className="mt-10">
          <DonationForm />
        </div>
      </div>
    </div>
  );
}
