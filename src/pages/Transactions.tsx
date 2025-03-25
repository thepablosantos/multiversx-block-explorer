import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { truncateHash, formatTimeAgo } from '../utils/formatting';
import { getLatestTransactions, getTransactionByHash, getTotalTransactions } from '../api/multiversx';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: string;
}

interface TransactionStats {
  totalTransactions: number;
  averageBlockTime: number;
}

export default function Transactions() {
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: () => getLatestTransactions(25),
    refetchInterval: 6000,
  });

  const { data: stats } = useQuery<TransactionStats>({
    queryKey: ['transactionStats'],
    queryFn: getTotalTransactions,
    refetchInterval: 6000,
  });

  const renderTransactionRow = (transaction: Transaction) => {
    if (!transaction || typeof transaction !== 'object') {
      console.error('Transação inválida:', transaction);
      return null;
    }

    return (
      <tr key={transaction.hash} className="hover:bg-gray-700/30">
        <td className="px-6 py-4">
          <Link to={`/transaction/${transaction.hash}`} className="text-blue-500 hover:text-blue-400">
            {truncateHash(transaction.hash)}
          </Link>
        </td>
        <td className="px-6 py-4">
          <Link to={`/account/${transaction.from}`} className="text-blue-500 hover:text-blue-400">
            {truncateHash(transaction.from)}
          </Link>
        </td>
        <td className="px-6 py-4">
          <Link to={`/account/${transaction.to}`} className="text-blue-500 hover:text-blue-400">
            {truncateHash(transaction.to)}
          </Link>
        </td>
        <td className="px-6 py-4">{transaction.value} EGLD</td>
        <td className="px-6 py-4">
          <span className={`px-2 py-1 rounded ${transaction.status === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
            {transaction.status}
          </span>
        </td>
        <td className="px-6 py-4">{formatTimeAgo(transaction.timestamp)}</td>
      </tr>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Transações em Tempo Real</h1>
          <p className="text-gray-400">
            Pool de Transações: {stats?.totalTransactions.toLocaleString() ?? '...'}
          </p>
        </div>
      </div>

      {isLoadingTransactions ? (
        <div className="text-center py-8">
          <p>Carregando transações...</p>
        </div>
      ) : !transactions || transactions.length === 0 ? (
        <div className="text-center py-8">
          <p>Nenhuma transação encontrada</p>
        </div>
      ) : (
        <div className="bg-gray-800/50 rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left">Hash</th>
                <th className="px-6 py-3 text-left">De</th>
                <th className="px-6 py-3 text-left">Para</th>
                <th className="px-6 py-3 text-left">Valor</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Idade</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(renderTransactionRow)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}