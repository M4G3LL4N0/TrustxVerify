import Link from "next/link";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { ProcessFlowSection } from "@/components/ProcessFlowSection";
import { HeroProductPanel } from "@/components/HeroProductPanel";
import { TrustStrip } from "@/components/TrustStrip";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Fingerprint,
  GitBranch,
  Globe2,
  Landmark,
  PackageCheck,
  Search,
  ShieldCheck,
} from "lucide-react";

const useCases = [
  "Marketplace sellers",
  "Shopify operators",
  "eBay stores",
  "Facebook Marketplace users",
  "Freight and logistics teams",
  "Fraud operations teams",
];

const steps = [
  {
    title: "Search",
    body: "Look up a person, business, marketplace account, or address before a transaction.",
    icon: Search,
  },
  {
    title: "Score",
    body: "Translate pending reports, reviewed abuse signals, chargebacks, and address risk into a legitimacy score.",
    icon: Fingerprint,
  },
  {
    title: "Connect",
    body: "Link entities across platforms so risk cannot reset by moving from one marketplace to another.",
    icon: GitBranch,
  },
];

const signals = [
  "Reviewed fraud reports",
  "Pending community reports",
  "Dismissed false positives",
  "Chargeback abuse",
  "Freight forwarding patterns",
  "Suspicious address reuse",
  "Cross-marketplace identifiers",
  "Business and account legitimacy",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070d] text-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <TrustStrip />
        </div>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-12">
        <div className="absolute inset-x-6 top-10 -z-0 h-[560px] border border-cyan-300/10 bg-[linear-gradient(90deg,rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
        <div className="relative z-10 grid min-h-[650px] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
              The trust layer for global commerce
            </p>
            <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-tight sm:text-7xl">
              Verify who you are dealing with before money, inventory, or risk moves.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              Reputation is siloed. Fraud is portable. TrustxVerify builds a universal commerce trust graph for buyers, sellers, businesses, marketplace accounts, and addresses.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Search trust graph
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/15"
              >
                Entity check demo
              </Link>
              <Link
                href="/report"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:border-white/30"
              >
                Report fraud signal
                <AlertTriangle className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-950/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">Entity risk brief</p>
                <h2 className="mt-2 text-xl font-semibold">Marketplace account</h2>
              </div>
              <ShieldCheck className="h-6 w-6 text-cyan-300" />
            </div>
            <div className="grid gap-4 py-5 sm:grid-cols-3">
              <div className="border border-emerald-300/20 bg-emerald-300/10 p-4">
                <p className="text-xs text-emerald-200/70">Trust score</p>
                <p className="mt-2 text-4xl font-semibold text-emerald-200">742</p>
              </div>
              <div className="border border-amber-300/20 bg-amber-300/10 p-4">
                <p className="text-xs text-amber-200/70">Pending</p>
                <p className="mt-2 text-4xl font-semibold text-amber-200">2</p>
              </div>
              <div className="border border-cyan-300/20 bg-cyan-300/10 p-4">
                <p className="text-xs text-cyan-200/70">Links</p>
                <p className="mt-2 text-4xl font-semibold text-cyan-200">6</p>
              </div>
            </div>
            <div className="space-y-3 border-t border-white/10 pt-5 text-sm text-white/70">
              <p className="flex items-center gap-3"><PackageCheck className="h-4 w-4 text-cyan-300" /> Cross-marketplace account signal detected</p>
              <p className="flex items-center gap-3"><Landmark className="h-4 w-4 text-cyan-300" /> Payment dispute history under review</p>
              <p className="flex items-center gap-3"><Globe2 className="h-4 w-4 text-cyan-300" /> Address connection mapped to prior report</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-red-300/80">Problem</p>
            <h2 className="mt-3 text-3xl font-semibold">Marketplace trust breaks at the platform boundary.</h2>
          </div>
          <p className="text-lg leading-8 text-white/68">
            Bad actors can reset identities across eBay, Facebook Marketplace, Shopify, Craigslist, freight forwarding addresses, and private checkout flows. Sellers and buyers need a shared legitimacy layer before transactions happen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article key={step.title} className="border border-white/10 bg-white/[0.035] p-6">
                <Icon className="h-6 w-6 text-cyan-300" />
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/64">{step.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Trust signals</p>
          <h2 className="mt-3 text-3xl font-semibold">A FICO-like legitimacy score for commerce risk.</h2>
          <p className="mt-4 leading-7 text-white/62">
            The MVP keeps claims evidence-led: search, report, moderate, rescore, and expose the reasons behind each score.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {signals.map((signal) => (
            <div key={signal} className="border border-white/10 bg-slate-950/55 p-4 text-sm text-white/72">
              {signal}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="border border-white/10 bg-white/[0.035] p-8">
            <Building2 className="h-7 w-7 text-cyan-300" />
            <h2 className="mt-5 text-3xl font-semibold">Built for the operators already carrying transaction risk.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {useCases.map((useCase) => (
                <p key={useCase} className="border border-white/10 bg-slate-950/50 p-3 text-sm text-white/68">
                  {useCase}
                </p>
              ))}
            </div>
          </div>
          <div className="border border-cyan-300/20 bg-cyan-300/10 p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/80">Platform vision</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Search, report, score, and connect risk signals across marketplaces.</h2>
            <p className="mt-4 leading-7 text-cyan-50/72">
              The future surface is an API, Chrome extension, and enterprise graph layer. The current MVP proves the trust workflow: intake, moderation, scoring, and entity intelligence.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/search" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950">
                Start search
              </Link>
              <Link href="/report" className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white">
                Submit report
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6"><HeroProductPanel /></section>
      <ProcessFlowSection />
    <MarketingGraphicsStack />
    </main>
  );
}
