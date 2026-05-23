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
          <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-slate-600 md:text-lg">
            <p>
              Doğu Anadolu&apos;nun köklü geçmişe sahip kapısı Eleşkirt, heybetli
              Kösedağ&apos;ın eteklerinde, bereketli bir ovanın kalbinde yer alır.
              Urartulardan Osmanlıya uzanan tarihiyle pek çok medeniyete ev sahipliği
              yapmış olan ilçemiz, stratejik konumu ve zengin kültürel mozaiğiyle
              bölgenin en köklü yerleşim merkezlerinden biridir.
            </p>
            <p>
              Sert karasal iklimin şekillendirdiği eşsiz doğası, geniş meraları, dillere
              destan yöresel mutfağı ve misafirperver insanıyla Eleşkirt; geçmişin
              mirasını geleceğe taşıyan kadim bir kültürün adıdır. Dünya Eleşkirtliler
              Kültür ve Dayanışma Derneği (DEKDER) olarak, bu değerli mirası ve memleket
              bağlarımızı dünyanın dört bir yanındaki hemşehrilerimizle birlikte
              yaşatmaktan gurur duyuyoruz.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 md:space-y-24 md:py-20">
        {/* Zigzag 1: metin sol, görsel sağ (md+) */}
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold text-blue-950 md:text-3xl">
              Coğrafya ve iklim
            </h2>
            <div className="mt-6 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-blue-950 md:text-xl">
                  Coğrafi Yapı ve Konum
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  Ağrı ilinin batısında, tarihi ve stratejik bir kavşakta yer alan Eleşkirt;
                  dağlık, engebeli ve heybetli coğrafyasıyla Doğu Anadolu&apos;nun karakteristik
                  tüm özelliklerini taşır. Deniz seviyesinden ortalama 1811 metre yükseklikte
                  konumlanan ilçemiz, bölgenin en yüksek ve özel yerleşim alanlarından biridir.
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  <li>
                    <span className="font-semibold text-blue-950">Stratejik Konum:</span>{" "}
                    Erzurum-Ağrı karayolu üzerinde yer alan ilçemiz, hem ulaşım kolaylığına
                    sahiptir hem de Ağrı il merkezine yakınlığıyla önemli bir lojistik
                    noktadadır.
                  </li>
                  <li>
                    <span className="font-semibold text-blue-950">Yüzey Şekilleri:</span>{" "}
                    Toplam 1529 km² yüzölçümüne sahip olan Eleşkirt, etrafını saran yüksek
                    dağlar ve bu dağların arasında hayat bulan, tarıma elverişli verimli
                    Eleşkirt Ovası ile çevrilidir.
                  </li>
                  <li>
                    <span className="font-semibold text-blue-950">Zirveler ve Dağlar:</span>{" "}
                    İlçenin kuzeyini süsleyen ve bölgenin simgesi haline gelen Kösedağ (2544 m),
                    Eleşkirt coğrafyasının en heybetli yükseltisidir.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-blue-950 md:text-xl">
                  İklim ve Bitki Örtüsü
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  Eleşkirt, sert karasal iklimin en net hissedildiği bölgelerden biridir. Bu
                  zorlu ama bir o kadar da özel iklim yapısı, ilçenin kültürünü, yaşam tarzını
                  ve doğasını şekillendirmiştir.
                </p>
              </div>

              <div>
                <h4 className="text-base font-bold text-blue-950">
                  Sıcaklık ve Yağış Dengesi
                </h4>
                <ul className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  <li>
                    <span className="font-semibold text-blue-950">Kış Mevsimi:</span> Kış
                    ayları oldukça uzun, sert ve bol karlıdır. Sıcaklıklar sıkça -15°C ve
                    altına düşer. Kışın yağan kar, kalın bir örtü halinde yerde uzun süre
                    kalarak ilçeye adeta beyaz bir gelinlik giydirir.
                  </li>
                  <li>
                    <span className="font-semibold text-blue-950">Yaz Mevsimi:</span> Yaz
                    ayları ise kışın aksine hızlıca ısınan, sıcak ve kurak bir yapıya sahiptir.
                    Yaz ortalaması 25°C seviyelerine kadar ulaşır ve bu dönemde yağış oldukça
                    azdır.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-base font-bold text-blue-950">
                  Doğal Bitki Örtüsü ve Yaşam
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  İlçenin yüksek kesimlerinde zengin bozkır (step) bitki örtüsü ve bahar
                  aylarında rengarenk açan alpin çayırlar hakimdir.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  <span className="font-semibold text-blue-950">Doğanın Ekonomiye Etkisi:</span>{" "}
                  Eleşkirt&apos;in bu benzersiz coğrafi yapısı ve geniş meraları, ilçede
                  hayvancılığın en temel geçim kaynağı olmasını sağlamış ve köklü bir yaylacılık
                  kültürünü doğurmuştur.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Figure
              src="/eleskirt-harita.jpg"
              alt="Eleşkirt ilçesinin haritadaki konumu, Ağrı ili"
              priority
            />
            <p className="mt-2 text-center text-xs text-slate-500">
              Coğrafi konum — harita görseli.
            </p>
          </div>
        </div>

        {/* Zigzag 2: görsel sol, metin sağ */}
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
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
              Tarihçeye Kısa Bir Bakış
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Eleşkirt&apos;in tarihi, bölgenin en eski ve güçlü medeniyetlerinden biri olan
              Urartulara kadar uzanmaktadır. İlçe sınırları içinde yer alan Toprakkale ve
              Pirabat köylerindeki kalıntılar, antik dönemlerde bölgenin ne denli önemli bir
              askeri ve idari merkez olduğunu göstermektedir. Stratejik konumu ve verimli
              ovası nedeniyle tarih boyunca dikkat çeken Eleşkirt; Medler, Persler,
              Romalılar, Bizanslılar ve Selçukluların ardından Osmanlı İmparatorluğu&apos;nun
              hakimiyetine girmiştir.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Tarihi İpek Yolu güzergahında ve Trabzon-Ağrı transit hattı üzerinde yer alması,
              ilçeyi yüzyıllar boyunca orduların ve ticaret kervanlarının geçiş noktası
              haline getirmiştir. Tarihsel adı &quot;Alaşkert&quot; veya halk arasındaki yaygın
              kullanımıyla &quot;Zêtka&quot; (Zedikan) olan ilçe merkezi, 1926 yılında uluslararası
              ulaşım yollarının avantajı gözetilerek bugünkü modern konumuna taşınmıştır.
              Yüzyıllar boyunca farklı kültürlerin, Kafkasya göçmenlerinin ve bölgenin kadim
              halklarının barış içinde bir arada yaşadığı Eleşkirt, bu zengin tarihi mirası
              güçlü bir dayanışma kültürüyle günümüze kadar taşımayı başarmıştır.
            </p>
          </div>
        </div>

        {/* Zigzag 3: metin sol, görsel sağ */}
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <div className="order-2 space-y-8 md:order-1">
            <h2 className="text-2xl font-bold text-blue-950 md:text-3xl">
              Kültür ve Yöresel Değerler
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 md:text-base">
              Eleşkirt&apos;in kültürel kimliği; sofrada keşkek, halise ve çiçal peyniriyle,
              sohbette demli bir çay ve samimi bir misafirperverlikle, düğün ve bayramlarda
              ise köklü halk oyunları ve dengbêjlik/aşık gelenekleriyle hayat bulur.
              Nesiller boyu aktarılan bu köklü değerler, DEKDER&apos;in dünyadaki tüm
              Eleşkirtlileri bir araya getiren dayanışma dilinin de en büyük kaynağıdır.
            </p>

            <div>
              <h3 className="text-lg font-bold text-blue-950 md:text-xl">
                Mahalle Dayanışması ve Gönüllülük Gelenekleri
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                İlçemizin sert iklimi ve zorlu coğrafi şartları, tarih boyunca güçlü bir
                yardımlaşma kültürünü zorunlu kılmıştır. Eleşkirt&apos;te taziye, düğün ve
                hasat dönemlerinde hayata geçen &quot;imece&quot; geleneği, mahalle
                dayanışmasının en somut örneğidir. Kimsenin yalnız kalmadığı, sevincin de
                kederin de ortakça paylaşıldığı bu gönüllülük esası, derneğimizin gurbet
                ile sıla arasında kurduğu köprünün temel harcını oluşturur.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-950 md:text-xl">
                El Emeği ve Küçük Üretim Pratikleri
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                Yüksek meralarda binbir çeşit şifalı otla beslenen hayvanların sütünden yapılan
                örgü (çiçal) peyniri, tereyağı, geleneksel yöntemlerle dokunan halı ve
                kilimler, Eleşkirt&apos;in el emeğine dayalı ekonomik mirasıdır. Ahıska,
                Terekeme ve Kürt kültürlerinin mutfağa yansıması olan ve sabırla hazırlanan
                geleneksel hamur işleri ile kışlık hazırlıklar, üretimde kadının ve aile içi
                dayanışmanın gücünü simgeler.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-blue-950 md:text-xl">
                Gençlerin Kültürel Mirasla Buluşması
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                Köklerinden kopmayan bir gelecek inşa etmek amacıyla, yeni nesillerin bu zengin
                mirasla bağ kurmasını önemsiyoruz. Düzenleyeceğimiz kültürel festivaller,
                gençlik buluşmaları, yöresel mutfak atölyeleri ve folklor etkinlikleriyle,
                Eleşkirt&apos;in kadim geleneklerini, dilini, müziğini ve komşuluk ahlakını
                genç kuşaklara aktaracak canlı dinamik alanlar yaratıyoruz.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Figure
              src="/eleskirt-manzara.jpg"
              alt="Eleşkirt ilçesi genel manzarası ve Kösedağ"
            />
            <p className="mt-2 text-center text-xs text-slate-500">
              Eleşkirt ve Kösedağ silüeti — yerel arşiv görseli.
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
