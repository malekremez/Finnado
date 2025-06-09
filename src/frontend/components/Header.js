
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex gap-6">
      <Link href="/"><span className="font-bold">Funding Arb Dashboard</span></Link>
      <Link href="/backtest"><span className="hover:underline">Backtests</span></Link>
    </header>
  );
}
