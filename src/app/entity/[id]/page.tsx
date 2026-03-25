import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/badge";

export default async function EntityPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { data: entity } = await supabase
    .from("entities")
    .select("*")
    .eq("id", id)
    .single();

  if (!entity) notFound();

  const { data: score } = await supabase
    .from("scores")
    .select("*")
    .eq("entity_id", id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("entity_identifier", entity.identifier)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <main className="pb-24 pt-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">{entity.type}</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{entity.display_name}</h1>
        <p className="mt-3 text-white/55">{entity.identifier}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-6">
            <p className="text-sm text-white/55">Trust score</p>
            <p className="mt-2 text-5xl font-bold text-white">
              {score?.trust_score ?? "—"}
            </p>
            <div className="mt-4">
              <Badge variant={score?.risk_level ?? "neutral"}>
                {score?.risk_level ?? "unscored"}
              </Badge>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-6 lg:col-span-2">
            <p className="text-sm text-white/55">Signal summary</p>
            <p className="mt-3 text-white/75">
              {score?.signal_summary ?? "No signal summary yet."}
            </p>

            {score?.reasons?.length ? (
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                {score.reasons.map((reason: string) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <h2 className="text-2xl font-semibold text-white">Recent reports</h2>
        <div className="mt-6 space-y-4">
          {reports?.length ? (
            reports.map((report) => (
              <div
                key={report.id}
                className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="neutral">{report.report_type}</Badge>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                    {new Date(report.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/75">{report.description}</p>
                {report.evidence_url ? (
                  <a
                    href={report.evidence_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    View evidence
                  </a>
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-white/45">No reports yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
