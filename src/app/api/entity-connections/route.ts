import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

type ConnectionRow = {
  id: string;
  entity_a: string;
  entity_b: string;
  connection_type: string;
  strength: number;
};

type RelatedEntityRow = {
  id: string;
  display_name: string;
  identifier: string;
  type: string;
};

export async function GET(request: NextRequest) {
  const entityId = request.nextUrl.searchParams.get("entity_id")?.trim();
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ items: [], error: "Supabase environment variables are missing." }, { status: 500 });
  }

  if (!entityId) {
    return NextResponse.json({ items: [] });
  }

  const { data: directConnections, error } = await supabase
    .from("connections")
    .select("*")
    .or(`entity_a.eq.${entityId},entity_b.eq.${entityId}`);

  if (error) {
    return NextResponse.json({ items: [], error: error.message }, { status: 500 });
  }

  const rows = (directConnections ?? []) as ConnectionRow[];
  if (!rows.length) {
    return NextResponse.json({ items: [] });
  }

  const relatedIds = rows.map((row) =>
    row.entity_a === entityId ? row.entity_b : row.entity_a
  );

  const { data: relatedEntities, error: relatedError } = await supabase
    .from("entities")
    .select("id, display_name, identifier, type")
    .in("id", relatedIds);

  if (relatedError) {
    return NextResponse.json({ items: [], error: relatedError.message }, { status: 500 });
  }

  const entityMap = new Map(
    ((relatedEntities ?? []) as RelatedEntityRow[]).map((entity) => [entity.id, entity])
  );

  const items = rows
    .map((row) => {
      const relatedEntityId = row.entity_a === entityId ? row.entity_b : row.entity_a;
      const related = entityMap.get(relatedEntityId);

      if (!related) return null;

      return {
        connection_id: row.id,
        connection_type: row.connection_type,
        strength: row.strength,
        related_entity_id: related.id,
        related_display_name: related.display_name,
        related_identifier: related.identifier,
        related_type: related.type,
      };
    })
    .filter(Boolean);

  return NextResponse.json({ items });
}
