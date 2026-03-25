"use client";

import { useState } from "react";
import type { SearchResult } from "@/lib/types";
import { ScoreCard } from "@/components/score-card";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

      if (!res.ok) {
        const data = await res.json().catch(() => ({})); // Gracefully handle JSON parse errors
        throw new Error(data.error || "Search failed.");
      }

      const { results } = await res.json();
      setResults(results ?? []);
    } catch (err: unknown) {
      console.error("Search error:", err);
      setResults([]);
      setError(
        err instanceof Error ? err.message : "Unable to complete search"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="pb-24 pt-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">
          Trust search
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Search any entity
        </h1>
        <p className="mt-4 max-w-2xl text-white/65">
          Search a person, business, marketplace username, email, phone number,
          or address.
        </p>

        <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-4 md:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search email, address, username, business..."
            className="h-14 flex-1 rounded-2xl border border-white/10 bg-slate-950/60 px-5 text-white outline-none placeholder:text-white/30"
          />
          <button
            type="submit"
            className="h-14 rounded-2xl bg-cyan-400 px-6 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
            disabled={loading || !query.trim()}
          >
            {loading ? "Searching..." : "Run search"}
          </button>
        </form>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
            {error}
          </div>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4">
        {results.length > 0 ? (
          results.map((result) => (
            <ScoreCard key={result.entity.id} result={result} />
          ))
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-white/10 p-8 text-white/45">
            No results yet. Try a seeded email, username, or address after running the SQL below.
          </div>
        )}
      </div>
    </main>
  );
}
