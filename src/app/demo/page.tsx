import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { TrustEntityCheckDemo } from "@/components/TrustEntityCheckDemo";

export const metadata = {
  title: "Demo | TrustxVerify",
  description: "DEMO: Entity legitimacy check with sample data.",
};

export default function DemoPage() {
  return (
    <main className="pb-32 pt-6 sm:pt-12 lg:pt-16">
      <SubpageVisual variant="demo" />
      <section className="mx-auto max-w-3xl px-6 py-8 sm:px-8">
        <h1 className="text-3xl font-semibold text-white">Entity check pilot</h1>
        <p className="mt-3 text-white/70">
          Sample entities only. Not a live fraud database or legal determination.
        </p>
        <TrustEntityCheckDemo />
        <Link href="/" className="mt-8 inline-flex text-sm text-cyan-300 hover:underline">
          ← Home
        </Link>
      </section>
    </main>
  );
}
