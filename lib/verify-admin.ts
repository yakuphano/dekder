import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, getAdminSessionSecret } from "@/lib/admin-session";

export async function verifyAdminCookie(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE_NAME)?.value === getAdminSessionSecret();
}
