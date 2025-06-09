function formatAlert(data) {
  return `Trade executed: ${data.symbol} | PnL: ${data.pnl}% | APR: ${data.apr}%`;
}
module.exports = { formatAlert };
