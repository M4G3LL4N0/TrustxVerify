import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrustxVerify | The trust layer for global commerce",
  description:
    "Universal legitimacy scoring for people, businesses, marketplace accounts, and addresses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
