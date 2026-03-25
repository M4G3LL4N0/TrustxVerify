import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TrustxVerify",
  description: "The trust layer for global commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto min-h-screen max-w-7xl px-6">
          <header className="flex items-center justify-between py-6">
            <Link href="/" className="text-lg font-semibold tracking-[0.18em] text-white">
              TRUSTXVERIFY
            </Link>
            <nav className="flex items-center gap-6 text-sm text-white/70">
              <Link href="/search" className="hover:text-white">Search</Link>
              <Link href="/report" className="hover:text-white">Report</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
