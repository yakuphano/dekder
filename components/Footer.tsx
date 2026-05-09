import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/yonetim", label: "Yönetim" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/eleskirt", label: "Eleşkirt" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/uye-ol", label: "Üye Ol" },
  { href: "/bagis", label: "Bağış Yap" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-blue-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="DEKDER logosu"
              width={56}
              height={56}
              className="h-14 w-14 rounded-lg border border-white/20 object-cover"
            />
            <span className="font-serif text-xl font-bold tracking-tight text-white">
              DEKDER
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-300">
            Dünya Eleşkirt Kültür ve Dayanışma Derneği; kültürel mirası yaşatmak,
            dayanışmayı güçlendirmek ve toplumsal fayda üretmek için çalışır.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Hızlı linkler
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition hover:text-white hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            İletişim
          </h2>
          <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-slate-200">
            <p>
              Örnek Mah. Dayanışma Sok. No: 1
              <br />
              Eleşkirt / Ağrı
            </p>
            <p>
              <a className="hover:text-white hover:underline" href="tel:+904762000000">
                +90 (476) 200 00 00
              </a>
            </p>
            <p>
              <a
                className="hover:text-white hover:underline"
                href="mailto:info@dekder.org"
              >
                info@dekder.org
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-4 text-center text-xs text-slate-400">
          <span>Copyright © 2026 DEKDER</span>
          <span className="text-slate-600/50" aria-hidden>
            ·
          </span>
          <Link
            href="/admin/login"
            className="text-[10px] font-medium tracking-wide text-slate-500/70 transition hover:text-slate-400"
          >
            Yönetim
          </Link>
        </div>
      </div>
    </footer>
  );
}
