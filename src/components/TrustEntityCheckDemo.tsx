"use client";

import { useState } from "react";

const entities = [
  { name: "Northline Logistics LLC", score: 88, flags: [] },
  { name: "Northline Logistics Global", score: 34, flags: ["DEMO: name similarity", "DEMO: new domain"] },
  { name: "QuickShip Co", score: 61, flags: ["DEMO: mixed reviews"] },
];

export function TrustEntityCheckDemo() {
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function check() {
    setLoading(true);
    setDone(false);
    window.setTimeout(() => {
      setDone(true);
      setLoading(false);
    }, 700);
  }

  const e = entities[idx];

  return (
    <div className="mt-8 rounded-[1.35rem] border border-cyan-400/20 bg-cyan-400/5 p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">Interactive pilot (DEMO)</p>
      <h3 className="mt-2 text-lg font-medium text-white">Entity legitimacy check</h3>
      <select
        className="mt-4 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white"
        value={idx}
        onChange={(ev) => setIdx(Number(ev.target.value))}
      >
        {entities.map((x, i) => (
          <option key={x.name} value={i}>
            {x.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={check}
        disabled={loading}
        className="mt-4 rounded-full bg-cyan-400/90 px-5 py-2 text-sm font-semibold text-slate-950 disabled:opacity-60"
      >
        {loading ? "Scoring…" : "Run demo check"}
      </button>
      {done && (
        <div className="mt-6 text-sm text-white/75">
          <p>
            <span className="text-white/45">Trust score:</span> {e.score}/100 (DEMO)
          </p>
          {e.flags.length > 0 && (
            <ul className="mt-2 list-disc pl-5">
              {e.flags.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          {e.flags.length === 0 && <p className="mt-2 text-emerald-300/90">No DEMO flags on sample record.</p>}
        </div>
      )}
    </div>
  );
}
