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

  const body = await request.json();
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

  if (reportFetchError || !report?.entity_id) {
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

  const score = await recomputeEntityScore(report.entity_id);

  return NextResponse.json({
    success: true,
    status: nextStatus,
    score,
  });
}
