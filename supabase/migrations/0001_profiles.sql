create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  tier text check (tier in ('silver', 'gold', 'platinum')),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text not null default 'none'
    check (subscription_status in ('active', 'past_due', 'canceled', 'incomplete', 'none')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Signup creates the auth.users row before payment (see build prompt §8),
-- so a profile must exist immediately for the checkout/webhook flow to
-- attach tier + Stripe IDs to later.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
