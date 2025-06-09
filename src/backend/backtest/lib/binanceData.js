
const axios = require('axios');

async function getHistoricalKlines(symbol, interval, start, end) {
  const limit = 1000; // Binance max
  let startTs = +start;
  const endTs = +end;
  const out = [];
  while (startTs < endTs) {
    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}&startTime=${startTs}`;
    const res = await axios.get(url);
    const data = res.data;
    if (!data.length) break;
    out.push(...data);
    startTs = data[data.length - 1][0] + 1;
    if (out.length / limit > 20) { // safety: cap ~20k rows ~1M API points
      break;
    }
    await new Promise(r => setTimeout(r, 400)); // avoid rate limit
  }
  return out.map(k => ({
    openTime: k[0],
    open: parseFloat(k[1]),
    high: parseFloat(k[2]),
    low: parseFloat(k[3]),
    close: parseFloat(k[4]),
    volume: parseFloat(k[5]),
  }));
}

module.exports = { getHistoricalKlines };
