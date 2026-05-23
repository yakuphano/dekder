"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";

export function SiteChrome({
  children,
  isAdminSession = false,
}: {
  children: React.ReactNode;
  isAdminSession?: boolean;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }
  return (
    <>
      <Navbar isAdminSession={isAdminSession} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">{children}</div>
        <Footer />
      </div>
    </>
  );
}
