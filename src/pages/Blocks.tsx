import { useQuery } from '@tanstack/react-query';
import { truncateHash } from '../utils/formatting';

interface Block {
  nonce: number;
  age: string;
  txCount: number;
  shard: string;
  size: string;
  gasUsed: number;
  gasLimit: number;
  hash: string;
  leader: {
    name: string;
    icon: string;
  };
}

// Mock data baseado na imagem
const mockBlocks: Block[] = [
  {
    nonce: 24458975,
    age: '4 secs',
    txCount: 14,
    shard: 'Shard 0',
    size: '4.81 kB',
    gasUsed: 76653235,
    gasLimit: 3000000000,
    hash: '5a1d2f94341...616fd9770e3',
    leader: {
      name: 'Valid Blocks',
      icon: '🔵'
    }
  },
  {
    nonce: 24449107,
    age: '4 secs',
    txCount: 22,
    shard: 'Shard 1',
    size: '11.19 kB',
    gasUsed: 129656102,
    gasLimit: 3000000000,
    hash: '4f3e3c9d443...e6ffa61d73cd',
    leader: {
      name: 'Forbole',
      icon: '🔴'
    }
  },
  {
    nonce: 24459638,
    age: '4 secs',
    txCount: 10,
    shard: 'Shard 2',
    size: '4.32 kB',
    gasUsed: 26450515,
    gasLimit: 3000000000,
    hash: '8b4f668a483...52962b0271f',
    leader: {
      name: 'Ofero Staking',
      icon: '⚪'
    }
  }
];

export default function Blocks() {
  // Mock stats
  const stats = {
    blockHeight: '97,811,029',
    totalApplications: '10,900',
    totalRewards: '5,817.81 EGLD',
    totalFees: '59,835.017 EGLD'
  };

  return (
    <div className="dashboard-container px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Blocks</h1>
        <input
          type="text"
          placeholder="Search by block height, hash, or round"
          className="search-bar max-w-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="stat-value">{stats.blockHeight}</div>
          <div className="stat-label">Block Height</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalApplications}</div>
          <div className="stat-label">Total Applications Deployed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalRewards}</div>
          <div className="stat-label">Total Developer Rewards</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalFees}</div>
          <div className="stat-label">Total Network Fees</div>
        </div>
      </div>

      <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl border border-white border-opacity-5">
        <table className="blocks-table">
          <thead>
            <tr>
              <th>Block</th>
              <th>Age</th>
              <th>Txns</th>
              <th>Shard</th>
              <th>Size</th>
              <th>Gas Used</th>
              <th>Block Hash</th>
              <th>Leader</th>
            </tr>
          </thead>
          <tbody>
            {mockBlocks.map((block) => (
              <tr key={block.hash}>
                <td>{block.nonce}</td>
                <td>{block.age}</td>
                <td>{block.txCount}</td>
                <td>{block.shard}</td>
                <td>{block.size}</td>
                <td>
                  <div>
                    {block.gasUsed.toLocaleString()} ({((block.gasUsed / block.gasLimit) * 100).toFixed(2)}%)
                  </div>
                  <div className="gas-used-bar">
                    <div 
                      className="gas-used-progress" 
                      style={{ width: `${(block.gasUsed / block.gasLimit) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="hash-cell">{block.hash}</td>
                <td>
                  <div className="leader-cell">
                    <span className="leader-icon">{block.leader.icon}</span>
                    <span>{block.leader.name}</span>
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