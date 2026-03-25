import Link from "next/link";
import { ShieldCheck, Search, Flag, Network } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Universal trust scoring",
    body: "Score buyers, sellers, businesses, and addresses across fragmented commerce channels.",
  },
  {
    icon: Search,
    title: "Search before you transact",
    body: "Run quick trust checks on names, emails, usernames, phone numbers, and addresses.",
  },
  {
    icon: Flag,
    title: "Fraud reporting loop",
    body: "Submit scam reports and evidence to build a living intelligence layer around bad actors.",
  },
  {
    icon: Network,
    title: "Graph-driven intelligence",
    body: "Link entities across platforms, addresses, and signals to identify suspicious clusters.",
  },
];

export default function HomePage() {
  return (
    <main className="pb-24 pt-10">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-16 shadow-2xl shadow-cyan-950/30">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
          The trust layer for global commerce
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">
          Verify who you are dealing with before money, inventory, or risk moves.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
          TrustxVerify gives buyers, sellers, operators, and platforms a real-time way
          to assess legitimacy across marketplaces, commerce channels, and transaction surfaces.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/search"
            className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Search trust records
          </Link>
          <Link
            href="/report"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Report fraud
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="inline-flex rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                <Icon size={22} />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">{feature.body}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-3">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Why now</p>
          <h3 className="mt-3 text-3xl font-semibold text-white">
            Reputation is siloed. Fraud is portable. Trust must become infrastructure.
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-white/70">
            Today, bad actors reset identities, move between platforms, exploit freight forwarding,
            abuse chargebacks, and hide behind fragmented data. TrustxVerify becomes the cross-platform
            verification and intelligence layer commerce has been missing.
          </p>
        </div>

        <div className="rounded-[1.75rem] border border-cyan-400/20 bg-cyan-400/10 p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Initial wedge</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Search + reports + scoring
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/75">
            Launch a searchable trust database and fraud reporting flow now, then layer Chrome
            extension overlays and API scoring on top.
          </p>
        </div>
      </section>
    </main>
  );
}
