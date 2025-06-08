
const axios = require('axios');

/**
 * Convert Bybit kline objects to Binance-style arrays so the existing strategy code
 * can stay unchanged.
 */
function mapBybitCandle(c) {
  return [
    c.startTime,              // open time (ms)
    parseFloat(c.openPrice),
    parseFloat(c.highPrice),
    parseFloat(c.lowPrice),
    parseFloat(c.closePrice),
    parseFloat(c.volume),     // volume
    c.endTime,                // close time
    parseFloat(c.turnover),   // quote asset volume
    null, null, null, null    // pad to 12 items (ignored by strategy)
  ];
}

/**
 * Fetch historical klines from Bybit v5 REST.
 *
 * @param {string} symbol e.g. "BTCUSDT"
 * @param {string} interval e.g. "1h", "1m"
 * @param {Date}   start
 * @param {Date}   end
 * @returns {Promise<Array>} Array of candles (Binance-style arrays)
 */
async function getHistoricalKlines(symbol, interval = '1h', start, end) {
  const MAX_LIMIT = 1000;
  const category = 'linear'; // USDT perpetual
  const intervalMap = { '1m':'1', '3m':'3', '5m':'5', '15m':'15', '30m':'30', '1h':'60', '4h':'240', '1d':'D' };
  const bybitInterval = intervalMap[interval] || '60';
  let startTs = Math.floor(+start);
  const endTs = Math.floor(+end);
  const out = [];

  while (startTs < endTs) {
    const url = `https://api.bybit.com/v5/market/kline?category=${category}&symbol=${symbol}&interval=${bybitInterval}&limit=${MAX_LIMIT}&start=${startTs}&end=${endTs}`;
    const { data } = await axios.get(url);
    if (data.retCode !== 0) {
      throw new Error('Bybit API error: ' + JSON.stringify(data));
    }
    const candles = data.result.list;
    if (!candles || candles.length === 0) break;
    // Bybit returns latest->oldest; reverse for chronological
    candles.reverse().forEach(c => out.push(mapBybitCandle(c)));
    const last = candles[0];
    startTs = last.startTime + 1;
    if (candles.length < MAX_LIMIT) break; // no more
  }

  return out;
}

module.exports = { getHistoricalKlines };
