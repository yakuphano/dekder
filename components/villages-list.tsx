"use client";

import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import type { VillageRecord } from "@/lib/villages";

type Props = {
  villages: VillageRecord[];
};

function lowerTr(s: string): string {
  return s.toLocaleLowerCase("tr-TR");
}

function matchesQuery(v: VillageRecord, q: string): boolean {
  if (!q.trim()) return true;
  const n = lowerTr(q.trim());
  const hay = lowerTr(
    [v.nameTr, v.nameKu, v.belde ?? "", v.belde ? `belde ${v.belde}` : "merkez"].join(
      " ",
    ),
  );
  return hay.includes(n);
}

export function VillagesList({ villages: all }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => all.filter((v) => matchesQuery(v, query)),
    [all, query],
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Köy adı ile ara (Türkçe veya Kürtçe)…"
          className="w-full rounded-xl border border-slate-300 bg-white py-3.5 pl-12 pr-4 text-slate-900 shadow-sm outline-none ring-blue-950/0 transition placeholder:text-slate-400 focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20"
          autoComplete="off"
          spellCheck={false}
          aria-label="Köy ara"
        />
      </div>

      <p className="text-sm text-slate-600">
        <strong className="text-blue-950">{filtered.length}</strong> köy
        {query.trim() ? " eşleşti" : ` listeleniyor (toplam ${all.length})`}.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:hidden">
        {filtered.map((v) => (
          <article
            key={v.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
                Köy
              </span>
              <span className="rounded-full bg-blue-950/10 px-2.5 py-0.5 text-xs font-semibold text-blue-950">
                {v.belde ? `${v.belde} Beldesi` : "Merkez"}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-slate-900">{v.nameTr}</h3>
            {v.nameKu ? (
              <p className="mt-1 text-sm font-medium text-red-700">{v.nameKu}</p>
            ) : (
              <p className="mt-1 text-xs text-slate-400">Kürtçe adı kaynakta yok</p>
            )}
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-blue-950 text-xs font-semibold uppercase tracking-wide text-white">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Türkçe</th>
                <th className="px-4 py-3">Kürtçe</th>
                <th className="px-4 py-3">Belde / merkez</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v, i) => (
                <tr
                  key={v.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50/90"}
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-500">{v.id}</td>
                  <td className="px-4 py-3 font-bold text-slate-900">{v.nameTr}</td>
                  <td className="px-4 py-3 font-medium text-red-700">
                    {v.nameKu || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-950/10 px-2.5 py-0.5 text-xs font-semibold text-blue-950">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {v.belde ? `${v.belde} Beldesi` : "Merkez"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center text-slate-600">
          Aramanızla eşleşen köy yok. Farklı bir anahtar kelime deneyin.
        </p>
      ) : null}
    </div>
  );
}
