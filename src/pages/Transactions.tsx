import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { truncateHash } from '../utils/formatting';

interface Transaction {
  hash: string;
  age: string;
  from: {
    address: string;
    name?: string;
  };
  to: {
    address: string;
    name?: string;
  };
  shard: {
    from: string;
    to: string;
  };
  method: {
    name: string;
    contract: string;
    action: string;
  };
  value: {
    amount: number;
    currency: string;
  };
  status: 'success' | 'pending' | 'failed';
}

// Função para gerar transações mock
const generateMockTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const methods = [
    { name: 'xExchange', contract: 'WEGLD', action: 'SwapTokensFixedOutput' },
    { name: 'Hatom', contract: 'Price Aggregator', action: 'SubmitBatch' },
    { name: 'xPortal', contract: 'XP System', action: 'Claim' },
    { name: 'BOBER', contract: 'Game', action: 'JoinGame' },
    { name: 'Pulsar Money', contract: 'Quest System', action: 'FailQuest' }
  ];
  const currencies = ['EGLD', 'USDC', 'BOBER'];
  const shards = ['Shard 0', 'Shard 1', 'Shard 2'];
  const statuses: ('success' | 'pending' | 'failed')[] = ['success', 'pending', 'failed'];

  for (let i = 0; i < count; i++) {
    const method = methods[Math.floor(Math.random() * methods.length)];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const shard = shards[Math.floor(Math.random() * shards.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    transactions.push({
      hash: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 10)}`,
      age: '4 secs',
      from: {
        address: `erd1${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
      },
      to: {
        address: `${Math.random().toString(36).substring(2, 8)}`
      },
      shard: {
        from: shard,
        to: shards[Math.floor(Math.random() * shards.length)]
      },
      method,
      value: {
        amount: Math.random() * 1000,
        currency
      },
      status
    });
  }

  return transactions;
};

export default function Transactions() {
  const { hash } = useParams();

  // Auto atualização a cada 6 segundos
  const { data: transactions = [] } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => Promise.resolve(generateMockTransactions(25)),
    refetchInterval: 6000
  });

  const stats = {
    totalTransactions: '97,811,029',
    avgBlockTime: '6s',
    currentEpoch: '1,123',
    totalVolume: '59,835.017 EGLD'
  };

  // Se tiver um hash, mostra os detalhes da transação
  if (hash) {
    const transaction = transactions.find(t => t.hash.includes(hash)) || transactions[0];

    return (
      <div className="dashboard-container px-4 py-8">
        <div className="mb-8">
          <Link to="/transactions" className="text-accent hover:text-accent/80">← Voltar para Transações</Link>
          <h1 className="text-2xl font-bold mt-4">Detalhes da Transação</h1>
        </div>

        <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl border border-white border-opacity-5 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-text-secondary text-sm">Hash</div>
                <div className="text-text-primary font-medium">{transaction.hash}</div>
              </div>
              <div>
                <div className="text-text-secondary text-sm">Status</div>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                  transaction.status === 'success' ? 'bg-accent/20 text-accent' :
                  transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                  'bg-red-500/20 text-red-500'
                }`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </div>
              </div>
              <div>
                <div className="text-text-secondary text-sm">Age</div>
                <div>{transaction.age}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-text-secondary text-sm">From</div>
                <Link to={`/accounts/${transaction.from.address}`} className="text-accent hover:text-accent/80">
                  {transaction.from.address}
                </Link>
              </div>
              <div>
                <div className="text-text-secondary text-sm">To</div>
                <Link to={`/accounts/${transaction.to.address}`} className="text-accent hover:text-accent/80">
                  {transaction.to.address}
                </Link>
              </div>
              <div>
                <div className="text-text-secondary text-sm">Value</div>
                <div>{transaction.value.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} {transaction.value.currency}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Live Transactions</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-text-secondary">Transaction Pool</span>
          </div>
          <input
            type="text"
            placeholder="Search by hash, address, or token"
            className="search-bar max-w-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="stat-value">{stats.totalTransactions}</div>
          <div className="stat-label">Total Transactions</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.avgBlockTime}</div>
          <div className="stat-label">Average Block Time</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.currentEpoch}</div>
          <div className="stat-label">Current Epoch</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalVolume}</div>
          <div className="stat-label">Total Volume (24h)</div>
        </div>
      </div>

      <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl border border-white border-opacity-5">
        <table className="blocks-table">
          <thead>
            <tr>
              <th>Txn Hash</th>
              <th>Age</th>
              <th>From</th>
              <th>To</th>
              <th>Shard</th>
              <th>Method</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.hash} className="relative">
                <td className="group">
                  <div className={`transaction-status transaction-status-${tx.status}`}></div>
                  <Link 
                    to={`/transactions/${tx.hash.split('...')[0]}`} 
                    className="text-accent hover:text-accent/80 pl-4"
                  >
                    {tx.hash}
                  </Link>
                </td>
                <td>{tx.age}</td>
                <td>
                  <Link to={`/accounts/${tx.from.address}`} className="text-accent hover:text-accent/80">
                    {tx.from.address}
                  </Link>
                </td>
                <td>
                  <Link to={`/accounts/${tx.to.address}`} className="text-accent hover:text-accent/80">
                    {tx.to.address}
                  </Link>
                </td>
                <td>{tx.shard.from} → {tx.shard.to}</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <img src="/path/to/contract/icon.png" alt="" className="w-4 h-4" />
                    <span>{tx.method.name}: {tx.method.action}</span>
                  </div>
                </td>
                <td>{tx.value.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} {tx.value.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="pagination-item">← Prev</button>
        <button className="pagination-item active">1</button>
        <button className="pagination-item">2</button>
        <span className="text-text-secondary">...</span>
        <button className="pagination-item">400</button>
        <button className="pagination-item">Next →</button>
      </div>
    </div>
  );
}