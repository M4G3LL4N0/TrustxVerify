import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { recomputeEntityScore } from "@/lib/recompute-score";

export async function POST(request: NextRequest) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase environment variables are missing." },
      { status: 500 }
    );
  }

  // TODO: protect this MVP moderation route with Supabase Auth and role checks before production launch.
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const reportId = String(body.reportId || "").trim();
  const action = String(body.action || "").trim();

  if (!reportId || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid report moderation request." }, { status: 400 });
  }

  const { data: report, error: reportFetchError } = await supabase
    .from("reports")
    .select("id, entity_id")
    .eq("id", reportId)
    .single();

  const entityId = typeof report?.entity_id === "string" ? report.entity_id : "";

  if (reportFetchError || !entityId) {
    return NextResponse.json({ error: "Report not found." }, { status: 404 });
  }

  const nextStatus = action === "approve" ? "reviewed" : "dismissed";

  const { error: updateError } = await supabase
    .from("reports")
    .update({ status: nextStatus })
    .eq("id", reportId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  let score = null;

  try {
    score = await recomputeEntityScore(entityId);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Report updated, but score recompute failed.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    status: nextStatus,
    score,
  });
}
