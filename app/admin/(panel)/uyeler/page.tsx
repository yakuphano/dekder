import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "short",
  timeStyle: "short",
});

export default async function AdminUyelerPage() {
  let members: Awaited<ReturnType<typeof prisma.member.findMany>> = [];
  try {
    members = await prisma.member.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    members = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Üyeler
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Üyelik başvuruları ({members.length} kayıt)
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
              <tr>
                <th className="px-4 py-3">Ad</th>
                <th className="px-4 py-3">Soyad</th>
                <th className="px-4 py-3">E-posta</th>
                <th className="px-4 py-3">Telefon</th>
                <th className="px-4 py-3">Doğum yeri</th>
                <th className="px-4 py-3">Meslek</th>
                <th className="px-4 py-3 min-w-[200px]">Adres</th>
                <th className="px-4 py-3">Kayıt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                    Henüz üye kaydı yok.
                  </td>
                </tr>
              ) : (
                members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                      {m.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                      {m.surname}
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-slate-700">
                      {m.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                      {m.phone}
                    </td>
                    <td className="max-w-[140px] truncate px-4 py-3 text-slate-600">
                      {m.birthplace}
                    </td>
                    <td className="max-w-[160px] truncate px-4 py-3 text-slate-600">
                      {m.profession}
                    </td>
                    <td className="max-w-[240px] truncate px-4 py-3 text-slate-600" title={m.address}>
                      {m.address}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                      {dateFmt.format(m.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-slate-500">
        Uzun adresler kısaltılır; tam metin için hücre üzerine gelin.
      </p>
    </div>
  );
}
