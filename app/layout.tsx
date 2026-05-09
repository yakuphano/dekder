import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import { ADMIN_COOKIE_NAME, getAdminSessionSecret } from "@/lib/admin-session";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DEKDER | Dünya Eleşkirt Kültür ve Dayanışma Derneği",
    template: "%s | DEKDER",
  },
  description:
    "Eleşkirt kültürünü yaşatmak, dayanışmayı güçlendirmek ve toplumsal fayda üretmek için DEKDER yanınızda.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE_NAME)?.value;
  const isAdminSession = token === getAdminSessionSecret();

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <SiteChrome isAdminSession={isAdminSession}>{children}</SiteChrome>
      </body>
    </html>
  );
}
