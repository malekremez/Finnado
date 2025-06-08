
require('dotenv').config();
const { executeStrategy } = require('./lib/strategyPlayback');
const { writeResults } = require('./lib/resultWriter');
// Dynamically pick exchange data module (binance | bybit)
const DEFAULT_EXCHANGE = process.env.EXCHANGE || 'binance';
function loadKlineModule(ex) {
  return require(`./lib/${ex}Data`);
}

const argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('Usage: $0 --symbol BTCUSDT --from 2025-05-01 --to 2025-05-31 --interval 1h')
  .demandOption(['symbol'])
  .default('interval', '1h')
  .default('exchange', DEFAULT_EXCHANGE)
  .argv;


// After parsing argv we load exchange module
const { getHistoricalKlines } = loadKlineModule(argv.exchange || DEFAULT_EXCHANGE);
(async () => {
  const { symbol, from, to, interval } = argv;
  const start = from ? new Date(from) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const end = to ? new Date(to) : new Date();
  console.log(`Running backtest for ${symbol} from ${start.toISOString()} to ${end.toISOString()} on ${interval} timeframe`);
  const candles = await getHistoricalKlines(symbol, interval, start, end);
  const results = executeStrategy(symbol, candles);
  await writeResults(symbol, start, end, interval, results);
  console.log('✅ Backtest complete');
})();