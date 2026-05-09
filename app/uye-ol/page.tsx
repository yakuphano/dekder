import type { Metadata } from "next";
import { MembershipForm } from "@/components/membership-form";

export const metadata: Metadata = {
  title: "Üyelik başvurusu",
  description: "DEKDER üyelik formu.",
};

export default function UyeOlPage() {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <header className="mx-auto max-w-xl text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            Üyelik
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Üyelik başvurusu
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            Bilgileriniz <strong className="text-blue-950">members</strong> tablosuna
            kaydedilir. Onay süreçleri dernek tüzüğüne göre yürütülür.
          </p>
        </header>

        <div className="mt-10">
          <MembershipForm />
        </div>
      </div>
    </div>
  );
}
