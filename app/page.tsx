import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeArticlesSidebar } from "@/components/home-articles-sidebar";
import { donationThankYouLine, type DonationThankYouInput } from "@/lib/donation-text";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const heroImage = "/eleskirt-manzara.jpg";

const mockNews = [
  {
    id: "mock-1",
    date: "12 Mayıs 2026",
    dateIso: "2026-05-12",
    title: "Genel kurul duyurusu",
    excerpt:
      "Yıllık olağan genel kurul toplantımız için tarih ve yer bilgisi yakında paylaşılacaktır.",
    href: "/duyurular",
  },
  {
    id: "mock-2",
    date: "8 Mayıs 2026",
    dateIso: "2026-05-08",
    title: "Kış yardımı kampanyası",
    excerpt:
      "İhtiyaç sahibi ailelere ulaştırılmak üzere gıda ve kıyafet bağışları kabul edilmektedir.",
    href: "/duyurular",
  },
  {
    id: "mock-3",
    date: "1 Mayıs 2026",
    dateIso: "2026-05-01",
    title: "Geleneksel gecelerimize davet",
    excerpt:
      "Kültür gecelerimizde hemşehrilerimizle bir araya gelmek için kayıt ve kontenjan bilgileri.",
    href: "/duyurular",
  },
];

type NewsCard = {
  id: string;
  date: string;
  dateIso: string;
  title: string;
  excerpt: string;
  href: string;
};

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
});

function excerptFromContent(text: string, max = 160): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

type DonationWithId = DonationThankYouInput & { id: string };

async function loadRecentDonations(): Promise<DonationWithId[]> {
  try {
    const rows = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      take: 12,
      select: {
        id: true,
        donorName: true,
        donorSurname: true,
        amount: true,
        isAnonymous: true,
      },
    });
    return rows.map((d) => ({
      id: d.id,
      donorName: d.donorName,
      donorSurname: d.donorSurname,
      amount: d.amount,
      isAnonymous: d.isAnonymous,
    }));
  } catch {
    return [];
  }
}

async function loadHomeArticles() {
  try {
    return await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: {
        id: true,
        title: true,
        content: true,
        authorName: true,
        authorTitle: true,
        authorImageUrl: true,
      },
    });
  } catch {
    return [];
  }
}

async function loadNewsCards(): Promise<NewsCard[]> {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 3,
    });
    if (posts.length === 0) {
      return mockNews;
    }
    return posts.map((p) => ({
      id: p.id,
      date: dateFmt.format(p.createdAt),
      dateIso: p.createdAt.toISOString().slice(0, 10),
      title: p.title,
      excerpt: excerptFromContent(p.content),
      href: `/duyurular/${p.id}`,
    }));
  } catch {
    return mockNews;
  }
}

export default async function Home() {
  const [recentDonations, newsCards, homeArticles] =
    await Promise.all([loadRecentDonations(), loadNewsCards(), loadHomeArticles()]);

  return (
    <div className="bg-slate-50">
      <section className="relative min-h-[min(88svh,560px)] md:min-h-[560px]">
        <Image
          src={heroImage}
          alt="Eleşkirt ilçesi genel manzarası ve Kösedağ"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/75 to-blue-950/85"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col justify-center px-3 py-16 sm:px-4 md:min-h-[560px] md:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Kültür · Dayanışma · Eleşkirt
          </p>
          <h1 className="mt-4 max-w-4xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-5xl md:leading-tight">
            Dünya Eleşkirt Kültür ve Dayanışma Derneği&apos;ne Hoş Geldiniz
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            DEKDER; Eleşkirt kültürünü yaşatmak, hemşehrilerimiz arasında dayanışmayı
            güçlendirmek ve toplumsal fayda üreten projelerde bir araya gelmek için
            kurulmuştur. Sizleri ailemizde görmekten mutluluk duyarız.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/uye-ol"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-blue-700"
            >
              Üye Ol
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/bagis"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-red-700"
            >
              Bağış Yap
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-3 sm:px-4">
          <div className="flex flex-col items-stretch justify-center gap-6 sm:gap-8 md:flex-row md:items-start md:gap-8">
            <article className="mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md md:mx-0 md:max-w-none md:flex-1 md:min-w-0">
              <div className="border-b border-slate-100 bg-white px-3 py-3 text-center sm:py-3.5">
                <p className="text-sm font-semibold text-blue-950 sm:text-base">Etkinlik afişi</p>
              </div>
              <div className="relative h-[220px] w-full overflow-hidden bg-white sm:h-[240px] md:h-[260px] lg:h-[280px]">
                <Image
                  src="/afis.jpg"
                  alt="DEKDER etkinlik afişi"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </article>
            <article className="mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md md:mx-0 md:max-w-none md:flex-1 md:min-w-0">
              <div className="border-b border-slate-100 bg-white px-3 py-3 text-center sm:py-3.5">
                <p className="text-sm font-semibold text-blue-950 sm:text-base">
                  İkram Hano - Dernek Başkanı
                </p>
              </div>
              <div className="relative h-[220px] w-full overflow-hidden bg-white sm:h-[240px] md:h-[260px] lg:h-[280px]">
                <Image
                  src="/baskan-mesaj.jpg"
                  alt="İkram Hano — Dernek Başkanı"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {recentDonations.length > 0 ? (
        <section className="border-b border-slate-200 bg-white py-12 md:py-16">
          <div className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
              Teşekkürlerimizle
            </h2>
            <p className="mt-3 text-base text-slate-600 md:text-lg">
              Destekçilerimizin iyiliği sayesinde dayanışma büyüyor. Son bağışlarımız için
              minnettarız.
            </p>
            <div className="mt-8 w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-8 shadow-sm md:px-8 md:py-10">
              <p className="text-lg font-semibold leading-relaxed text-blue-950 md:text-xl">
                {donationThankYouLine(recentDonations[0])}
              </p>
              {recentDonations.length > 1 ? (
                <ul className="mt-6 space-y-3 border-t border-slate-200 pt-6 text-center text-sm leading-relaxed text-slate-700 md:text-base">
                  {recentDonations.slice(1).map((d) => (
                    <li key={d.id}>{donationThankYouLine(d)}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-3 py-12 sm:px-4 md:py-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
              Son Duyurular ve Haberler
            </h2>
          </div>
          <Link
            href="/duyurular"
            className="text-sm font-semibold text-red-600 hover:text-red-700 hover:underline"
          >
            Tüm duyurular →
          </Link>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-4 lg:gap-8 lg:items-start">
          <div className="lg:col-span-3">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {newsCards.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-950 via-blue-900 to-red-600" />
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <time
                      dateTime={item.dateIso}
                      className="text-xs font-medium uppercase tracking-wide text-slate-500"
                    >
                      {item.date}
                    </time>
                    <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-blue-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {item.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-red-600">
                      Devamını oku
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <HomeArticlesSidebar articles={homeArticles} />
          </div>
        </div>
      </section>
    </div>
  );
}
