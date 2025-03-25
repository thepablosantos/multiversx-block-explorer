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
const generateMockBlocks = (count: number): Block[] => {
  const blocks: Block[] = [];
  const shards = ['Shard 0', 'Shard 1', 'Shard 2'];
  const leaders = [
    { name: 'Valid Blocks', icon: '🔵' },
    { name: 'Forbole', icon: '🔴' },
    { name: 'Ofero Staking', icon: '⚪' }
  ];

  for (let i = 0; i < count; i++) {
    const shard = shards[Math.floor(Math.random() * shards.length)];
    const leader = leaders[Math.floor(Math.random() * leaders.length)];
    const nonce = 24458975 - i;
    
    blocks.push({
      nonce,
      age: '4 secs',
      txCount: Math.floor(Math.random() * 30),
      shard,
      size: `${(Math.random() * 10).toFixed(2)} kB`,
      gasUsed: Math.floor(Math.random() * 200000000),
      gasLimit: 3000000000,
      hash: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 10)}`,
      leader
    });
  }

  return blocks;
};

export default function Blocks() {
  // Auto atualização a cada 6 segundos
  const { data: blocks = [] } = useQuery({
    queryKey: ['blocks'],
    queryFn: () => Promise.resolve(generateMockBlocks(25)),
    refetchInterval: 6000
  });

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
            {blocks.map((block) => (
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