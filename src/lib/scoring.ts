export type RiskLevel = "low" | "medium" | "high" | "critical";

export type ScoreInput = {
  approvedReportCount: number;
  dismissedReportCount: number;
  pendingReportCount: number;
  uniqueReportTypes: number;
  hasSuspiciousAddressSignal?: boolean;
  hasFreightForwardingSignal?: boolean;
  hasChargebackSignal?: boolean;
  connectionStrength?: number;
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

  // Weighted report impacts
  score -= input.approvedReportCount * 100; // Approved reports have strongest negative impact
  score -= input.pendingReportCount * 30;  // Pending reports have moderate impact
  score += input.dismissedReportCount * 15; // Dismissed reports slightly improve score
  
  // Multiple report types indicate broader risk
  score -= Math.max(0, input.uniqueReportTypes - 1) * 25;

  // Strong negative signals
  if (input.hasSuspiciousAddressSignal) score -= 150;
  if (input.hasFreightForwardingSignal) score -= 130;
  if (input.hasChargebackSignal) score -= 110;

  // Connection strength bonus
  if (input.connectionStrength) {
    score += Math.round(input.connectionStrength * 50);
  }

  score = clamp(score, 0, 1000);

  let risk_level: RiskLevel = "low";
  if (score < 250) risk_level = "critical";
  else if (score < 450) risk_level = "high";
  else if (score < 700) risk_level = "medium";

  // Confidence score based on report volume and diversity
  const confidence_score = clamp(
    input.approvedReportCount * 25 +
      input.pendingReportCount * 10 +
      input.uniqueReportTypes * 12,
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
  if (input.connectionStrength) reasons.push(`Strong connections (${Math.round(input.connectionStrength * 100)}%)`);

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
