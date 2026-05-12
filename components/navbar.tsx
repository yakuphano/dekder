"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/eleskirt", label: "Eleşkirt" },
  { href: "/koylerimiz", label: "Köylerimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/yonetim", label: "Yönetim" },
  { href: "/belediye-baskanlari", label: "Belediye Başkanlarımız" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/iletisim", label: "İletişim" },
];

/** Tek satır menü: text-sm üstüne çıkma, yatay padding minimum */
const navLinkClass =
  "whitespace-nowrap rounded-md px-1 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[var(--dekder-mountain)] lg:px-1.5 xl:px-2";

const ctaMember =
  "whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700";
const ctaDonate =
  "whitespace-nowrap rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-red-700";

export type NavbarProps = {
  isAdminSession?: boolean;
};

export function Navbar({ isAdminSession = false }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        <header className="border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <div className="flex w-full items-center justify-between gap-2 px-4 py-3 lg:min-h-[4rem] lg:gap-3 lg:px-12">
            <div className="flex w-[200px] flex-none items-center justify-start">
              <Link
                href="/"
                className="flex min-w-0 max-w-full items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <Image
                  src="/logo.jpg"
                  alt="DEKDER logosu"
                  width={48}
                  height={48}
                  className="h-10 w-10 shrink-0 rounded-lg border border-slate-200 object-cover shadow-sm sm:h-11 sm:w-11"
                  priority
                />
                <span className="truncate font-serif text-base font-bold tracking-tight text-[var(--dekder-mountain)] sm:text-lg lg:text-xl">
                  DEKDER
                </span>
              </Link>
            </div>

            <nav
              className="hidden min-w-0 flex-1 flex-nowrap justify-center lg:flex"
              aria-label="Ana menü"
            >
              <ul className="flex max-w-full flex-nowrap items-center justify-center gap-x-1 whitespace-nowrap lg:gap-x-1.5 xl:gap-x-2.5">
                {navItems.map((item) => (
                  <li key={item.href} className="shrink-0">
                    <Link href={item.href} className={navLinkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden w-[250px] flex-none items-center justify-end gap-2 lg:flex">
              <Link href="/uye-ol" className={ctaMember}>
                Üye Ol
              </Link>
              <Link href="/bagis" className={ctaDonate}>
                Bağış Yap
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 rounded-lg p-2 text-slate-800 hover:bg-slate-100 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {open ? (
            <div
              id="mobile-menu"
              className="border-t border-slate-200 bg-white lg:hidden"
            >
              <nav className="w-full space-y-1 px-4 py-4 lg:px-12" aria-label="Mobil menü">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-50"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
                  <Link
                    href="/uye-ol"
                    className={ctaMember}
                    onClick={() => setOpen(false)}
                  >
                    Üye Ol
                  </Link>
                  <Link
                    href="/bagis"
                    className={ctaDonate}
                    onClick={() => setOpen(false)}
                  >
                    Bağış Yap
                  </Link>
                </div>
              </nav>
            </div>
          ) : null}
        </header>
      </div>

      {isAdminSession ? (
        <div
          className="fixed bottom-0 left-0 right-0 z-[60] border-t border-white/10 bg-blue-950/98 shadow-[0_-2px_12px_rgba(15,23,42,0.25)] backdrop-blur-sm supports-[backdrop-filter]:bg-blue-950/95"
          role="navigation"
          aria-label="Yönetim kısayolu"
        >
          <Link
            href="/admin"
            className="inline-flex w-full max-w-6xl items-center justify-center gap-1 px-3 py-0.5 text-[10px] font-semibold leading-tight tracking-wide text-white/95 transition hover:bg-white/10 sm:text-[11px]"
          >
            <span className="select-none text-[9px] opacity-90 sm:text-[10px]" aria-hidden>
              ⚙️
            </span>
            Yönetim Paneli
          </Link>
        </div>
      ) : null}
    </>
  );
}
