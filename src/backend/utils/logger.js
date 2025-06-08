const supabase = require('../supabaseClient');
async function logPerformance({ pnl, apr, symbol }) {
  await supabase.from('performance_metrics').insert({ pnl, apr });
}
module.exports = { logPerformance };
