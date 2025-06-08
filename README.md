# Funding Rate Arbitrage Bot with Dashboard

This full-stack app runs a funding-rate arbitrage bot and shows performance via a web dashboard.

## 🪙 Bybit Demo Mode

The codebase now supports **Bybit** alongside Binance.  
Set `EXCHANGE=bybit` in your `.env` (or Vercel env) plus `BYBIT_API_KEY`/`BYBIT_API_SECRET` (test‑net keys work fine).

Run a back‑test:

```bash
npm run backtest -- --exchange bybit --symbol BTCUSDT
```

---

## 🚀 One‑Click Deploy (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-user/finnado-bybit-demo&env=EXCHANGE,BYBIT_API_KEY,BYBIT_API_SECRET,SUPABASE_URL,SUPABASE_ANON_KEY&envDescription=Set%20vars%20for%20Bybit%20and%20Supabase%20connections)

> **What you’ll need**  
> • A free Vercel account connected to GitHub  
> • Test‑net API keys from Bybit  
> • A Supabase project with public URL & anon key

### 🖱️ Dashboard Button
Click **Run 30‑day Backtest (BTCUSDT)** on the Backtests page and the serverless function will fetch data from Bybit, run the strategy, store results, and refresh the list automatically.
