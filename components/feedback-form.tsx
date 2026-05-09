"use client";

import { useActionState } from "react";
import { submitFeedback, type FeedbackFormState } from "@/app/actions/feedback";

const initial: FeedbackFormState = {};

const subjects = [
  { value: "Öneri", label: "Öneri" },
  { value: "Dilek", label: "Dilek" },
  { value: "Şikayet", label: "Şikayet" },
  { value: "Diğer", label: "Diğer" },
];

const fieldClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20";

export function FeedbackForm() {
  const [state, formAction, pending] = useActionState(submitFeedback, initial);

  return (
    <div className="relative mx-auto max-w-xl">
      {pending ? (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm"
          aria-live="polite"
        >
          <p className="rounded-full bg-blue-950 px-4 py-2 text-sm font-medium text-white shadow-lg">
            Gönderiliyor…
          </p>
        </div>
      ) : null}

      <form action={formAction} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {state?.ok ? (
          <p
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          >
            Mesajınız kaydedildi. İlginiz için teşekkür ederiz.
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

        <label className="block text-sm font-medium text-blue-950">
          Ad Soyad
          <input required name="senderName" autoComplete="name" className={fieldClass} />
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
          Konu
          <select
            name="subjectType"
            defaultValue="Öneri"
            className={`${fieldClass} bg-white`}
          >
            {subjects.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-blue-950">
          Mesaj
          <textarea required name="message" rows={6} className={fieldClass} />
        </label>

        <button
          type="submit"
          disabled={pending || state?.ok}
          className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Gönderiliyor…" : "Mesajı gönder"}
        </button>
      </form>
    </div>
  );
}
