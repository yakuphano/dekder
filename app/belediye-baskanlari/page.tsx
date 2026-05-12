import type { Metadata } from "next";
import Image from "next/image";
import { User } from "lucide-react";

export const metadata: Metadata = {
  title: "Belediye Başkanlarımız",
  description:
    "Eleşkirt belediye başkanları — geçmişten günümüze hizmet veren büyüklerimizi saygı ve minnetle anıyoruz.",
};

type BelediyeBaskaniKaydi = {
  name: string;
  /** Görev dönemleri (kartta alt alta listelenir) */
  periods: string[];
  /** public/ altı yol, örn. "/ramazan-yakut.jpg" — yoksa null */
  imageUrl: string | null;
  /** En son görevin yılı; galeri sırası: büyükten küçüğe */
  sortKey: number;
  /** Rozet ve vurgulu kart için */
  isCurrent: boolean;
};

/**
 * Birleştirilmiş belediye başkanı listesi — aynı isim tek kart, dönemler `periods` içinde.
 * Sıralama `sortKey` ile yapılır (en son görev yapan üstte).
 */
const belediyeBaskanlari: BelediyeBaskaniKaydi[] = [
  {
    name: "Ramazan Yakut",
    periods: ["2019 - 2024", "2024 - Günümüz"],
    imageUrl: null,
    sortKey: 2024,
    isCurrent: true,
  },
  {
    name: "Sebahattin Sarı",
    periods: ["1984 - 1989", "1989 - 1994", "2014 - 2019"],
    imageUrl: null,
    sortKey: 2019,
    isCurrent: false,
  },
  {
    name: "Mehmet Nuri Çelik",
    periods: ["1994 - 1999", "2009 - 2014"],
    imageUrl: null,
    sortKey: 2014,
    isCurrent: false,
  },
  {
    name: "Sait Yami",
    periods: ["1999 - 2004", "2004 - 2009"],
    imageUrl: null,
    sortKey: 2009,
    isCurrent: false,
  },
  {
    name: "Selahattin Sarayhanoğlu",
    periods: ["1963 - 1968", "1968 - 1973", "1977 - 1980"],
    imageUrl: null,
    sortKey: 1980,
    isCurrent: false,
  },
  {
    name: "Ali Aral",
    periods: ["1973 - 1977"],
    imageUrl: null,
    sortKey: 1977,
    isCurrent: false,
  },
  {
    name: "Mehmet Dişçi",
    periods: ["1956 - 1963"],
    imageUrl: null,
    sortKey: 1963,
    isCurrent: false,
  },
  {
    name: "Ahmet Tekin",
    periods: ["1948 - 1956"],
    imageUrl: null,
    sortKey: 1956,
    isCurrent: false,
  },
];

function MayorCard({ mayor }: { mayor: BelediyeBaskaniKaydi }) {
  const frame = mayor.isCurrent
    ? "overflow-hidden rounded-2xl border-2 border-amber-400/70 bg-white shadow-2xl shadow-blue-950/20 ring-2 ring-blue-900/25 transition duration-200 hover:-translate-y-1 hover:shadow-blue-950/30"
    : "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md ring-1 ring-blue-950/5 transition duration-200 hover:-translate-y-1 hover:border-red-200/80 hover:shadow-lg hover:ring-red-600/10";

  const accent = mayor.isCurrent
    ? "h-0.5 w-full shrink-0 bg-gradient-to-r from-blue-950 via-amber-500/90 to-red-600"
    : "h-0.5 w-full shrink-0 bg-gradient-to-r from-blue-950 via-blue-900 to-red-600";

  return (
    <article
      className={`mx-auto flex h-full w-full max-w-[280px] flex-col overflow-hidden ${frame}`}
    >
      <div className={accent} aria-hidden />
      <div className="relative w-full shrink-0 aspect-[3/4] overflow-hidden rounded-t-xl bg-slate-50">
        {mayor.imageUrl ? (
          <Image
            src={mayor.imageUrl}
            alt={`${mayor.name} — Eleşkirt Belediye Başkanı`}
            fill
            className="object-cover object-top"
            sizes="280px"
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-slate-100 via-white to-blue-950/[0.06]"
            aria-hidden
          >
            <div className="rounded-full bg-white p-2.5 shadow-md ring-2 ring-blue-950/12">
              <User className="h-9 w-9 text-blue-950/75" strokeWidth={1.5} />
            </div>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Portre
            </span>
          </div>
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center border-t border-slate-100 bg-white px-3 py-2.5 text-center">
        {mayor.isCurrent ? (
          <div className="mb-1.5 flex flex-col items-center gap-0.5">
            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-blue-950/75">
              Hizmet Bayrağı
            </span>
            <span className="max-w-[11.5rem] rounded-md border border-amber-500/35 bg-gradient-to-r from-amber-400 to-amber-500 px-1.5 py-0.5 text-center text-[8px] font-bold uppercase leading-tight text-blue-950">
              Mevcut Belediye Başkanı
            </span>
          </div>
        ) : null}
        <h3 className="text-sm font-bold leading-snug text-blue-950 md:text-base">{mayor.name}</h3>
        <ul className="mt-1.5 space-y-0.5">
          {mayor.periods.map((p) => (
            <li
              key={p}
              className="text-xs font-semibold tabular-nums leading-snug text-slate-600"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function BelediyeBaskanlariPage() {
  const siralı = [...belediyeBaskanlari].sort((a, b) => b.sortKey - a.sortKey);

  return (
    <div className="bg-slate-50">
      <div className="border-b border-slate-200 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-14 md:pb-10 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
            DEKDER
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-md md:mt-5 md:text-5xl md:leading-[1.08] lg:text-6xl">
            Eleşkirt Belediye Başkanlarımız
          </h1>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-7 md:py-9">
          <p className="text-center text-sm italic leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
            Eleşkirt&apos;imizin tarihinde iz bırakan, ilçemizin kalkınması ve refahı için emek vermiş,
            halkımızın iradesiyle göreve gelmiş tüm Belediye Başkanlarımızı saygı ve minnetle
            anıyoruz. Bu sayfa, geçmişten günümüze hizmet meşalesini taşıyan kıymetli büyüklerimize
            bir vefa nişanesidir.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-4 md:pb-12 md:pt-6">
        <section aria-label="Belediye başkanları galerisi">
          <div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siralı.map((mayor) => (
              <MayorCard key={mayor.name} mayor={mayor} />
            ))}
          </div>
        </section>

        <p className="mx-auto mt-14 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
          Tarih ve dönem bilgileri Türkçe Wikipedia &quot;Eleşkirt&quot; maddesindeki belediye
          başkanlığı listesine dayanır; resmi kayıtlarla doğrulamanız önerilir.
        </p>
      </div>
    </div>
  );
}
