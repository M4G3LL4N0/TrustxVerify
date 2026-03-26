"use client";

export function ReportActions({ reportId }: { reportId: string }) {
  async function handle(action: "approve" | "reject") {
    await fetch("/api/admin/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reportId, action }),
    });

    location.reload();
  }

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={() => handle("approve")}
        className="px-3 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded"
      >
        Approve
      </button>
      <button
        onClick={() => handle("reject")}
        className="px-3 py-1 text-xs bg-red-500/20 text-red-300 rounded"
      >
        Reject
      </button>
    </div>
  );
}
