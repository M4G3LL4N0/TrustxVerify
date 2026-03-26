import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const supabase = getSupabaseClient();
  if (!supabase) return NextResponse.json({ error: "No DB" }, { status: 500 });

  const { reportId, action } = await request.json();

  if (!reportId || !action) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const status = action === "approve" ? "reviewed" : "dismissed";

  await supabase
    .from("reports")
    .update({ status })
    .eq("id", reportId);

  return NextResponse.json({ success: true });
}
