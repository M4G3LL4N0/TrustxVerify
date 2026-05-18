"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/search", label: "Search" },
  { href: "/report", label: "Report" },
  { href: "/report-demo", label: "Demo report" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070d]/88 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.22em] text-white" onClick={() => setOpen(false)}>
          TrustxVerify
        </Link>

        <div className="hidden items-center gap-1 text-sm text-white/68 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 hover:bg-white/10 hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/search"
            className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white"
            onClick={() => setOpen(false)}
          >
            Search
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white"
            aria-expanded={open}
            aria-controls="trustxverify-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <nav
          id="trustxverify-mobile-nav"
          className="border-t border-white/10 px-4 py-3 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 text-sm text-white/75">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2.5 hover:bg-white/10 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <p className="px-3 pt-1 text-[11px] leading-relaxed text-white/45">
              Legitimacy scores are risk signals for review — not legal findings, guarantees, or automated enforcement decisions.
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
