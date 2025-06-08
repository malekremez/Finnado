create table funding_rates (
  id uuid primary key default uuid_generate_v4(),
  symbol text,
  rate numeric,
  timestamp timestamptz default now()
);

create table performance_metrics (
  id uuid primary key default uuid_generate_v4(),
  pnl numeric,
  apr numeric,
  timestamp timestamptz default now()
);