import Link from "next/link";
import { Badge } from "@/components/badge";
import type { SearchResult } from "@/lib/types";

export function ScoreCard({ result }: { result: SearchResult }) {
  const score = result.score;

  return (
    <Link
      href={`/entity/${result.entity.id}`}
      className="block rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/30 hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">
            {result.entity.type}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            {result.entity.display_name}
          </h3>
          <p className="mt-1 text-sm text-white/55">{result.entity.identifier}</p>
          {result.entity.source_platform ? (
            <p className="mt-2 text-xs text-white/40">
              Source: {result.entity.source_platform}
            </p>
          ) : null}
        </div>

        {score ? (
          <div className="text-right">
            <p className="text-3xl font-bold text-white">{score.trust_score}</p>
            <div className="mt-2">
              <Badge variant={score.risk_level}>{score.risk_level} risk</Badge>
            </div>
          </div>
        ) : (
          <div className="text-right">
            <p className="text-sm text-white/50">No score yet</p>
          </div>
        )}
      </div>

      {score?.signal_summary ? (
        <p className="mt-4 text-sm leading-6 text-white/70">{score.signal_summary}</p>
      ) : (
        <p className="mt-4 text-sm leading-6 text-white/50">
          No signal summary available yet.
        </p>
      )}
    </Link>
  );
}
