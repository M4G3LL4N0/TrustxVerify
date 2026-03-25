-- Create brand profiles table
CREATE TABLE brandcrossover.brand_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  website_url TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for brand profiles
ALTER TABLE brandcrossover.brand_profiles ENABLE ROW LEVEL SECURITY;

-- Create crossover opportunities table
CREATE TABLE brandcrossover.crossover_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  concept_name TEXT NOT NULL,
  source_brand_id UUID REFERENCES brandcrossover.brand_profiles(id),
  target_brand_id UUID REFERENCES brandcrossover.brand_profiles(id),
  target_category TEXT NOT NULL,
  total_score NUMERIC(5,2) NOT NULL,
  summary TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for crossover opportunities
ALTER TABLE brandcrossover.crossover_opportunities ENABLE ROW LEVEL SECURITY;

-- Indexes for faster lookups
CREATE INDEX idx_brand_profiles_name ON brandcrossover.brand_profiles(name);
CREATE INDEX idx_crossover_opportunities_score ON brandcrossover.crossover_opportunities(total_score);
