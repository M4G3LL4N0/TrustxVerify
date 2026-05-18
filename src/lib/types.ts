export type EntityType = "person" | "business" | "marketplace_account" | "address";

export interface Entity {
  id: string;
  type: EntityType;
  display_name: string;
  identifier: string;
  source_platform: string | null;
  created_at: string;
  updated_at: string;
}

export interface Score {
  id: string;
  entity_id: string;
  trust_score: number;
  risk_level: "low" | "medium" | "high" | "critical";
  confidence_score: number;
  signal_summary: string | null;
  reasons: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  entity_id: string | null;
  entity_identifier: string;
  entity_display_name: string | null;
  entity_type: EntityType;
  report_type: string;
  description: string;
  evidence_url: string | null;
  reporter_email: string | null;
  status: "pending" | "reviewed" | "dismissed";
  created_at: string;
}

export interface SearchResult {
  entity: Entity;
  score: Score | null;
}
