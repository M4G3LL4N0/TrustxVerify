import { getSupabaseClient } from "@/lib/supabase";
import { SubpageVisual } from "@/components/SubpageVisual";
import { ReportActions } from "@/components/admin/report-actions";

export const dynamic = "force-dynamic";

type AdminEntity = {
  id: string;
  type: string;
  display_name: string;
  identifier: string;
  created_at: string;
};

type AdminReport = {
  id: string;
  entity_identifier: string;
  entity_type: string;
  report_type: string;
  status: string;
  created_at: string;
  description: string;
};

export default async function AdminPage() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return (
      <main className="pb-24 pt-8">
      <SubpageVisual variant="default" />
        <div className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-8">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-300/80">Admin</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            Supabase environment variables are missing
          </h1>
          <p className="mt-4 max-w-3xl text-white/70">
            Add valid values for NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local and in Vercel project
            settings, then rebuild.
          </p>
        </div>
      </main>
    );
  }

  const [{ data: entities }, { data: reports }, { count: entityCount }, { count: reportCount }] =
    await Promise.all([
      supabase
        .from("entities")
        .select("id, type, display_name, identifier, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("reports")
        .select("id, entity_identifier, entity_type, report_type, status, created_at, description")
        .order("created_at", { ascending: false })
        .limit(20),
      supabase.from("entities").select("*", { count: "exact", head: true }),
      supabase.from("reports").select("*", { count: "exact", head: true }),
    ]);

  const safeEntities: AdminEntity[] = (entities ?? []) as AdminEntity[];
  const safeReports: AdminReport[] = (reports ?? []) as AdminReport[];

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-8">
      <div className="border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Admin</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          TrustxVerify operations dashboard
        </h1>
        <p className="mt-4 max-w-3xl text-white/70">
          Review report flow, entity growth, and moderation actions that directly affect trust scores.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-amber-200/75">
          MVP note: this dashboard must be protected with authentication and role-based authorization before production moderation use.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-white/55">Total entities</p>
          <p className="mt-2 text-4xl font-bold text-white">{entityCount ?? 0}</p>
        </div>
        <div className="border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-white/55">Total reports</p>
          <p className="mt-2 text-4xl font-bold text-white">{reportCount ?? 0}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-semibold text-white">Recent entities</h2>
          <div className="mt-6 space-y-4">
            {safeEntities.length ? (
              safeEntities.map((entity) => (
                <div
                  key={entity.id}
                  className="border border-white/10 bg-slate-950/50 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                    {entity.type}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {entity.display_name}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">{entity.identifier}</p>
                </div>
              ))
            ) : (
              <p className="text-white/45">No entities yet.</p>
            )}
          </div>
        </section>

        <section className="border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-2xl font-semibold text-white">Recent reports</h2>
          <div className="mt-6 space-y-4">
            {safeReports.length ? (
              safeReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-white/10 bg-slate-950/50 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                    {report.report_type}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {report.entity_identifier}
                  </h3>
                  <p className="mt-1 text-sm text-white/55">
                    {report.entity_type} - {report.status}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {report.description}
                  </p>
                  {report.status === "pending" ? (
                    <ReportActions reportId={report.id} />
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-white/45">No reports yet.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
