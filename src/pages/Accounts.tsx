import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

interface Account {
  address: string;
  name?: string;
  balance: {
    amount: number;
    currency: string;
  };
  isContract?: boolean;
}

// Mock data baseado na imagem
const mockAccounts: Account[] = [
  {
    address: 'erd1qqqqqqqqqqqqqpgqd77fnev2k0rwvs4qg2qk0rwvs4qg2qk0rwvs4qxkgk3d',
    name: 'System: Staking Module',
    balance: {
      amount: 14847581.54,
      currency: 'EGLD'
    },
    isContract: true
  },
  {
    address: 'erd1qqqqqqqqqqqqqpgqxkgk3d',
    name: 'Exchange: Binance Staking',
    balance: {
      amount: 3996167.92,
      currency: 'EGLD'
    }
  },
  {
    address: 'erd1qqqqqqqqqqqqqpgqd77fnev2k0rwvs4qg2qk0rwvs4q',
    name: 'Exchange: Upbit',
    balance: {
      amount: 743873.21,
      currency: 'EGLD'
    }
  },
  {
    address: 'erd1qqqqqqqqqqqqqpgqd77fnev2k0rwvs4qg2q',
    name: 'Exchange: Bybit',
    balance: {
      amount: 317553.72,
      currency: 'EGLD'
    }
  },
  {
    address: 'erd1qqqqqqqqqqqqqpgqd77fnev2k0rwvs4qg2qk0rwvs4qg2q',
    name: 'ESDT: WrappedEGLD Contract Shard 0',
    balance: {
      amount: 300495.25,
      currency: 'EGLD'
    },
    isContract: true
  }
];

// Gera mais contas mock para ter 25 no total
for (let i = mockAccounts.length; i < 25; i++) {
  mockAccounts.push({
    address: `erd1${Math.random().toString(36).substring(2, 15)}`,
    balance: {
      amount: Math.random() * 100000,
      currency: 'EGLD'
    }
  });
}

export default function Accounts() {
  // Auto atualização a cada 6 segundos
  const { data: accounts = mockAccounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => Promise.resolve(mockAccounts),
    refetchInterval: 6000
  });

  const stats = {
    totalAccounts: '6,961,673',
    usersStaking: '108,311',
    accountsActiveToday: '45,531'
  };

  return (
    <div className="dashboard-container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <input
          type="text"
          placeholder="Search 6,961,673 accounts..."
          className="search-bar max-w-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <div className="stat-value text-accent">{stats.totalAccounts}</div>
          <div className="stat-label">Total Accounts</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-accent">{stats.usersStaking}</div>
          <div className="stat-label">Users Staking</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-accent">{stats.accountsActiveToday}</div>
          <div className="stat-label">Accounts Active Today</div>
        </div>
      </div>

      <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl border border-white border-opacity-5">
        <table className="blocks-table">
          <thead>
            <tr>
              <th>Address</th>
              <th className="text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.address}>
                <td>
                  <div className="flex items-center space-x-2">
                    {account.isContract && (
                      <span className="text-accent text-sm">⚡</span>
                    )}
                    <Link 
                      to={`/accounts/${account.address}`}
                      className="text-accent hover:text-accent/80"
                    >
                      {account.name || account.address}
                    </Link>
                  </div>
                </td>
                <td className="text-right">
                  <div className="font-medium">
                    ≈ {account.balance.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} {account.balance.currency}
                  </div>
                </td>
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
