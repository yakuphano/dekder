"use client";

import { useActionState } from "react";
import { adminLogin, type AdminLoginState } from "@/app/actions/admin-auth";

const initial: AdminLoginState = {};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLogin, initial);

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"
    >
      {state?.error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.error}
        </p>
      ) : null}

      <label className="block text-sm font-medium text-blue-950">
        Kullanıcı adı
        <input
          name="username"
          required
          autoComplete="username"
          disabled={pending}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20 disabled:opacity-60"
        />
      </label>

      <label className="block text-sm font-medium text-blue-950">
        Şifre
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          disabled={pending}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 shadow-sm outline-none focus:border-blue-800 focus:ring-2 focus:ring-blue-800/20 disabled:opacity-60"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Giriş yapılıyor…" : "Giriş yap"}
      </button>
    </form>
  );
}
