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

create table if not exists backtest_runs (
  id uuid primary key default uuid_generate_v4(),
  symbol text,
  start timestamptz,
  "end" timestamptz,
  interval text,
  total_return numeric,
  equity_curve jsonb,
  created_at timestamptz default now()
);
