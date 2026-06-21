create table if not exists public.school_config (
  id text primary key,
  config jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  slot_key text not null,
  label text,
  url text not null,
  alt text not null,
  width integer,
  height integer,
  object_path text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('school-media', 'school-media', true)
on conflict (id) do update set public = true;
