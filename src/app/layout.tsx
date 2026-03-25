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
      <body className="flex flex-col min-h-screen">
        <div className="mx-auto flex-1 w-full max-w-7xl px-6">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-20 top-[-60%] h-[1200px] w-[1200px] rounded-full bg-cyan-950/20 blur-[160px]" />
          </div>
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

        <footer className="mt-24 border-t border-white/10 bg-gradient-to-b from-transparent to-black/20 py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Link href="/" className="text-base font-semibold tracking-[0.18em] text-white">
                TRUSTXVERIFY
              </Link>
              <div className="flex gap-4 text-sm text-white/50">
                <Link href="/terms" className="hover:text-white">Terms</Link>
                <Link href="/privacy" className="hover:text-white">Privacy</Link>
                <Link href="/contact" className="hover:text-white">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
