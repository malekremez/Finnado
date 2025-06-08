export default function FundingTable() {
  const rows = [
    { symbol: 'ETH/USDT', rate: 0.025 },
    { symbol: 'BTC/USDT', rate: 0.03 },
  ];
  return (
    <table><thead><tr><th>Symbol</th><th>Rate</th></tr></thead><tbody>{rows.map((r, i) => <tr key={i}><td>{r.symbol}</td><td>{r.rate}</td></tr>)}</tbody></table>
  );
}
