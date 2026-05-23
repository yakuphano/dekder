import { prisma } from "@/lib/prisma";
import { AdminFeedbackTableBody } from "@/components/admin-feedback-table-body";

export const dynamic = "force-dynamic";

export default async function AdminMesajlarPage() {
  let items: Awaited<ReturnType<typeof prisma.feedback.findMany>> = [];
  try {
    items = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    items = [];
  }

  const rows = items.map((f) => ({
    id: f.id,
    senderName: f.senderName,
    email: f.email,
    subjectType: f.subjectType,
    message: f.message,
    isRead: f.isRead,
    createdAtIso: f.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Mesajlar
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Öneri, dilek ve şikayet kayıtları ({items.length}). Satıra tıklayın veya sağdaki{" "}
          <strong>Oku</strong> / <strong>Aç</strong> ile detayı açın.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Durum</th>
                <th className="px-4 py-3">Gönderen</th>
                <th className="px-4 py-3">E-posta</th>
                <th className="px-4 py-3">Konu</th>
                <th className="px-4 py-3">Mesaj</th>
                <th className="px-4 py-3">Tarih</th>
                <th className="px-4 py-3">İşlem</th>
              </tr>
            </thead>
            {items.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    Henüz mesaj yok.
                  </td>
                </tr>
              </tbody>
            ) : (
              <AdminFeedbackTableBody rows={rows} />
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
