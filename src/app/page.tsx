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
    <main className="pb-32 pt-6 sm:pt-12 lg:pt-16">
      <section className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-12 shadow-2xl shadow-cyan-950/30 sm:px-8 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
          The trust layer for global commerce
        </p>
        <h1 className="mt-6 max-w-4xl text-[2.5rem] font-semibold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
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
          <Link
            href="/report-demo"
            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            See demo
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-6">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">How It Works</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
          TrustxVerify's three-step process makes verifying entities simple and effective.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
              1
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">Search</h3>
            <p className="mt-2 text-sm text-white/70">
              Enter any name, email, username, phone number, or address to check trustworthiness.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
              2
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">Analyze</h3>
            <p className="mt-2 text-sm text-white/70">
              We cross-reference signals across platforms to calculate a comprehensive trust score.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
              3
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">Act</h3>
            <p className="mt-2 text-sm text-white/70">
              Make informed decisions with clear risk assessments and fraud pattern insights.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 transition-all hover:scale-[1.02] hover:border-white/20 hover:bg-white/[0.05]"
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
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Trust Score Explained</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            How we calculate trustworthiness
          </h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-medium text-cyan-300">
                1
              </div>
              <div>
                <p className="font-medium text-white">Entity Verification</p>
                <p className="mt-1 text-sm text-white/65">Cross-platform identity validation</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/5">
                  <div className="h-full w-[85%] rounded-full bg-cyan-400/50" />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-medium text-cyan-300">
                2
              </div>
              <div>
                <p className="font-medium text-white">Fraud Pattern Detection</p>
                <p className="mt-1 text-sm text-white/65">Analyzing suspicious behavior clusters</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/5">
                  <div className="h-full w-[70%] rounded-full bg-cyan-400/50" />
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-medium text-cyan-300">
                3
              </div>
              <div>
                <p className="font-medium text-white">Community Reports</p>
                <p className="mt-1 text-sm text-white/65">Verified fraud reports from users</p>
                <div className="mt-2 h-1.5 w-full rounded-full bg-white/5">
                  <div className="h-full w-[60%] rounded-full bg-cyan-400/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Trust Score Explained</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            How we calculate trustworthiness
          </h3>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-medium text-cyan-300">
                1
              </div>
              <div>
                <p className="font-medium text-white">Entity Verification</p>
                <p className="mt-1 text-sm text-white/65">Cross-platform identity validation</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-medium text-cyan-300">
                2
              </div>
              <div>
                <p className="font-medium text-white">Fraud Pattern Detection</p>
                <p className="mt-1 text-sm text-white/65">Analyzing suspicious behavior clusters</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-medium text-cyan-300">
                3
              </div>
              <div>
                <p className="font-medium text-white">Community Reports</p>
                <p className="mt-1 text-sm text-white/65">Verified fraud reports from users</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7">
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

      <section className="mx-auto mt-24 max-w-7xl px-6">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Trust Score Examples</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
          See how TrustxVerify helps identify trustworthy entities and flag potential risks in real-world scenarios.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-300">
                Trust Score: 92
              </div>
              <div className="text-xs text-white/50">Verified Seller</div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">Jane Doe</h3>
            <p className="mt-2 text-sm text-white/70">
              Established eBay seller with 5+ years history, 98% positive feedback across 1,200+ transactions.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
              <span>Platforms:</span>
              <span className="text-white">eBay, Shopify</span>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300">
                Trust Score: 65
              </div>
              <div className="text-xs text-white/50">Caution Advised</div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">John Smith</h3>
            <p className="mt-2 text-sm text-white/70">
              Multiple unverified accounts across platforms, recent chargeback disputes.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
              <span>Platforms:</span>
              <span className="text-white">Facebook Marketplace, Craigslist</span>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-full bg-red-400/10 px-3 py-1 text-xs font-medium text-red-300">
                Trust Score: 28
              </div>
              <div className="text-xs text-white/50">High Risk</div>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-white">XYZ Trading</h3>
            <p className="mt-2 text-sm text-white/70">
              Multiple fraud reports, fake reviews detected, and suspicious IP activity.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
              <span>Platforms:</span>
              <span className="text-white">Amazon, Etsy</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Join the Trust Revolution
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/70">
            Be among the first to access TrustxVerify's comprehensive trust infrastructure. 
            Get early access to our API, Chrome extension, and premium features.
          </p>
          <form action="/api/waitlist" method="POST" className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white placeholder-white/50 focus:border-white/30 focus:outline-none sm:w-64"
            />
            <button
              type="submit"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Join Waitlist
            </button>
          </form>
          <p className="mt-4 text-sm text-white/50">
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </section>
    </main>
  );
}
