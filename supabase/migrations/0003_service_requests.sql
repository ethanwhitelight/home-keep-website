create table if not exists service_requests (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references profiles(id) on delete cascade,
  tier text not null check (tier in ('silver', 'gold', 'platinum')),
  service_name text not null,
  property_size text,
  urgency text check (urgency in ('asap', 'this_week', 'this_month', 'flexible')),
  notes text,
  photo_urls text[] not null default array[]::text[],
  status text not null default 'submitted'
    check (status in ('submitted', 'contacted', 'scheduled', 'completed', 'canceled')),
  created_at timestamptz not null default now()
);

alter table service_requests enable row level security;

create policy "Members can view own service requests"
  on service_requests for select
  using (auth.uid() = member_id);

create policy "Members can create own service requests"
  on service_requests for insert
  with check (auth.uid() = member_id);

-- Status transitions happen server-side via the service-role key once a
-- contractor-ops tool exists; no authenticated update policy for now.

-- Optional photo evidence for a request, uploaded to a private bucket
-- under a per-member folder (<member_id>/<filename>).
insert into storage.buckets (id, name, public)
values ('service-request-photos', 'service-request-photos', false)
on conflict (id) do nothing;

create policy "Members can upload their own service request photos"
  on storage.objects for insert
  with check (
    bucket_id = 'service-request-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Members can read their own service request photos"
  on storage.objects for select
  using (
    bucket_id = 'service-request-photos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
