import type { Metadata } from "next";
import { Map } from "lucide-react";
import { VillagesList } from "@/components/villages-list";
import { villages } from "@/lib/villages";

export const metadata: Metadata = {
  title: "Köylerimiz",
  description:
    "Eleşkirt ilçesi köyleri — Türkçe ve Kürtçe yer adları; merkez ve Tahir beldesi köyleri.",
};

export default function KoylerimizPage() {
  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-300">
            <Map className="h-4 w-4" aria-hidden />
            Eleşkirt
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl md:leading-tight">
            Eleşkirt Köyleri
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            İlçe merkezine bağlı köyler ile Tahir beldesi sınırları içindeki köyler, Türkçe
            ve Kürtçe adlarıyla birlikte listelenir. Arama kutusu her iki dilde de filtreleme
            yapmanızı sağlar.
          </p>
          <p className="mt-4 text-sm text-white/60">
            Toplam <strong className="text-white">{villages.length}</strong> köy.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <VillagesList villages={villages} />
      </div>
    </div>
  );
}
