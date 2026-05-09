import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";

export type HomeArticleItem = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorTitle: string;
  authorImageUrl: string | null;
};

function excerpt(text: string, max = 90): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

type Props = {
  articles: HomeArticleItem[];
};

export function HomeArticlesSidebar({ articles }: Props) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md lg:sticky lg:top-24 lg:self-start">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950 text-white">
          <PenLine className="h-4 w-4" aria-hidden />
        </span>
        <h2 className="text-lg font-bold text-blue-950">Köşe Yazılarımız</h2>
      </div>

      {articles.length === 0 ? (
        <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
          <p className="text-sm font-medium text-slate-700">Henüz köşe yazısı yok</p>
          <p className="mt-2 text-xs text-slate-500">
            Yeni yazılar yönetim panelinden eklendiğinde burada görünecek.
          </p>
        </div>
      ) : (
        <ul className="mt-5 space-y-4">
          {articles.map((a) => (
            <li key={a.id}>
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-sm">
                <div className="flex gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-blue-950/10 bg-slate-200">
                    {a.authorImageUrl ? (
                      <Image
                        src={a.authorImageUrl}
                        alt={`${a.authorName} profil fotoğrafı`}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900 to-blue-950 text-xs font-bold text-white">
                        {a.authorName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-blue-950">{a.authorName}</p>
                    <p className="truncate text-xs font-medium text-red-700">{a.authorTitle}</p>
                  </div>
                </div>
                <h3 className="mt-3 line-clamp-2 text-sm font-bold leading-snug text-slate-900">
                  {a.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {excerpt(a.content)}
                </p>
                <Link
                  href={`/kose-yazilari/${a.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  Devamını oku
                  <ArrowRight className="h-3 w-3" aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
