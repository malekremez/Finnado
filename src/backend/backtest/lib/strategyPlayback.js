
function sma(data, period) {
  const sums = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - period + 1);
    const slice = data.slice(start, i + 1);
    const sum = slice.reduce((acc, c) => acc + c.close, 0);
    sums.push(sum / slice.length);
  }
  return sums;
}

function executeStrategy(symbol, candles) {
  const fast = sma(candles, 10);
  const slow = sma(candles, 30);
  let position = 0; // 0 = flat, 1 = long
  let equity = 10000;
  const trades = [];
  for (let i = 30; i < candles.length; i++) {
    const price = candles[i].close;
    if (fast[i] > slow[i] && position === 0) {
      // enter long
      position = 1;
      trades.push({ type: 'BUY', price, time: candles[i].openTime });
    } else if (fast[i] < slow[i] && position === 1) {
      // exit long
      position = 0;
      const entry = trades[trades.length - 1];
      const pnl = (price - entry.price) / entry.price;
      equity *= 1 + pnl;
      trades.push({ type: 'SELL', price, time: candles[i].openTime, pnl });
    }
  }
  const finalPrice = candles[candles.length - 1].close;
  if (position === 1) {
    const entry = trades[trades.length - 1];
    const pnl = (finalPrice - entry.price) / entry.price;
    equity *= 1 + pnl;
    trades.push({ type: 'SELL', price: finalPrice, time: candles[candles.length - 1].openTime, pnl });
  }
  const totalReturn = (equity - 10000) / 10000;
  return { trades, totalReturn, finalEquity: equity };
}

module.exports = { executeStrategy };
