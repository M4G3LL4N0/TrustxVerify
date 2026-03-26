export type RiskLevel = "low" | "medium" | "high" | "critical";

export type ScoreInput = {
  approvedReportCount: number;
  dismissedReportCount: number;
  pendingReportCount: number;
  uniqueReportTypes: number;
  hasSuspiciousAddressSignal?: boolean;
  hasFreightForwardingSignal?: boolean;
  hasChargebackSignal?: boolean;
};

export type ScoreOutput = {
  trust_score: number;
  risk_level: RiskLevel;
  confidence_score: number;
  signal_summary: string;
  reasons: string[];
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function calculateTrustScore(input: ScoreInput): ScoreOutput {
  let score = 780;

  score -= input.approvedReportCount * 70;
  score -= input.pendingReportCount * 18;
  score += input.dismissedReportCount * 6;
  score -= Math.max(0, input.uniqueReportTypes - 1) * 20;

  if (input.hasSuspiciousAddressSignal) score -= 120;
  if (input.hasFreightForwardingSignal) score -= 110;
  if (input.hasChargebackSignal) score -= 90;

  score = clamp(score, 0, 1000);

  let risk_level: RiskLevel = "low";
  if (score < 250) risk_level = "critical";
  else if (score < 450) risk_level = "high";
  else if (score < 700) risk_level = "medium";

  const confidence_score = clamp(
    input.approvedReportCount * 18 +
      input.pendingReportCount * 6 +
      input.uniqueReportTypes * 8,
    5,
    100
  );

  const reasons: string[] = [];
  if (input.approvedReportCount > 0) reasons.push(`${input.approvedReportCount} approved report(s)`);
  if (input.pendingReportCount > 0) reasons.push(`${input.pendingReportCount} pending report(s)`);
  if (input.uniqueReportTypes > 1) reasons.push(`${input.uniqueReportTypes} distinct risk categories`);
  if (input.hasSuspiciousAddressSignal) reasons.push("Suspicious address pattern");
  if (input.hasFreightForwardingSignal) reasons.push("Freight forwarding signal");
  if (input.hasChargebackSignal) reasons.push("Chargeback abuse signal");

  const signal_summary =
    reasons.length > 0
      ? `Score derived from ${reasons.join(", ")}.`
      : "Limited negative signals detected so far.";

  return {
    trust_score: score,
    risk_level,
    confidence_score,
    signal_summary,
    reasons,
  };
}
