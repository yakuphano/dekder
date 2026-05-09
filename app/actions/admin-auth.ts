"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, getAdminSessionSecret } from "@/lib/admin-session";

export type AdminLoginState = { error?: string };

const HARDCODED_USER = "admin";
const HARDCODED_PASS = "dekder2026";

export async function adminLogin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username !== HARDCODED_USER ||
    password !== HARDCODED_PASS
  ) {
    return { error: "Kullanıcı adı veya şifre hatalı." };
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE_NAME, getAdminSessionSecret(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function adminLogout() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}
