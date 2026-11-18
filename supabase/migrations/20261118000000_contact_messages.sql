-- DropTraQ website: contact form submissions.
-- Rows are written only by the website's server route using the service-role
-- key. Row Level Security is enabled with NO policies, so the public anon key
-- can neither read nor write this table.

create table if not exists public.contact_messages (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 1 and 120),
  email         text not null check (char_length(email) between 3 and 200 and position('@' in email) > 1),
  organization  text check (organization is null or char_length(organization) <= 160),
  inquiry_type  text not null check (inquiry_type in ('enterprise', 'partnership', 'talent', 'general')),
  message       text not null check (char_length(message) between 20 and 4000),
  status        text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  user_agent    text check (user_agent is null or char_length(user_agent) <= 400)
);

comment on table public.contact_messages is 'Website contact-form submissions. Written by the Next.js /api/contact route.';

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_idx on public.contact_messages (status);

alter table public.contact_messages enable row level security;

-- Belt and braces: no table privileges for the public roles.
revoke all on table public.contact_messages from anon, authenticated;
