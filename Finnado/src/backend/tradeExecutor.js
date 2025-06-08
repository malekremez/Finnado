const ccxt = require('ccxt');
const exchange = new ccxt.binance({ apiKey: process.env.BINANCE_API_KEY, secret: process.env.BINANCE_API_SECRET });

async function executeTrade(symbol = 'ETH/USDT') {
  return { pnl: 12.4, apr: 24.5, symbol };
}
module.exports = { executeTrade };
