"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  PenTool,
  Users,
  Wallet,
} from "lucide-react";
import { adminLogout } from "@/app/actions/admin-auth";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/uyeler", label: "Üyeler", icon: Users },
  { href: "/admin/bagislar", label: "Bağışlar", icon: Wallet },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: Mail },
  { href: "/admin/duyurular", label: "Duyurular", icon: Megaphone },
  { href: "/admin/kose-yazilari", label: "Köşe Yazıları", icon: PenTool },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside className="flex w-full shrink-0 flex-col border-r border-slate-200 bg-blue-950 text-white md:min-h-screen md:w-64">
      <div className="border-b border-white/10 px-5 py-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
          DEKDER
        </p>
        <p className="mt-1 text-lg font-bold">Yönetim paneli</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {nav.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-white/15 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-white/10 p-3">
        <Link
          href="/"
          className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-white/15 hover:text-red-100"
        >
          <ExternalLink className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
          Siteyi Görüntüle
        </Link>
        <form action={adminLogout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-300 transition hover:bg-white/10 hover:text-red-200"
          >
            <LogOut className="h-5 w-5 shrink-0" aria-hidden />
            Çıkış Yap
          </button>
        </form>
      </div>
    </aside>
  );
}
