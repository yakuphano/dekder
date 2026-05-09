import Link from "next/link";
import { ArrowRight, Mail, Users, Wallet } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function loadStats() {
  try {
    const [memberCount, donationAgg, unreadCount] = await Promise.all([
      prisma.member.count(),
      prisma.donation.aggregate({ _sum: { amount: true } }),
      prisma.feedback.count({ where: { isRead: false } }),
    ]);
    return {
      memberCount,
      totalDonationsTl: donationAgg._sum.amount ?? 0,
      unreadMessages: unreadCount,
    };
  } catch {
    return { memberCount: 0, totalDonationsTl: 0, unreadMessages: 0 };
  }
}

const money = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

export default async function AdminDashboardPage() {
  const { memberCount, totalDonationsTl, unreadMessages } = await loadStats();

  const cards = [
    {
      title: "Toplam üye sayısı",
      value: String(memberCount),
      href: "/admin/uyeler",
      icon: Users,
      accent: "border-l-blue-600",
    },
    {
      title: "Toplam bağış (TL)",
      value: money.format(totalDonationsTl),
      href: "/admin/bagislar",
      icon: Wallet,
      accent: "border-l-red-600",
    },
    {
      title: "Okunmamış mesajlar",
      value: String(unreadMessages),
      href: "/admin/mesajlar",
      icon: Mail,
      accent: "border-l-amber-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Dernek verilerinin özeti — salt okunur görünüm.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className={`group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md ${c.accent} border-l-4`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="rounded-lg bg-slate-100 p-2 text-blue-950">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-red-600" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {c.title}
              </p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{c.value}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
