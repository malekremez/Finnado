
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function BacktestPage() {
  const [runs, setRuns] = useState([]);
  const [status, setStatus] = useState('');
  const [running, setRunning] = useState(false);

  useEffect(() => {
    fetchRuns();
  }, []);

  async function fetchRuns() {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const { data, error } = await supabase
      .from('backtest_runs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else setRuns(data);
  }

  async function runBacktest() {
    setRunning(true);
    setStatus('Running backtest…');
    try {
      const res = await fetch('/api/runBacktest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ symbol: 'BTCUSDT', interval: '1h' }) });
      const json = await res.json();
      if (json.ok) {
        setStatus('✅ Backtest complete');
        await fetchRuns();
      } else {
        setStatus('⚠️ ' + (json.message || 'Error'));
      }
    } catch (e) {
      console.error(e);
      setStatus('⚠️ ' + e.message);
    }
    setRunning(false);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Backtests</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow disabled:opacity-50"
        disabled={running}
        onClick={runBacktest}
      >
        {running ? 'Running…' : 'Run 30‑day Backtest (BTCUSDT)'}
      </button>
      {status && <p className="mt-2 text-sm">{status}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {runs.map(run => (
          <div key={run.id} className="p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
            <h2 className="text-xl font-semibold">{run.symbol} {run.interval}</h2>
            <p className="text-sm text-gray-500">{new Date(run.created_at).toLocaleString()}</p>
            <p>Total Return: {(run.total_return * 100).toFixed(2)}%</p>
          </div>
        ))}
        {runs.length === 0 && <p className="mt-4">No runs yet.&nbsp;Hit the button above to generate your first one.</p>}
      </div>
    </div>
  );
}
