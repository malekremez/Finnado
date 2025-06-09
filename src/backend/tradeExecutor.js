
const ccxt = require('ccxt');
const exchangeId = process.env.EXCHANGE || 'okx';
const apiKeyVar = `${exchangeId.toUpperCase()}_API_KEY`;
const apiSecretVar = `${exchangeId.toUpperCase()}_API_SECRET`;
const exchange = new ccxt[exchangeId.toLowerCase()]({
  apiKey: process.env[apiKeyVar],
  secret: process.env[apiSecretVar],
  enableRateLimit: true
});

async function executeTrade(symbol = 'ETH/USDT') {
  // TODO: insert real trade logic
  return { pnl: 12.4, apr: 24.5, symbol, exchange: exchangeId };
}
module.exports = { executeTrade };
