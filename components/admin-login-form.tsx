"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { adminLogin, type AdminLoginState } from "@/app/actions/admin-auth";

const initial: AdminLoginState = {};

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(adminLogin, initial);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl ring-1 ring-blue-950/5"
    >
      {state?.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {state.error}
        </p>
      ) : null}

      <div>
        <label
          htmlFor="admin-password"
          className="block text-sm font-semibold text-blue-950"
        >
          Yönetim şifresi
        </label>
        <p className="mt-1 text-xs text-slate-500">Giriş anahtarınızı girin.</p>
        <div className="relative mt-3">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            disabled={pending}
            placeholder="••••••••••••"
            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 py-3 pl-4 pr-12 text-slate-900 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-blue-900 focus:bg-white focus:ring-2 focus:ring-blue-900/15 disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            disabled={pending}
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-blue-950 disabled:opacity-50"
            aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden />
            ) : (
              <Eye className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-red-600 px-4 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-red-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Giriş yapılıyor…" : "Panele giriş yap"}
      </button>
    </form>
  );
}
