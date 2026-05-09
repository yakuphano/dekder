import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = {
  title: "Giriş",
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-600/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-950 shadow-lg ring-2 ring-red-600/30">
            <Shield className="h-8 w-8" aria-hidden />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            Yönetim girişi
          </h1>
          <p className="mt-3 text-sm font-medium text-blue-100/90">
            DEKDER dernek paneline güvenli erişim
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
