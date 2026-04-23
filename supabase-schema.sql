-- ============================================================
-- SubSync — Supabase Database Schema
-- Run this in your Supabase SQL Editor (supabase.com)
-- Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── GC Profiles ──────────────────────────────────────────────
create table public.gc_profiles (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade not null unique,
  company_name  text not null,
  license_number text,
  address       text,
  phone         text,
  plan          text not null default 'starter' check (plan in ('starter','growth','enterprise')),
  created_at    timestamptz default now()
);
alter table public.gc_profiles enable row level security;
create policy "GC owns their profile"
  on public.gc_profiles for all
  using (auth.uid() = user_id);

-- ── Subcontractors ───────────────────────────────────────────
create table public.subcontractors (
  id                 uuid primary key default uuid_generate_v4(),
  gc_id              uuid references public.gc_profiles(id) on delete cascade not null,
  company_name       text not null,
  contact_name       text not null,
  contact_email      text not null,
  contact_phone      text,
  trade              text not null,
  license_number     text,
  license_state      char(2),
  license_expiry     date,
  insurance_expiry   date,
  insurance_carrier  text,
  w9_uploaded        boolean default false,
  bank_verified      boolean default false,
  status             text default 'pending' check (status in ('pending','active','expiring','expired','blocked')),
  score              int check (score between 0 and 100),
  onboarding_token   text unique default md5(random()::text),
  created_at         timestamptz default now()
);
alter table public.subcontractors enable row level security;
create policy "GC manages their subs"
  on public.subcontractors for all
  using (gc_id in (select id from public.gc_profiles where user_id = auth.uid()));

-- ── Projects ─────────────────────────────────────────────────
create table public.projects (
  id          uuid primary key default uuid_generate_v4(),
  gc_id       uuid references public.gc_profiles(id) on delete cascade not null,
  name        text not null,
  address     text not null,
  value       numeric(12,2) not null default 0,
  status      text default 'active' check (status in ('active','completed','on_hold')),
  start_date  date not null,
  end_date    date,
  created_at  timestamptz default now()
);
alter table public.projects enable row level security;
create policy "GC manages their projects"
  on public.projects for all
  using (gc_id in (select id from public.gc_profiles where user_id = auth.uid()));

-- ── Project <> Sub junction ───────────────────────────────────
create table public.project_subs (
  id                uuid primary key default uuid_generate_v4(),
  project_id        uuid references public.projects(id) on delete cascade not null,
  subcontractor_id  uuid references public.subcontractors(id) on delete cascade not null,
  contract_value    numeric(12,2) not null default 0,
  retainage_pct     numeric(4,2) not null default 10,
  unique (project_id, subcontractor_id)
);
alter table public.project_subs enable row level security;
create policy "GC manages project subs"
  on public.project_subs for all
  using (project_id in (select id from public.projects where gc_id in (
    select id from public.gc_profiles where user_id = auth.uid()
  )));

-- ── Lien Waivers ─────────────────────────────────────────────
create table public.lien_waivers (
  id                    uuid primary key default uuid_generate_v4(),
  project_id            uuid references public.projects(id) on delete cascade not null,
  subcontractor_id      uuid references public.subcontractors(id) on delete cascade not null,
  type                  text not null check (type in ('conditional_progress','unconditional_progress','conditional_final','unconditional_final')),
  amount                numeric(12,2) not null,
  through_date          date not null,
  status                text default 'draft' check (status in ('draft','sent','signed','rejected')),
  signed_at             timestamptz,
  docusign_envelope_id  text,
  created_at            timestamptz default now()
);
alter table public.lien_waivers enable row level security;
create policy "GC manages their waivers"
  on public.lien_waivers for all
  using (project_id in (select id from public.projects where gc_id in (
    select id from public.gc_profiles where user_id = auth.uid()
  )));

-- ── Pay Applications ─────────────────────────────────────────
create table public.pay_apps (
  id                uuid primary key default uuid_generate_v4(),
  project_id        uuid references public.projects(id) on delete cascade not null,
  subcontractor_id  uuid references public.subcontractors(id) on delete cascade not null,
  period_start      date not null,
  period_end        date not null,
  amount_requested  numeric(12,2) not null,
  amount_approved   numeric(12,2),
  retainage_held    numeric(12,2) not null default 0,
  status            text default 'pending' check (status in ('pending','approved','released','blocked')),
  lien_waiver_id    uuid references public.lien_waivers(id),
  notes             text,
  created_at        timestamptz default now()
);
alter table public.pay_apps enable row level security;
create policy "GC manages their pay apps"
  on public.pay_apps for all
  using (project_id in (select id from public.projects where gc_id in (
    select id from public.gc_profiles where user_id = auth.uid()
  )));

-- ── Auto-update sub status based on expiry dates ─────────────
create or replace function update_sub_status()
returns trigger as $$
begin
  if (new.insurance_expiry < current_date or new.license_expiry < current_date) then
    new.status := 'expired';
  elsif (
    new.insurance_expiry < current_date + interval '60 days' or
    new.license_expiry   < current_date + interval '60 days'
  ) then
    new.status := 'expiring';
  elsif (new.w9_uploaded and new.bank_verified) then
    new.status := 'active';
  else
    new.status := 'pending';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger sub_status_update
  before insert or update on public.subcontractors
  for each row execute function update_sub_status();

-- ── Helpful indexes ───────────────────────────────────────────
create index on public.subcontractors (gc_id, status);
create index on public.subcontractors (insurance_expiry);
create index on public.subcontractors (license_expiry);
create index on public.lien_waivers (project_id, status);
create index on public.pay_apps (project_id, status);
