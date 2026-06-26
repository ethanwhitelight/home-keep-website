create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null check (source in ('cheat-sheet', 'service-request', 'signup-abandoned')),
  tier text check (tier in ('silver', 'gold', 'platinum')),
  service_name text,
  metadata jsonb not null default '{}'::jsonb,
  member_id uuid references profiles(id),
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

create policy "Anyone can submit a lead"
  on leads for insert
  to anon, authenticated
  with check (true);

-- No select policy for anon/authenticated: lead capture must work for
-- signed-out visitors (cheat-sheet, abandoned checkout), but reviewing
-- leads is an internal function done via the service-role key.
