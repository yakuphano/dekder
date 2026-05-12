import type { Metadata } from "next";
import Image from "next/image";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Yönetim ve Kurucu Üyeler",
  description:
    "DEKDER dernek başkanı, başkan vekili, yönetim kurulu ve kurucu üyeler.",
};

type Leader = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
};

const president: Leader = {
  name: "Murat Yıldız",
  role: "Dernek Başkanı",
  bio: "Sivil toplum ve yerel kalkınma alanında yıllara dayanan deneyimiyle DEKDER’in stratejik yönetimini üstlenmekte; hemşehrilerimizi bir araya getiren projelere öncülük etmektedir.",
  imageUrl: "/baskan-resmi.jpg",
};

const vicePresidents: Leader[] = [
  {
    name: "Deniz Koç",
    role: "Başkan Vekili",
    bio: "Organizasyon ve üye ilişkilerinde koordinasyonu sağlar; yönetim kurulu kararlarının uygulanmasına destek olur.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Emre Şahin",
    role: "Başkan Vekili",
    bio: "Dış ilişkiler ve kamuoyu iletişiminde aktif rol alır; dayanışma kampanyalarının yürütülmesine katkı sağlar.",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
];

const boardMembers: Leader[] = [
  {
    name: "Can Özdemir",
    role: "Yönetim Kurulu Üyesi",
    bio: "Mali işler ve şeffaflık raporlamasından sorumlu; denetim süreçlerini destekler.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Zeynep Kılıç",
    role: "Yönetim Kurulu Üyesi",
    bio: "Sosyal yardım ve proje alanlarında saha koordinasyonu yapar.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Burak Çelik",
    role: "Yönetim Kurulu Üyesi",
    bio: "Kültürel etkinlikler ve gençlik çalışmalarını yürütür.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Selin Arslan",
    role: "Yönetim Kurulu Üyesi",
    bio: "Üyelik kayıtları ve dijital iletişim kanallarının işletilmesinde görev alır.",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
  },
];

const founders: Leader[] = [
  {
    name: "Ahmet Yılmaz",
    role: "Kurucu Üye",
    bio: "Sivil toplum ve yerel yönetim deneyimiyle derneğin kuruluş sürecinde öncü rol üstlenmiştir.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Ayşe Demir",
    role: "Kurucu Üye",
    bio: "Eğitim projelerinde gönüllü; gençlerin kültürel mirasla buluşmasına katkı sağlar.",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Mehmet Kaya",
    role: "Kurucu Üye",
    bio: "Dayanışma ağının güçlenmesi ve şeffaf mali yönetim konularında aktiftir.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Fatma Şahin",
    role: "Kurucu Üye",
    bio: "Sosyal yardım ve sağlık bilinci etkinliklerinde organize edici görevler üstlenmiştir.",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Hasan Öztürk",
    role: "Kurucu Üye",
    bio: "Hukuki uyum ve tüzük çalışmalarında danışmanlık sağlamaktadır.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    name: "Elif Aydın",
    role: "Kurucu Üye",
    bio: "Kurumsal iletişim ve dijital görünürlük için görsel kimlik çalışmalarına öncülük eder.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
];

function PersonCard({
  person,
  sizes,
  imageClassName = "aspect-[3/4] min-h-[220px]",
}: {
  person: Leader;
  sizes: string;
  imageClassName?: string;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <div className={`relative w-full bg-slate-100 ${imageClassName}`}>
        <Image
          src={person.imageUrl}
          alt={`${person.name} — ${person.role}`}
          fill
          className="object-contain object-top"
          sizes={sizes}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-950/65 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-4 pb-3">
          <h3 className="text-lg font-bold text-white drop-shadow-sm md:text-xl">{person.name}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-red-200/95">
            {person.role}
          </p>
        </div>
      </div>
      <div className="flex flex-col p-5">
        <p className="text-sm leading-relaxed text-slate-600">{person.bio}</p>
      </div>
    </article>
  );
}

export default function YonetimPage() {
  return (
    <div className="bg-slate-50">
      <div className="border-b border-slate-200 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
            DEKDER
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
            Yönetim ve Kurucu Üyeler
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            Kuruluş vizyonumuz; Eleşkirt kültürünü yaşatmak, hemşehrilerimizi bir araya getirmek
            ve nesiller arası dayanışmayı güçlendirmektir. Aşağıda dernek yönetim hiyerarşimiz
            ve kurucu üyelerimiz yer almaktadır.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Başkan */}
        <section className="mx-auto max-w-xl">
          <h2 className="sr-only">Dernek başkanı</h2>
          <article className="overflow-hidden rounded-2xl border-2 border-amber-400/60 bg-white shadow-2xl shadow-blue-950/15 ring-2 ring-blue-900/20 transition duration-200 hover:-translate-y-1 hover:shadow-blue-950/25">
            <div className="relative aspect-[3/4] w-full min-h-[280px] bg-slate-100 ring-1 ring-inset ring-slate-300/80 sm:aspect-[4/5]">
              <Image
                src={president.imageUrl}
                alt={`${president.name} — ${president.role}`}
                fill
                className="object-contain object-top"
                priority
                sizes="(max-width: 768px) 100vw, 576px"
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] max-h-40 bg-gradient-to-t from-blue-950/60 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-5 pb-5 md:p-6 md:pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300 drop-shadow-sm">
                  Dernek Başkanı
                </p>
                <h3 className="mt-2 text-2xl font-bold text-white drop-shadow-md md:text-3xl">
                  {president.name}
                </h3>
              </div>
            </div>
            <div className="border-t border-slate-100 p-6 md:p-8">
              <p className="text-base leading-relaxed text-slate-700">{president.bio}</p>
            </div>
          </article>
        </section>

        <div
          className="mx-auto my-14 max-w-2xl border-t border-slate-200 md:my-20"
          aria-hidden
        />

        {/* Başkan vekilleri */}
        <section>
          <h2 className="text-center text-xl font-bold text-blue-950 md:text-2xl">
            Başkan Vekili
          </h2>
          <div className="mx-auto mt-8 grid max-w-5xl gap-8 sm:grid-cols-2">
            {vicePresidents.map((p) => (
              <PersonCard
                key={p.name + p.imageUrl}
                person={p}
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            ))}
          </div>
        </section>

        <div
          className="mx-auto my-14 max-w-2xl border-t border-slate-200 md:my-20"
          aria-hidden
        />

        {/* Yönetim kurulu */}
        <section>
          <div className="flex flex-col items-center gap-2 text-center">
            <Users className="h-8 w-8 text-blue-950" aria-hidden />
            <h2 className="text-xl font-bold text-blue-950 md:text-2xl">
              Yönetim Kurulu Üyeleri
            </h2>
            <p className="max-w-2xl text-sm text-slate-600">
              Karar alma ve denetim süreçlerinde görev alan yönetim kurulu üyelerimiz.
            </p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {boardMembers.map((p) => (
              <PersonCard
                key={p.name + p.imageUrl}
                person={p}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            ))}
          </div>
        </section>

        <div
          className="mx-auto my-14 max-w-2xl border-t border-slate-200 md:my-20"
          aria-hidden
        />

        {/* Kurucular */}
        <section>
          <h2 className="text-center text-xl font-bold text-blue-950 md:text-2xl">
            Kurucu Üyelerimiz
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
            Derneğimizin kuruluşunda omuz veren gönüllülerimiz.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {founders.map((p) => (
              <PersonCard
                key={p.name + p.imageUrl}
                person={p}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ))}
          </div>
        </section>

        <p className="mt-12 text-center text-xs text-slate-500">
          Fotoğraflar ve isimler temsilidir; gerçek yönetim bilgileri ve görselleriyle
          güncellenebilir.
        </p>
      </div>
    </div>
  );
}
