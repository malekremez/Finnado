import { Line } from 'react-chartjs-2';
const data = { labels: ['Mon', 'Tue', 'Wed'], datasets: [{ label: 'APR', data: [20, 24, 22], fill: false, tension: 0.1 }] };
export default function PerformanceChart() {
  return <Line data={data} />;
}
