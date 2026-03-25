export default function RequestReceivedPage() {
  return (
    <main className="pb-32 pt-6 sm:pt-12 lg:pt-16">
      <section className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-12 shadow-2xl shadow-cyan-950/30 sm:px-8 sm:py-16">
        <div className="text-center">
          <h1 className="text-[2.5rem] font-semibold leading-tight text-white sm:text-5xl">
            Request received
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-white/70">
            Thank you for your submission. Our team will review it shortly and contact
            you if we need any additional information.
          </p>
          
          <div className="mt-10">
            <a
              href="/"
              className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Return home
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
