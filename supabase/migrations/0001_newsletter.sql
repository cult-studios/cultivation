-- ============================================================
-- Cultivation newsletter — add unsubscribe support to signups
-- Run this in the Supabase SQL Editor (after the signups table exists).
-- ============================================================

alter table public.signups
  add column if not exists unsubscribed boolean not null default false,
  add column if not exists token uuid not null default gen_random_uuid();

-- token is used in unsubscribe links. it's unique per subscriber.
create unique index if not exists signups_token_idx on public.signups (token);

-- The Edge Functions use the service_role key to read the list and flip
-- `unsubscribed`. Grant it the privileges it needs (RLS is bypassed by
-- service_role, but table-level GRANTs are still required):
grant select, insert, update on public.signups to service_role;

-- NOTE: the anon (public) key still only has INSERT (from the signup form).
-- Do NOT grant the anon role select/update on this table.
