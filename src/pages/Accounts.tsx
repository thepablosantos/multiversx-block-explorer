import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchAccounts, fetchNetworkStats } from '../services/api';
import { truncateHash, formatNumber } from '../utils/formatting';

export default function Accounts() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 25;

  const { data: stats } = useQuery({
    queryKey: ['network-stats'],
    queryFn: fetchNetworkStats,
    refetchInterval: 6000
  });

  const { data: accountsData } = useQuery({
    queryKey: ['accounts', currentPage],
    queryFn: () => fetchAccounts(currentPage, ITEMS_PER_PAGE),
    refetchInterval: 6000
  });

  const totalPages = accountsData?.totalPages || 1;
  const pageNumbers = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    pageNumbers.push(i);
  }
  if (totalPages > 5) {
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  return (
    <div className="dashboard-container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <input
          type="text"
          placeholder="Search by address..."
          className="search-bar max-w-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <div className="stat-value text-white">
            {stats?.accounts?.toLocaleString() || '0'}
          </div>
          <div className="stat-label">Total Accounts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-white">
            {stats?.accounts?.toLocaleString() || '0'}
          </div>
          <div className="stat-label">Active Accounts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-white">
            {stats?.accounts?.toLocaleString() || '0'}
          </div>
          <div className="stat-label">Staking Accounts</div>
        </div>
      </div>

      <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl border border-white border-opacity-5">
        <table className="blocks-table">
          <thead>
            <tr>
              <th>Address</th>
              <th className="text-right">Balance</th>
              <th className="text-right">Transactions</th>
            </tr>
          </thead>
          <tbody>
            {accountsData?.accounts.map((account: any) => (
              <tr key={account.address}>
                <td>
                  <Link to={`/accounts/${account.address}`} className="text-accent hover:text-accent/80">
                    {truncateHash(account.address)}
                  </Link>
                </td>
                <td className="text-right">{formatNumber(Number(account.balance) / 1e18)} EGLD</td>
                <td className="text-right">{account.txCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          className="pagination-item" 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>
        {pageNumbers.map((pageNum, idx) => (
          <button
            key={idx}
            className={`pagination-item ${pageNum === currentPage ? 'active' : ''}`}
            onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        <button 
          className="pagination-item"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
