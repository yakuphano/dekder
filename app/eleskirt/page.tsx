import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Eleşkirt tanıtımı",
  description: "Ağrı'nın doğa ve kültür hazinelerinden Eleşkirt ilçesi.",
};

const IMG_W = 800;
const IMG_H = 600;
const imgSizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 560px";

function Figure({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg">
      <Image
        src={src}
        alt={alt}
        width={IMG_W}
        height={IMG_H}
        priority={priority}
        className="h-auto w-full object-cover"
        sizes={imgSizes}
      />
    </div>
  );
}

export default function EleskirtPage() {
  return (
    <article className="bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-600">
            Tanıtım
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-blue-950 md:text-5xl md:leading-tight">
            Tarihi ve Doğasıyla Eleşkirt
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Aşağıdaki metinler tanıtım amaçlı örnek içeriktir; resmi veriler ve güncel
            istatistikler kamu kaynaklarıyla desteklenmelidir.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:space-y-24 md:py-20">
        {/* Zigzag 1: metin sol, görsel sağ (md+) */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-blue-950 md:text-3xl">
              Coğrafya ve iklim
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Eleşkirt, yüksek platolar ve derin vadilerle çevrili, kışlarında kar
              örtüsüyle büyüleyen bir doğaya sahiptir. Yazın serin geçen geceleri ve
              temiz dağ havası, yaylacılık ve doğa rotaları için uygun bir zemin sunar.
              Bu paragraf, ziyaretçiye kısa ve sembolik bir coğrafya özeti verir.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Dereler ve meralar, geleneksel hayvancılığın ve köy ekonomisinin
              sürdürülmesinde önemli rol oynar; manzara ise fotoğraf ve doğa
              severlerine ilham verir.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <Figure
              src="/eleskirt-manzara.jpg"
              alt="Eleşkirt ilçesi genel manzarası ve Kösedağ"
              priority
            />
            <p className="mt-2 text-center text-xs text-slate-500">
              Eleşkirt ve Kösedağ silüeti — yerel arşiv görseli.
            </p>
          </div>
        </div>

        {/* Zigzag 2: görsel sol, metin sağ */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <Figure
              src="/kosedag.jpg"
              alt="Eleşkirt Kösedağ manzarası, karlı zirve yakın çekim"
            />
            <p className="mt-2 text-center text-xs text-slate-500">
              Kösedağ kış görünümü — yerel fotoğraf.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-950 md:text-3xl">
              Tarihçeye kısa bir bakış
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Bölgenin tarihsel hafızası; göç yolları, küçük kasaba yaşamı ve komşuluk
              gelenekleri üzerinden şekillenir. Eleşkirt, hemşehrilerinin birbirine
              tutunmasını ve ortak değerleri korumasını önemseyen bir kültür taşır.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Bu metin yer tutucudur; gerçek tarih anlatımı için arşiv belgeleri ve
              uzman görüşleriyle zenginleştirilmesi önerilir.
            </p>
          </div>
        </div>

        {/* Zigzag 3: metin sol, görsel sağ */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-blue-950 md:text-3xl">
              Kültür ve yöresel değerler
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Sofrada tereyağı ve otlu peynir, sohbette çay ve misafirperverlik; düğün
              ve bayramlarda ise halk oyunları ve müzik bir araya gelir. Bu değerler,
              DEKDER&apos;in dayanışma dilinin de kaynağıdır.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 md:text-base">
              <li>Mahalle dayanışması ve gönüllülük gelenekleri</li>
              <li>El emeği ve küçük üretim pratikleri</li>
              <li>Gençlerin kültürel mirasla buluşması için etkinlik alanları</li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <Figure
              src="/eleskirt-harita.jpg"
              alt="Eleşkirt ilçesinin haritadaki konumu, Ağrı ili"
            />
            <p className="mt-2 text-center text-xs text-slate-500">
              Coğrafi konum — harita görseli.
            </p>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-950 to-blue-900 p-8 text-white shadow-lg md:p-10">
          <h2 className="text-xl font-bold md:text-2xl">DEKDER ile Eleşkirt</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/90 md:text-base">
            Derneğimiz; hemşehrilerimizi bir araya getirmek, eğitim ve sosyal yardım
            projeleriyle dayanışmayı büyütmek, kültürel etkinliklerle ortak hafızayı
            canlı tutmak için çalışır. Bu sayfa, ilçemizi dünyaya güzel ve anlaşılır
            bir dille anlatmak için bir başlangıçtır.
          </p>
          <p className="mt-4 text-sm font-medium text-red-300">
            Eleşkirt&apos;e gönülden selam olsun.
          </p>
        </section>
      </div>
    </article>
  );
}
