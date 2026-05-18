import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function ThankYouPage() {
  return (
    <main className="pb-32 pt-6 sm:pt-12 lg:pt-16">
      <SubpageVisual variant="default" />
      <section className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-12 shadow-2xl shadow-cyan-950/30 sm:px-8 sm:py-16">
        <div className="text-center">
          <h1 className="text-[2.5rem] font-semibold leading-tight text-white sm:text-5xl">
            You are on the waitlist
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/70">
            Thank you for joining the TrustxVerify waitlist. We will contact you when 
            early access is available in your region.
          </p>
          
          <div className="mt-10">
            <Link
              href="/"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Return home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
