create schema if not exists trustxverify;

create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create or replace function trustxverify.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists trustxverify.entities (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('person', 'business', 'marketplace_account', 'address')),
  display_name text not null,
  identifier text not null,
  source_platform text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (identifier)
);

create table if not exists trustxverify.scores (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references trustxverify.entities(id) on delete cascade,
  trust_score integer not null default 780 check (trust_score >= 0 and trust_score <= 1000),
  risk_level text not null default 'low' check (risk_level in ('low', 'medium', 'high', 'critical')),
  confidence_score integer not null default 5 check (confidence_score >= 5 and confidence_score <= 100),
  signal_summary text,
  reasons text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (entity_id)
);

create table if not exists trustxverify.reports (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid references trustxverify.entities(id) on delete set null,
  entity_identifier text not null,
  entity_display_name text,
  entity_type text not null check (entity_type in ('person', 'business', 'marketplace_account', 'address')),
  report_type text not null,
  description text not null,
  evidence_url text,
  reporter_email text,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists trustxverify.connections (
  id uuid primary key default gen_random_uuid(),
  entity_a uuid not null references trustxverify.entities(id) on delete cascade,
  entity_b uuid not null references trustxverify.entities(id) on delete cascade,
  connection_type text not null,
  strength numeric(4,3) not null default 0.5 check (strength >= 0 and strength <= 1),
  evidence text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (entity_a <> entity_b),
  unique (entity_a, entity_b, connection_type)
);

create index if not exists trustxverify_entities_display_name_idx on trustxverify.entities using gin (display_name gin_trgm_ops);
create index if not exists trustxverify_entities_identifier_idx on trustxverify.entities (identifier);
create index if not exists trustxverify_scores_entity_id_idx on trustxverify.scores (entity_id);
create index if not exists trustxverify_reports_entity_id_idx on trustxverify.reports (entity_id);
create index if not exists trustxverify_reports_status_idx on trustxverify.reports (status);
create index if not exists trustxverify_connections_entity_a_idx on trustxverify.connections (entity_a);
create index if not exists trustxverify_connections_entity_b_idx on trustxverify.connections (entity_b);

drop trigger if exists set_entities_updated_at on trustxverify.entities;
create trigger set_entities_updated_at
before update on trustxverify.entities
for each row execute function trustxverify.set_updated_at();

drop trigger if exists set_scores_updated_at on trustxverify.scores;
create trigger set_scores_updated_at
before update on trustxverify.scores
for each row execute function trustxverify.set_updated_at();

drop trigger if exists set_reports_updated_at on trustxverify.reports;
create trigger set_reports_updated_at
before update on trustxverify.reports
for each row execute function trustxverify.set_updated_at();

drop trigger if exists set_connections_updated_at on trustxverify.connections;
create trigger set_connections_updated_at
before update on trustxverify.connections
for each row execute function trustxverify.set_updated_at();

alter table trustxverify.entities enable row level security;
alter table trustxverify.scores enable row level security;
alter table trustxverify.reports enable row level security;
alter table trustxverify.connections enable row level security;

drop policy if exists "mvp public read entities" on trustxverify.entities;
create policy "mvp public read entities"
on trustxverify.entities for select
to anon, authenticated
using (true);

drop policy if exists "mvp public read scores" on trustxverify.scores;
create policy "mvp public read scores"
on trustxverify.scores for select
to anon, authenticated
using (true);

drop policy if exists "mvp public read reports" on trustxverify.reports;
create policy "mvp public read reports"
on trustxverify.reports for select
to anon, authenticated
using (true);

drop policy if exists "mvp public read connections" on trustxverify.connections;
create policy "mvp public read connections"
on trustxverify.connections for select
to anon, authenticated
using (true);

drop policy if exists "mvp public insert entities" on trustxverify.entities;
create policy "mvp public insert entities"
on trustxverify.entities for insert
to anon, authenticated
with check (true);

drop policy if exists "mvp public insert reports" on trustxverify.reports;
create policy "mvp public insert reports"
on trustxverify.reports for insert
to anon, authenticated
with check (status = 'pending');

drop policy if exists "mvp public write scores" on trustxverify.scores;
create policy "mvp public write scores"
on trustxverify.scores for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "mvp public moderate reports" on trustxverify.reports;
create policy "mvp public moderate reports"
on trustxverify.reports for update
to anon, authenticated
using (true)
with check (status in ('pending', 'reviewed', 'dismissed'));

-- MVP RLS note: public moderation and score writes keep the prototype usable
-- with an anon client. Production should move report moderation and score writes
-- behind Supabase Auth, role checks, and service-role server routes.

insert into trustxverify.entities (type, display_name, identifier, source_platform)
values
  ('marketplace_account', 'Harbor Resale Co.', 'harbor-resale-88', 'eBay'),
  ('address', 'Forwarding Warehouse 17', '1288 Bayline Dock Unit 17', 'Freight forwarding'),
  ('business', 'Northstar Parts Exchange', 'northstarparts.example', 'Shopify')
on conflict (identifier) do nothing;

insert into trustxverify.scores (entity_id, trust_score, risk_level, confidence_score, signal_summary, reasons)
select id, 735, 'low', 34, 'Limited reviewed risk signals with one related logistics connection.', array['1 pending report', '1 freight forwarding connection']
from trustxverify.entities
where identifier = 'harbor-resale-88'
on conflict (entity_id) do nothing;

insert into trustxverify.reports (entity_id, entity_identifier, entity_display_name, entity_type, report_type, description, evidence_url, reporter_email, status)
select id, identifier, display_name, type, 'freight forwarding concern', 'Seller reported unusual forwarding-address reuse across a high-value shipment.', null, null, 'pending'
from trustxverify.entities
where identifier = 'harbor-resale-88'
on conflict do nothing;

insert into trustxverify.connections (entity_a, entity_b, connection_type, strength, evidence)
select a.id, b.id, 'shared shipping destination', 0.72, 'Seeded MVP example connection.'
from trustxverify.entities a
join trustxverify.entities b on b.identifier = '1288 Bayline Dock Unit 17'
where a.identifier = 'harbor-resale-88'
on conflict (entity_a, entity_b, connection_type) do nothing;
