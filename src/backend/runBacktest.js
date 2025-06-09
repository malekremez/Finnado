function loadKlineModule(ex){return require('./backtest/lib/'+ex+'Data');}

require('dotenv').config();
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  try {
    const { symbol = 'BTCUSDT', interval = '1h', exchange = process.env.EXCHANGE || 'bybit', from, to } = req.body || {};
            const { executeStrategy } = require('./backtest/lib/strategyPlayback');
    const { writeResults } = require('./backtest/lib/resultWriter');

    const start = from ? new Date(from) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = to ? new Date(to) : new Date();

    const candles = await getHistoricalKlines(symbol, interval, start, end);
    const results = executeStrategy(symbol, candles);
    await writeResults(symbol, start, end, interval, results);

    res.json({ ok: true, message: 'Backtest complete', totalCandles: candles.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, message: e.message });
  }
};
