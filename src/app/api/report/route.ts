import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { recomputeEntityScore } from "@/lib/recompute-score";

export async function POST(request: NextRequest) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
      { status: 500 }
    );
  }

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

  const { data: existingEntity, error: existingEntityError } = await supabase
    .from("entities")
    .select("*")
    .eq("identifier", entityIdentifier)
    .maybeSingle();

  if (existingEntityError) {
    return NextResponse.json({ error: existingEntityError.message }, { status: 500 });
  }

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

  const score = await recomputeEntityScore(String(entityId));

  return NextResponse.json({
    success: true,
    score,
  });
}
