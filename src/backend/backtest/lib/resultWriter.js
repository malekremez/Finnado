
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function getSupabase() {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  }
  return null;
}

async function writeResults(symbol, start, end, interval, results) {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = path.join(__dirname, '..', '..', '..', 'backtest_results');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const filePath = path.join(outDir, `${symbol}_${interval}_${stamp}.json`);
  fs.writeFileSync(filePath, JSON.stringify({ symbol, start, end, interval, ...results }, null, 2));
  console.log('Saved local results to', filePath);
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from('backtest_runs').insert({
      symbol,
      start,
      end,
      interval,
      total_return: results.totalReturn,
      equity_curve: results.trades,
      created_at: new Date(),
    });
    if (error) console.error('Supabase error:', error.message);
    else console.log('Stored results in Supabase table backtest_runs');
  }
}

module.exports = { writeResults };
