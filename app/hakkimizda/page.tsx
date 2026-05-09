import type { Metadata } from "next";
import {
  BookOpen,
  Eye,
  HeartHandshake,
  Landmark,
  Scale,
  Sparkles,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "DEKDER — Dünya Eleşkirt Kültür ve Dayanışma Derneği: amaç, vizyon, misyon ve değerlerimiz.",
};

const values = [
  {
    title: "Dayanışma",
    text: "Hemşehrilerimizin yanında olmak, ihtiyaç anında omuz vermek ve birlikte güçlenmek temel ilkemizdir.",
    icon: HeartHandshake,
  },
  {
    title: "Kültürel bağlılık",
    text: "Eleşkirt’in sesini, geleneklerini ve ortak hafızasını nesiller boyu yaşatmayı hedefleriz.",
    icon: Landmark,
  },
  {
    title: "Şeffaflık",
    text: "Faaliyetlerimizi ve kaynak kullanımını açık, anlaşılır ve izlenebilir biçimde paylaşırız.",
    icon: Eye,
  },
  {
    title: "Adalet ve güven",
    text: "Karar süreçlerinde eşitlik, hesap verebilirlik ve üyelerimize karşı güveni esas alırız.",
    icon: Scale,
  },
];

export default function HakkimizdaPage() {
  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-300/90">
            Biz kimiz?
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl md:leading-tight">
            Hakkımızda
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
            Dünya Eleşkirt Kültür ve Dayanışma Derneği (DEKDER) olarak, gurbetteki ve sılaya
            dönen tüm hemşehrilerimizi bir araya getiriyoruz.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:space-y-20 md:py-20">
        <section className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
              Derneğimizin amacı
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-700 md:text-lg">
              <p>
                DEKDER; hemşehriler arası yardımlaşmayı güçlendirmek, kültürel mirasımızı
                yaşatmak ve Eleşkirt&apos;in sosyal, kültürel ve insani gelişimine katkı
                sunmak amacıyla faaliyet gösterir. Gönüllülük ve ortak sorumluluk ile
                dayanışma ağımızı büyütürüz.
              </p>
              <p>
                Eğitimden sosyal yardıma, kültürel etkinliklerden kamuoyu bilgilendirmesine
                kadar geniş bir yelpazede, şeffaf ve üye odaklı çalışma anlayışıyla hareket
                ederiz. Her hemşehrimizin derneğe katkısı, toplumsal faydaya dönüşür.
              </p>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="flex h-56 w-full max-w-md flex-col items-center justify-center rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-950 to-blue-900 p-8 text-center shadow-xl md:h-64">
              <Target
                className="h-16 w-16 text-red-400"
                strokeWidth={1.25}
                aria-hidden
              />
              <p className="mt-4 text-sm font-medium leading-relaxed text-white/90">
                Ortak köklerimizden güç alarak, birlikte daha güçlü bir gelecek inşa ediyoruz.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-center text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
            Vizyon ve misyonumuz
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 md:text-base">
            Uzun vadeli hedefimiz ile günlük çalışma ilkelerimiz yan yana.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950/10 text-blue-950">
                  <Sparkles className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="text-xl font-bold text-blue-950">Vizyonumuz</h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-700 md:text-base">
                Eleşkirt kökenli bireylerin dünyanın neresinde olursa olsun kültürel kimliklerini
                yaşadıkları, dayanışma içinde oldukları ve ilçemizin gelişimine anlamlı katkı
                sundukları güçlü bir sivil toplum ağı oluşturmak; DEKDER&apos;i bu alanda
                örnek ve güvenilir bir adres haline getirmek.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 text-red-700">
                  <BookOpen className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="text-xl font-bold text-blue-950">Misyonumuz</h3>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-700 md:text-base">
                Hemşehrilerimizi bir araya getirmek; sosyal yardım, kültür ve eğitim alanlarında
                projeler üretmek; kamuya açık, şeffaf ve katılımcı bir yönetişim ile üyelerimizin
                ve toplumun güvenini kazanmak. Yerel değerleri koruyarak evrensel insan haklarına
                saygılı çalışmak temel görevimizdir.
              </p>
            </article>
          </div>
        </section>

        <section>
          <h2 className="text-center text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
            Değerlerimiz
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-600 md:text-base">
            DEKDER&apos;i tanımlayan ilkeler — her kararımızda rehberimizdir.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <article
                  key={v.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-blue-200 hover:shadow-md"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-950 text-white">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-blue-950">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{v.text}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
