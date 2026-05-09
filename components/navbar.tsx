"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/yonetim", label: "Yönetim" },
  { href: "/koylerimiz", label: "Köylerimiz" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/eleskirt", label: "Eleşkirt" },
  { href: "/iletisim", label: "İletişim" },
];

const navLinkClass =
  "rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[var(--dekder-mountain)]";

const ctaMember =
  "rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700";
const ctaDonate =
  "rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-red-700";

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
    <div className="sticky top-0 z-50">
      {isAdminSession ? (
        <div className="border-b border-white/10 bg-blue-950 text-center shadow-md">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white transition hover:bg-white/10 sm:text-sm"
          >
            <span className="select-none" aria-hidden>
              ⚙️
            </span>
            Yönetim Paneli
          </Link>
        </div>
      ) : null}

      <header className="border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex min-h-[4rem] max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/"
            className="flex min-w-0 shrink items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/logo.jpg"
              alt="DEKDER logosu"
              width={48}
              height={48}
              className="h-11 w-11 shrink-0 rounded-lg border border-slate-200 object-cover shadow-sm"
              priority
            />
            <span className="font-serif text-xl font-bold tracking-tight text-[var(--dekder-mountain)] sm:text-2xl">
              DEKDER
            </span>
          </Link>

          <nav
            className="hidden flex-1 justify-center md:flex"
            aria-label="Ana menü"
          >
            <ul className="flex flex-wrap items-center justify-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={navLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <Link href="/uye-ol" className={ctaMember}>
              Üye Ol
            </Link>
            <Link href="/bagis" className={ctaDonate}>
              Bağış Yap
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 rounded-lg p-2 text-slate-800 hover:bg-slate-100 md:hidden"
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
            className="border-t border-slate-200 bg-white md:hidden"
          >
            <nav
              className="mx-auto max-w-6xl space-y-1 px-4 py-4"
              aria-label="Mobil menü"
            >
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
  );
}
