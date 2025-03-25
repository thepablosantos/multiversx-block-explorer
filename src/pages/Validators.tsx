import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchValidators, fetchNetworkStats, fetchNetworkEconomics } from '../services/api';
import { formatNumber } from '../utils/formatting';

export default function Validators() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 25;

  const { data: validators = [] } = useQuery({
    queryKey: ['validators'],
    queryFn: fetchValidators,
    refetchInterval: 6000
  });

  const { data: networkStats } = useQuery({
    queryKey: ['networkStats'],
    queryFn: fetchNetworkStats,
    refetchInterval: 6000
  });

  const { data: economics } = useQuery({
    queryKey: ['networkEconomics'],
    queryFn: fetchNetworkEconomics,
    refetchInterval: 6000
  });

  const totalStake = validators.reduce((acc, v) => acc + (Number(v.stake) || 0), 0);
  const totalTopUp = validators.reduce((acc, v) => acc + (Number(v.topUp) || 0), 0);
  const activeValidators = validators.filter(v => v.locked !== '0').length;

  const stats = [
    {
      title: 'Total Validators',
      value: validators.length,
      change: 'today',
      changeValue: activeValidators,
      changeLabel: 'active'
    },
    {
      title: 'Total Stake',
      value: formatNumber(totalStake / 1e18),
      change: 'today',
      changeValue: formatNumber(totalTopUp / 1e18),
      changeLabel: 'staked'
    },
    {
      title: 'Network APR',
      value: economics?.apr ? `${(economics.apr * 100).toFixed(2)}%` : '0%',
      change: 'today',
      changeValue: economics?.baseApr ? `${(economics.baseApr * 100).toFixed(2)}%` : '0%',
      changeLabel: 'base APR'
    }
  ];

  const totalPages = Math.ceil(validators.length / ITEMS_PER_PAGE);
  const pageNumbers = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) {
    pageNumbers.push(i);
  }
  if (totalPages > 5) {
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentValidators = validators.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Validators</h1>
        <div className="flex space-x-4">
          <Link to="/validators" className="text-white hover:text-gray-300">Validators</Link>
          <Link to="/staking" className="text-gray-400 hover:text-white">Staking Providers</Link>
          <Link to="/nodes" className="text-gray-400 hover:text-white">Nodes</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-white/5">
            <div className="text-gray-400 text-sm">{stat.title}</div>
            <div className="text-white text-2xl font-bold mt-2">{stat.value}</div>
            <div className="flex items-center mt-2">
              <span className="text-white text-sm">{stat.change}</span>
              <span className="text-white text-sm ml-2">{stat.changeValue}</span>
              <span className="text-gray-400 text-sm ml-1">{stat.changeLabel}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-white/5">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-gray-400">
                <th className="py-3 px-4">Provider</th>
                <th className="py-3 px-4">Stake</th>
                <th className="py-3 px-4">Nodes</th>
                <th className="py-3 px-4">APR</th>
                <th className="py-3 px-4">Score</th>
              </tr>
            </thead>
            <tbody>
              {currentValidators.map((validator, index) => (
                <tr key={index} className="border-t border-white/5 hover:bg-white/5">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <span className="text-white">{validator.provider}</span>
                      {validator.featured && (
                        <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white">
                    {formatNumber(Number(validator.stake) / 1e18)} EGLD
                  </td>
                  <td className="py-4 px-4 text-white">{validator.numNodes}</td>
                  <td className="py-4 px-4 text-white">{validator.apy.toFixed(2)}%</td>
                  <td className="py-4 px-4 text-white">{validator.score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination mt-6">
        <button 
          className="pagination-item text-white" 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>
        {pageNumbers.map((pageNum, idx) => (
          <button
            key={idx}
            className={`pagination-item text-white ${pageNum === currentPage ? 'active' : ''}`}
            onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        <button 
          className="pagination-item text-white"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}