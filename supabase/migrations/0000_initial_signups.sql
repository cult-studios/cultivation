-- ============================================================
-- Cultivation newsletter — initial signups table
-- ============================================================

create table if not exists public.signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

-- lock it down
alter table public.signups enable row level security;

-- allow anyone to INSERT (sign up), but nobody to read/update/delete via the public key
grant insert on public.signups to anon;

create policy "anyone can sign up"
  on public.signups for insert
  to anon
  with check (true);
