import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const { data: entities, error } = await supabase
    .from("entities")
    .select("*")
    .or(`display_name.ilike.%${q}%,identifier.ilike.%${q}%`)
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!entities?.length) {
    return NextResponse.json({ results: [] });
  }

  const entityIds = entities.map((entity) => entity.id);

  const { data: scores } = await supabase
    .from("scores")
    .select("*")
    .in("entity_id", entityIds);

  const results = entities.map((entity) => ({
    entity,
    score: scores?.find((score) => score.entity_id === entity.id) ?? null,
  }));

  return NextResponse.json({ results });
}
