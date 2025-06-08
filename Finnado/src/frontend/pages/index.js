import Header from '../components/Header';
import PerformanceChart from '../components/PerformanceChart';
import FundingTable from '../components/FundingTable';
import '../styles/globals.css';

export default function Home() {
  return (
    <div>
      <Header />
      <PerformanceChart />
      <FundingTable />
    </div>
  );
}
