-- Run this in the Supabase SQL editor:
-- https://supabase.com/dashboard/project/dlvrxvszmrfumcsxwkmi/sql

create table if not exists public.communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  link text not null,
  description text default '',
  owner text default '',
  tags text[] not null default '{}',
  type text not null check (type in ('channel', 'group')),
  image_url text,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists communities_link_lower_idx
  on public.communities (lower(link));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public;

drop trigger if exists communities_set_updated_at on public.communities;
create trigger communities_set_updated_at
before update on public.communities
for each row
execute function public.set_updated_at();

alter table public.communities enable row level security;

drop policy if exists "Public can read communities" on public.communities;
create policy "Public can read communities"
  on public.communities
  for select
  using (true);

drop policy if exists "Signed-in users can submit communities" on public.communities;
create policy "Signed-in users can submit communities"
  on public.communities
  for insert
  to authenticated
  with check (auth.uid() = created_by);

drop policy if exists "Owners can update their communities" on public.communities;
create policy "Owners can update their communities"
  on public.communities
  for update
  to authenticated
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

insert into storage.buckets (id, name, public)
values ('community-images', 'community-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view community images" on storage.objects;
create policy "Public can view community images"
  on storage.objects
  for select
  using (bucket_id = 'community-images');

drop policy if exists "Signed-in users can upload community images" on storage.objects;
create policy "Signed-in users can upload community images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'community-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Owners can update community images" on storage.objects;
create policy "Owners can update community images"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'community-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Owners can delete community images" on storage.objects;
create policy "Owners can delete community images"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'community-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

grant usage on schema public to anon, authenticated;
grant select on table public.communities to anon, authenticated;
grant insert, update on table public.communities to authenticated;
