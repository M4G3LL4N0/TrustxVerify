import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { calculateScore } from "@/lib/scoring";

export async function POST(request: NextRequest) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Missing Supabase env" },
      { status: 500 }
    );
  }

  const body = await request.json();

  const entityIdentifier = String(body.entityIdentifier || "").trim();
  const entityDisplayName = String(body.entityDisplayName || entityIdentifier).trim();
  const entityType = String(body.entityType || "person").trim();
  const reportType = String(body.reportType || "").trim();
  const description = String(body.description || "").trim();

  if (!entityIdentifier || !reportType || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // find or create entity
  const { data: existing } = await supabase
    .from("entities")
    .select("*")
    .eq("identifier", entityIdentifier)
    .maybeSingle();

  let entityId = existing?.id;

  if (!existing) {
    const { data: created } = await supabase
      .from("entities")
      .insert({
        type: entityType,
        display_name: entityDisplayName,
        identifier: entityIdentifier,
      })
      .select("*")
      .single();

    entityId = created.id;

    await supabase.from("scores").insert({
      entity_id: entityId,
      trust_score: 700,
      risk_level: "low",
      confidence_score: 10,
    });
  }

  // insert report
  await supabase.from("reports").insert({
    entity_id: entityId,
    entity_identifier: entityIdentifier,
    entity_display_name: entityDisplayName,
    entity_type: entityType,
    report_type: reportType,
    description,
    status: "pending",
  });

  // count reports
  const { count } = await supabase
    .from("reports")
    .select("*", { count: "exact", head: true })
    .eq("entity_id", entityId);

  const reportCount = count ?? 0;

  // get existing score
  const { data: scoreRow } = await supabase
    .from("scores")
    .select("*")
    .eq("entity_id", entityId)
    .single();

  const newScore = calculateScore({
    baseScore: scoreRow?.trust_score ?? 700,
    reportCount,
  });

  await supabase
    .from("scores")
    .update({
      trust_score: newScore.trust_score,
      risk_level: newScore.risk_level,
    })
    .eq("entity_id", entityId);

  return NextResponse.json({ success: true });
}
