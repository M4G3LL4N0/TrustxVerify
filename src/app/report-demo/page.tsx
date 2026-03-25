import Link from "next/link";
import { ShieldCheck, AlertCircle, TrendingUp, ChevronLeft } from "lucide-react";

export default function ReportDemoPage() {
  return (
    <main className="pb-32 pt-6 sm:pt-12 lg:pt-16">
      <section className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-12 shadow-2xl shadow-cyan-950/30 sm:px-8 sm:py-16">
        <h1 className="text-[2rem] font-semibold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Fraud Detection Demo: Brand Pairing Analysis
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
          How TrustxVerify identified and prevented a sophisticated brand impersonation scam.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">Brand Pairing Detected</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/70">Legitimate Brand</p>
                <p className="mt-2 text-lg font-semibold text-white">BrandCo</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/70">Imposter Brand</p>
                <p className="mt-2 text-lg font-semibold text-white">BrandCoGlobal</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">Trust Scores</h2>
            <div className="mt-4 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/70">Legitimate Brand</p>
                <p className="mt-2 text-lg font-semibold text-white">Trust Score: 92/100</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/70">Imposter Brand</p>
                <p className="mt-2 text-lg font-semibold text-white">Trust Score: 18/100</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-white">Opportunity Summary</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Our system detected a suspicious brand pairing where 'BrandCoGlobal' was attempting
              to impersonate the legitimate 'BrandCo' across multiple platforms. The imposter brand
              showed patterns of fraudulent activity including:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-white/70">
              <li>Domain registration anomalies</li>
              <li>Social media account cloning</li>
              <li>Payment processor mismatches</li>
              <li>Negative trust signals from 3rd party sources</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">Why It Works</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              TrustxVerify's cross-platform intelligence layer connects signals across domains,
              social media, payment processors, and reputation systems to detect sophisticated
              brand impersonation attempts.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">Risks Identified</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-white/70">
              <li>Customer confusion</li>
              <li>Brand reputation damage</li>
              <li>Potential financial losses</li>
              <li>Regulatory compliance issues</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">Next Steps</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-white/70">
              <li>Issue takedown notices</li>
              <li>Monitor for new imposter accounts</li>
              <li>Educate customers</li>
              <li>Implement brand protection measures</li>
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">Take Action</h2>
            <Link
              href="/"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <ChevronLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
