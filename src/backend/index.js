require('dotenv').config();
const { executeTrade } = require('./tradeExecutor');
const { forecastFunding } = require('./fundingForecast');
const { shouldPause } = require('./newsPauseFilter');
const { logPerformance } = require('./utils/logger');

async function main() {
  if (await shouldPause()) return console.log('Paused due to macro event.');
  const topSymbol = await forecastFunding();
  const result = await executeTrade(topSymbol);
  logPerformance(result);
}

main();
