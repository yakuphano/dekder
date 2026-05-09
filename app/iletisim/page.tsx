import type { Metadata } from "next";
import { FeedbackForm } from "@/components/feedback-form";

export const metadata: Metadata = {
  title: "İletişim ve geri bildirim",
  description: "Öneri, dilek ve şikayet formu.",
};

export default function IletisimPage() {
  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <header className="mx-auto max-w-xl text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            İletişim
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 md:text-4xl">
            Öneri, dilek ve şikayet
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            Mesajlarınız <strong className="text-blue-950">feedbacks</strong> tablosunda
            saklanır. Konu türü (Öneri, Dilek, Şikayet, Diğer) açılır menüden seçilir.
          </p>
        </header>

        <div className="mt-10">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
