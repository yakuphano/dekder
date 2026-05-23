/** HTTP-only cookie ile admin oturumu. Üretimde `ADMIN_SESSION_TOKEN` ile güçlü bir değer verin. */
export const ADMIN_COOKIE_NAME = "dekder_admin_session";

export function getAdminSessionSecret(): string {
  return process.env.ADMIN_SESSION_TOKEN ?? "3504";
}
