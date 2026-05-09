"use client";

import { useActionState } from "react";
import { submitMembership, type MembershipFormState } from "@/app/actions/membership";

const initial: MembershipFormState = {};

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20";

export function MembershipForm() {
  const [state, formAction, pending] = useActionState(submitMembership, initial);

  return (
    <div className="relative mx-auto max-w-xl">
      {pending ? (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm"
          aria-live="polite"
        >
          <p className="rounded-full bg-blue-950 px-4 py-2 text-sm font-medium text-white shadow-lg">
            Kaydediliyor…
          </p>
        </div>
      ) : null}

      <form action={formAction} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {state?.ok ? (
          <p
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          >
            Başvurunuz alındı. En kısa sürede sizinle iletişime geçilecektir.
          </p>
        ) : null}
        {state?.error ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
          >
            {state.error}
          </p>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-blue-950">
            Ad
            <input required name="name" autoComplete="given-name" className={fieldClass} />
          </label>
          <label className="block text-sm font-medium text-blue-950">
            Soyad
            <input
              required
              name="surname"
              autoComplete="family-name"
              className={fieldClass}
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-blue-950">
          Telefon
          <input
            required
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-medium text-blue-950">
          E-posta
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
          />
        </label>

        <label className="block text-sm font-medium text-blue-950">
          Doğum yeri
          <input required name="birthplace" autoComplete="off" className={fieldClass} />
        </label>

        <label className="block text-sm font-medium text-blue-950">
          Meslek
          <input required name="profession" autoComplete="organization-title" className={fieldClass} />
        </label>

        <label className="block text-sm font-medium text-blue-950">
          Açık adres
          <textarea
            required
            name="address"
            rows={4}
            autoComplete="street-address"
            className={fieldClass}
          />
        </label>

        <button
          type="submit"
          disabled={pending || state?.ok}
          className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Gönderiliyor…" : "Başvuruyu gönder"}
        </button>
      </form>
    </div>
  );
}
