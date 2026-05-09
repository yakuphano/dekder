import { redirect } from "next/navigation";

/** Eski URL uyumluluğu: /kurucular artık /yonetim adresine yönlendirilir. */
export default function KurucularLegacyRedirect() {
  redirect("/yonetim");
}
