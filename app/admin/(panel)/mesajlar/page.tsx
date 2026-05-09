import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "short",
  timeStyle: "short",
});

export default async function AdminMesajlarPage() {
  let items: Awaited<ReturnType<typeof prisma.feedback.findMany>> = [];
  try {
    items = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    items = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Mesajlar
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Öneri, dilek ve şikayet kayıtları ({items.length})
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3">Gönderen</th>
                <th className="px-4 py-3">E-posta</th>
                <th className="px-4 py-3">Konu</th>
                <th className="px-4 py-3">Mesaj</th>
                <th className="px-4 py-3">Tarih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    Henüz mesaj yok.
                  </td>
                </tr>
              ) : (
                items.map((f) => {
                  const unread = !f.isRead;
                  return (
                    <tr
                      key={f.id}
                      className={`hover:bg-slate-50/80 ${
                        unread ? "bg-amber-50/60 font-semibold text-slate-900" : ""
                      }`}
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
                        {dateFmt.format(f.createdAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
