"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LayoutDashboard, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/eleskirt", label: "Eleşkirt" },
  { href: "/galeri", label: "Galeri" },
  { href: "/koylerimiz", label: "Köylerimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/yonetim", label: "Yönetim" },
  { href: "/belediye-baskanlari", label: "Belediye Başkanlarımız" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/iletisim", label: "İletişim" },
];

const navLinkClass =
  "whitespace-nowrap rounded-md px-1 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-[var(--dekder-mountain)] lg:px-1.5 xl:px-2";

const adminPanelLinkClass =
  "inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-900";

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        <header className="border-b border-slate-200 bg-slate-50 shadow-sm">
          <div className="flex w-full min-w-0 items-center justify-between gap-2 px-3 py-3 sm:px-4 lg:min-h-[4rem] lg:gap-3 lg:px-12">
            <div className="flex min-w-0 flex-1 items-center justify-start lg:w-[200px] lg:flex-none">
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

            {isAdminSession ? (
              <div className="hidden shrink-0 items-center lg:flex">
                <Link href="/admin" className={adminPanelLinkClass}>
                  <LayoutDashboard className="h-4 w-4 opacity-90" aria-hidden />
                  Yönetim paneli
                </Link>
              </div>
            ) : null}

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
              {isAdminSession ? (
                <Link
                  href="/admin"
                  title="Yönetim paneline git"
                  className={`${adminPanelLinkClass} lg:hidden whitespace-nowrap text-xs sm:text-sm`}
                >
                  <LayoutDashboard className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                  <span className="inline sm:hidden">Panel</span>
                  <span className="hidden sm:inline">Yönetim paneli</span>
                </Link>
              ) : null}
              <button
                type="button"
                className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] shrink-0 items-center justify-center rounded-lg text-slate-800 hover:bg-slate-100 lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-nav-drawer"
                aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[100] lg:hidden" id="mobile-nav-drawer" role="dialog" aria-modal="true" aria-label="Site menüsü">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]"
            aria-label="Menüyü kapat"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(100vw,20rem)] max-w-full flex-col bg-white shadow-2xl ring-1 ring-black/5">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <span className="text-sm font-bold text-blue-950">Menü</span>
              <button
                type="button"
                className="inline-flex h-11 min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
                onClick={() => setOpen(false)}
                aria-label="Kapat"
              >
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3" aria-label="Mobil menü">
              <ul className="flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-3 py-3.5 text-base font-medium leading-snug text-slate-800 active:bg-slate-100"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {isAdminSession ? (
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <Link
                    href="/admin"
                    className={`${adminPanelLinkClass} w-full justify-center py-3.5`}
                    onClick={() => setOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5 opacity-90" aria-hidden />
                    Yönetim paneli
                  </Link>
                </div>
              ) : null}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
