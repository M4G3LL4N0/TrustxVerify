import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const entityIdentifier = String(body.entityIdentifier || "").trim();
  const entityDisplayName = String(body.entityDisplayName || entityIdentifier).trim();
  const entityType = String(body.entityType || "person").trim();
  const reportType = String(body.reportType || "").trim();
  const description = String(body.description || "").trim();
  const evidenceUrl = String(body.evidenceUrl || "").trim() || null;
  const reporterEmail = String(body.reporterEmail || "").trim() || null;

  if (!entityIdentifier || !reportType || !description) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { data: existingEntity } = await supabase
    .from("entities")
    .select("*")
    .eq("identifier", entityIdentifier)
    .maybeSingle();

  let entityId = existingEntity?.id ?? null;

  if (!existingEntity) {
    const { data: createdEntity, error: entityError } = await supabase
      .from("entities")
      .insert({
        type: entityType,
        display_name: entityDisplayName,
        identifier: entityIdentifier,
      })
      .select("*")
      .single();

    if (entityError) {
      return NextResponse.json({ error: entityError.message }, { status: 500 });
    }

    entityId = createdEntity.id;

    await supabase.from("scores").insert({
      entity_id: entityId,
      trust_score: 450,
      risk_level: "medium",
      confidence_score: 20,
      signal_summary: "Initial score generated from first-party report intake.",
      reasons: ["Newly created entity", "Awaiting more data points"],
    });
  }

  const { error: reportError } = await supabase.from("reports").insert({
    entity_id: entityId,
    entity_identifier: entityIdentifier,
    entity_display_name: entityDisplayName,
    entity_type: entityType,
    report_type: reportType,
    description,
    evidence_url: evidenceUrl,
    reporter_email: reporterEmail,
    status: "pending",
  });

  if (reportError) {
    return NextResponse.json({ error: reportError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
