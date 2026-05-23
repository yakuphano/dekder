import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Eleşkirt ve derneğimizle ilgili fotoğraflar.",
};

export const revalidate = 60;

async function loadImages() {
  try {
    return await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

const dateFmt = new Intl.DateTimeFormat("tr-TR", {
  dateStyle: "medium",
});

export default async function GaleriPage() {
  const images = await loadImages();

  return (
    <div className="mx-auto max-w-6xl px-3 py-10 sm:px-4 md:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--dekder-red)]">
          Galeri
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
          Eleşkirt&apos;ten kareler
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Dernek yönetiminin yüklediği fotoğraflar. Görseller yönetim panelinden dosya olarak
          eklenir.
        </p>
      </header>

      {images.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-600">
          Henüz galeride görsel yok.
        </p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img) => (
            <li
              key={img.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element -- harici / çeşitli kaynak URL'leri */}
                <img
                  src={img.imageUrl}
                  alt={img.caption ?? "Galeri görseli"}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="border-t border-slate-100 px-4 py-3">
                {img.caption ? (
                  <p className="text-sm font-medium text-slate-900">{img.caption}</p>
                ) : (
                  <p className="text-sm text-slate-500">Açıklama yok</p>
                )}
                <p className="mt-1 text-xs text-slate-400">{dateFmt.format(img.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
