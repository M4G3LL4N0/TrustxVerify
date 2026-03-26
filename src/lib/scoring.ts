type RiskLevel = "low" | "medium" | "high" | "critical";

export function calculateScore({
  baseScore,
  reportCount,
}: {
  baseScore: number;
  reportCount: number;
}) {
  let score = baseScore;

  // Penalize based on reports
  score -= reportCount * 40;

  if (score < 0) score = 0;
  if (score > 1000) score = 1000;

  let risk: RiskLevel = "low";

  if (score < 300) risk = "critical";
  else if (score < 500) risk = "high";
  else if (score < 700) risk = "medium";
  else risk = "low";

  return {
    trust_score: score,
    risk_level: risk,
  };
}
