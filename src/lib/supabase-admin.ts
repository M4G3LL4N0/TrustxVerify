import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface CrossoverOpportunity {
  id: string
  concept_name: string
  source_brand: string
  target_brand: string
  target_category: string
  total_score: number
  summary: string
  created_at: string
  updated_at: string
}

export async function getCrossoverOpportunities() {
  const { data, error } = await supabaseAdmin
    .from('brandcrossover.crossover_opportunities')
    .select('*')
    .order('total_score', { ascending: false })
  
  if (error) {
    console.error('Error fetching crossover opportunities:', error)
    return []
  }
  
  return data as CrossoverOpportunity[]
}
