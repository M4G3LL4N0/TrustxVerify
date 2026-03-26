import { calculateTrustScore } from "@/lib/scoring";
import { getSupabaseClient } from "@/lib/supabase";

export async function recomputeEntityScore(entityId: string) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error(
      "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  const [
    { data: reports },
    { data: connections }
  ] = await Promise.all([
    supabase
      .from("reports")
      .select("report_type, status")
      .eq("entity_id", entityId),
    supabase
      .from("connections")
      .select("strength")
      .or(`entity_a.eq.${entityId},entity_b.eq.${entityId}`)
  ]);

  const safeReports = reports ?? [];
  const safeConnections = connections ?? [];

  const approved = safeReports.filter((r) => r.status === "reviewed");
  const dismissed = safeReports.filter((r) => r.status === "dismissed");
  const pending = safeReports.filter((r) => r.status === "pending");

  const reportTypes = new Set(
    safeReports
      .map((r) => String(r.report_type || "").toLowerCase().trim())
      .filter(Boolean)
  );

  // Calculate average connection strength
  const connectionStrength = safeConnections.length > 0
    ? safeConnections.reduce((sum, c) => sum + (c.strength || 0), 0) / safeConnections.length
    : 0;

  const joinedTypes = Array.from(reportTypes).join(" ");
  const score = calculateTrustScore({
    approvedReportCount: approved.length,
    dismissedReportCount: dismissed.length,
    pendingReportCount: pending.length,
    uniqueReportTypes: reportTypes.size,
    hasSuspiciousAddressSignal:
      joinedTypes.includes("address") || joinedTypes.includes("reship") || joinedTypes.includes("warehouse"),
    hasFreightForwardingSignal:
      joinedTypes.includes("freight") || joinedTypes.includes("forward"),
    hasChargebackSignal:
      joinedTypes.includes("chargeback") || joinedTypes.includes("payment dispute"),
    connectionStrength
  });

  const { data: existingScore } = await supabase
    .from("scores")
    .select("id")
    .eq("entity_id", entityId)
    .maybeSingle();

  if (existingScore?.id) {
    const { error: updateError } = await supabase
      .from("scores")
      .update({
        trust_score: score.trust_score,
        risk_level: score.risk_level,
        confidence_score: score.confidence_score,
        signal_summary: score.signal_summary,
        reasons: score.reasons,
      })
      .eq("entity_id", entityId);

    if (updateError) {
      throw new Error(updateError.message);
    }
  } else {
    const { error: insertError } = await supabase.from("scores").insert({
      entity_id: entityId,
      trust_score: score.trust_score,
      risk_level: score.risk_level,
      confidence_score: score.confidence_score,
      signal_summary: score.signal_summary,
      reasons: score.reasons,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  return score;
}
