"use client";

import { useState } from "react";

export function ReportActions({ reportId }: { reportId: string }) {
  const [loading, setLoading] = useState<"" | "approve" | "reject">("");

  async function handleAction(action: "approve" | "reject") {
    setLoading(action);

    try {
      const res = await fetch("/api/admin/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportId, action }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Moderation failed.");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Moderation failed.");
    } finally {
      setLoading("");
    }
  }

  return (
    <div className="mt-4 flex gap-2">
      <button
        type="button"
        onClick={() => handleAction("approve")}
        disabled={loading !== ""}
        className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-emerald-300 disabled:opacity-50"
      >
        {loading === "approve" ? "Approving..." : "Approve"}
      </button>

      <button
        type="button"
        onClick={() => handleAction("reject")}
        disabled={loading !== ""}
        className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-red-300 disabled:opacity-50"
      >
        {loading === "reject" ? "Rejecting..." : "Reject"}
      </button>
    </div>
  );
}
