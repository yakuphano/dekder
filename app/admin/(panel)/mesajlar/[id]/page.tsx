import Link from "next/link";
import { notFound } from "next/navigation";
import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "long",
  timeStyle: "short",
});

type Props = { params: Promise<{ id: string }> };

export default async function AdminMesajDetayPage({ params }: Props) {
  const { id } = await params;

  let f: {
    id: string;
    senderName: string;
    email: string;
    subjectType: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
  };

  try {
    f = await prisma.feedback.update({
      where: { id },
      data: { isRead: true },
    });
  } catch {
    notFound();
  }

  after(() => {
    revalidatePath("/admin/mesajlar");
    revalidatePath("/admin");
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/mesajlar"
          className="text-sm font-semibold text-blue-950 hover:text-red-600 hover:underline"
        >
          ← Mesaj listesine dön
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-blue-950 md:text-3xl">
          Mesaj detayı
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Bu sayfa açıldığında mesaj <strong>okundu</strong> olarak işaretlendi.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <dl className="grid gap-4 text-sm">
          <div>
            <dt className="font-semibold text-slate-500">Gönderen</dt>
            <dd className="mt-1 text-base text-slate-900">{f.senderName}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-500">E-posta</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${f.email}`}
                className="text-base font-medium text-blue-800 underline-offset-2 hover:underline"
              >
                {f.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-500">Konu</dt>
            <dd className="mt-1">
              <span className="rounded-md bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-950">
                {f.subjectType}
              </span>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-500">Tarih</dt>
            <dd className="mt-1 text-slate-800">{dateFmt.format(f.createdAt)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-500">Mesaj</dt>
            <dd className="mt-2 whitespace-pre-wrap rounded-xl border border-slate-100 bg-slate-50 p-4 text-base leading-relaxed text-slate-800">
              {f.message}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
