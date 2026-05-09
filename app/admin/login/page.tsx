import type { Metadata } from "next";
import { Shield } from "lucide-react";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = {
  title: "Giriş",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-950 text-white shadow-lg">
            <Shield className="h-7 w-7" aria-hidden />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-blue-950">
            Yönetim girişi
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            DEKDER dernek paneline erişmek için oturum açın.
          </p>
        </div>
        <AdminLoginForm />
        <p className="mt-6 text-center text-xs text-slate-500">
          Prototip: kullanıcı adı <code className="rounded bg-slate-200 px-1">admin</code>, şifre{" "}
          <code className="rounded bg-slate-200 px-1">dekder2026</code>
        </p>
      </div>
    </div>
  );
}
