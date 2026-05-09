/** HTTP-only cookie ile admin oturumu (prototip). Üretimde güçlü bir secret kullanın. */
export const ADMIN_COOKIE_NAME = "dekder_admin_session";

export function getAdminSessionSecret(): string {
  return process.env.ADMIN_SESSION_TOKEN ?? "dekder-admin-prototype-token-2026";
}
