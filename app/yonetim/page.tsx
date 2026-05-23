import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Yönetim — Dernek Başkanı",
  description: "DEKDER dernek başkanı.",
};

const president = {
  name: "İkram Hano",
  role: "Dernek Başkanı",
  bio: "DEKDER’in stratejik yönetimini üstlenmekte; hemşehrilerimizi bir araya getiren projelere öncülük etmektedir.",
  imageUrl: "/baskan-resmi.jpg",
};

export default function YonetimPage() {
  return (
    <div className="bg-slate-50">
      <div className="border-b border-slate-200 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
            DEKDER
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Yönetim
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            Kuruluş vizyonumuz; Eleşkirt kültürünü yaşatmak, hemşehrilerimizi bir araya getirmek
            ve nesiller arası dayanışmayı güçlendirmektir. Dernek başkanımız aşağıda yer almaktadır.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <section className="mx-auto w-full max-w-[320px]">
          <h2 className="sr-only">Dernek başkanı</h2>
          <article className="overflow-hidden rounded-2xl border-2 border-amber-400/60 bg-white shadow-2xl shadow-blue-950/15 ring-2 ring-blue-900/20 transition duration-200 hover:-translate-y-1 hover:shadow-blue-950/25">
            <div className="relative aspect-[3/4] w-full bg-slate-100 ring-1 ring-inset ring-slate-300/80">
              <Image
                src={president.imageUrl}
                alt={`${president.name} — ${president.role}`}
                fill
                className="object-contain object-top"
                priority
                sizes="320px"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-blue-950/60 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 px-3 pb-2.5 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300 drop-shadow-sm">
                  Dernek Başkanı
                </p>
                <h3 className="mt-1 text-lg font-bold text-white drop-shadow-md md:text-xl">
                  {president.name}
                </h3>
              </div>
            </div>
            <div className="border-t border-slate-100 px-3 py-3 md:px-3.5 md:py-3.5">
              <p className="text-sm leading-snug text-slate-700">{president.bio}</p>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
