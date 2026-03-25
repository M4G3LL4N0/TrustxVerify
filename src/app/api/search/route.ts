import { NextRequest, NextResponse } from "next/server";
import type { SearchResult } from "@/lib/types";
import { getSupabaseClient } from "@/lib/supabase";

type SearchApiResponse =
  | { results: SearchResult[] }
  | { results: SearchResult[]; error: string };

export async function GET(
  request: NextRequest
): Promise<NextResponse<SearchApiResponse>> {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json(
      {
        results: [],
        error:
          "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
      { status: 500 }
    );
  }

  const { data: entities, error } = await supabase
    .from("entities")
    .select("*")
    .or(`display_name.ilike.%${q}%,identifier.ilike.%${q}%`)
    .limit(20);

  if (error) {
    return NextResponse.json(
      { results: [], error: error.message },
      { status: 500 }
    );
  }

  if (!entities?.length) {
    return NextResponse.json({ results: [] });
  }

  const entityIds = entities.map((entity) => entity.id);

  const { data: scores, error: scoresError } = await supabase
    .from("scores")
    .select("*")
    .in("entity_id", entityIds);

  if (scoresError) {
    return NextResponse.json(
      { results: [], error: scoresError.message },
      { status: 500 }
    );
  }

  const results: SearchResult[] = entities.map((entity) => ({
    entity,
    score: scores?.find((score) => score.entity_id === entity.id) ?? null,
  }));

  return NextResponse.json({ results });
}
