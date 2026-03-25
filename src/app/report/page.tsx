"use client";

import { useState } from "react";

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      entityDisplayName: form.get("entityDisplayName"),
      entityIdentifier: form.get("entityIdentifier"),
      entityType: form.get("entityType"),
      reportType: form.get("reportType"),
      description: form.get("description"),
      evidenceUrl: form.get("evidenceUrl"),
      reporterEmail: form.get("reporterEmail"),
    };

    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Submission failed. Please try again.');
      return;
    }
    
    setSubmitted(true);
    setError(null);
    e.currentTarget.reset();
  }

  return (
    <main className="pb-24 pt-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Fraud intelligence input</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Submit a report</h1>
        <p className="mt-4 max-w-2xl text-white/65">
          Add scam reports, suspicious activity, freight forwarding abuse, chargeback abuse,
          or other legitimacy concerns to the TrustxVerify intelligence layer.
        </p>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-emerald-300">
            Report submitted successfully.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input
            name="entityDisplayName"
            placeholder="Entity display name"
            className="h-12 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none placeholder:text-white/30"
          />
          <input
            name="entityIdentifier"
            placeholder="Email, username, address, phone..."
            required
            className="h-12 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none placeholder:text-white/30"
          />
          <select
            name="entityType"
            required
            className="h-12 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none"
          >
            <option value="person">Person</option>
            <option value="business">Business</option>
            <option value="address">Address</option>
          </select>
          <input
            name="reportType"
            placeholder="chargeback abuse / scam / counterfeit / freight forwarding..."
            required
            className="h-12 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none placeholder:text-white/30"
          />
          <input
            name="evidenceUrl"
            placeholder="Evidence URL (optional)"
            className="h-12 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none placeholder:text-white/30 md:col-span-2"
          />
          <input
            name="reporterEmail"
            placeholder="Your email (optional)"
            className="h-12 rounded-2xl border border-white/10 bg-slate-950/60 px-4 text-white outline-none placeholder:text-white/30 md:col-span-2"
          />
          <textarea
            name="description"
            placeholder="Describe what happened..."
            required
            className="min-h-40 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-white outline-none placeholder:text-white/30 md:col-span-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="h-12 rounded-2xl bg-cyan-400 px-5 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60 md:col-span-2"
          >
            {loading ? "Submitting..." : "Submit report"}
          </button>
        </form>
      </div>
    </main>
  );
}
