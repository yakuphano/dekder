"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export type FeedbackRowSerialized = {
  id: string;
  senderName: string;
  email: string;
  subjectType: string;
  message: string;
  isRead: boolean;
  createdAtIso: string;
};

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "short",
  timeStyle: "short",
});

type Props = {
  rows: FeedbackRowSerialized[];
};

export function AdminFeedbackTableBody({ rows }: Props) {
  const router = useRouter();

  return (
    <tbody className="divide-y divide-slate-100">
      {rows.map((f) => {
        const unread = !f.isRead;
        const href = `/admin/mesajlar/${f.id}`;
        const go = () => {
          void router.push(href);
        };
        return (
          <tr
            key={f.id}
            role="link"
            tabIndex={0}
            className={`cursor-pointer transition hover:bg-slate-50/80 ${
              unread ? "bg-amber-50/60 font-semibold text-slate-900" : ""
            }`}
            onClick={go}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                go();
              }
            }}
          >
            <td className="whitespace-nowrap px-4 py-3">
              {unread ? (
                <span className="rounded-full bg-red-600 px-2.5 py-1 text-xs font-bold text-white">
                  Okunmadı
                </span>
              ) : (
                <span className="text-xs font-normal text-slate-500">Okundu</span>
              )}
            </td>
            <td className={`whitespace-nowrap px-4 py-3 ${unread ? "font-bold" : ""}`}>
              {f.senderName}
            </td>
            <td
              className={`max-w-[200px] truncate px-4 py-3 ${unread ? "font-bold" : "text-slate-700"}`}
            >
              {f.email}
            </td>
            <td className="whitespace-nowrap px-4 py-3">
              <span
                className={
                  unread
                    ? "rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-950"
                    : "text-slate-600"
                }
              >
                {f.subjectType}
              </span>
            </td>
            <td
              className={`max-w-md truncate px-4 py-3 ${unread ? "font-bold" : "text-slate-600"}`}
              title={f.message}
            >
              {f.message}
            </td>
            <td
              className={`whitespace-nowrap px-4 py-3 ${unread ? "font-bold text-slate-800" : "text-slate-500"}`}
            >
              {dateFmt.format(new Date(f.createdAtIso))}
            </td>
            <td className="whitespace-nowrap px-4 py-3" onClick={(e) => e.stopPropagation()}>
              <Link
                href={href}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex text-sm font-semibold text-blue-800 underline-offset-2 hover:underline"
              >
                {unread ? "Oku" : "Aç"}
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
