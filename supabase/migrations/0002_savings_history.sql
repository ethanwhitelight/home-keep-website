create table if not exists savings_history (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references profiles(id) on delete cascade,
  amount_cents integer not null,
  description text,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table savings_history enable row level security;

create policy "Members can view own savings history"
  on savings_history for select
  using (auth.uid() = member_id);

-- No insert/update/delete policy for authenticated users: rows are written
-- by backend processes (the future job-completion pipeline) via the
-- service-role key, which bypasses RLS.
