import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getBlockHeight,
  getTotalTransactions,
  getTotalAccounts,
  getValidators,
  getLatestBlocks,
  getLatestTransactions,
  Block,
  Transaction
} from "../api/multiversx";

function formatTimeAgo(timestamp: number) {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000);

  if (seconds < 60) return `${seconds} secs ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

function formatValue(value: string) {
  const num = parseFloat(value);
  if (isNaN(num)) return "0 EGLD";
  return `${(num / 1e18).toFixed(4)} EGLD`;
}

function truncateHash(hash: string) {
  if (!hash) return "...";
  return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
}

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: blockData } = useQuery({
    queryKey: ["blockHeight"],
    queryFn: getBlockHeight,
    refetchInterval: 6000,
  });

  const { data: txData } = useQuery({
    queryKey: ["transactionsCount"],
    queryFn: getTotalTransactions,
    refetchInterval: 6000,
  });

  const { data: accountsData } = useQuery({
    queryKey: ["accountsCount"],
    queryFn: getTotalAccounts,
    refetchInterval: 6000,
  });

  const { data: validatorsData } = useQuery({
    queryKey: ["validators"],
    queryFn: getValidators,
    refetchInterval: 6000,
  });

  const { data: latestBlocks } = useQuery({
    queryKey: ["latestBlocks"],
    queryFn: () => getLatestBlocks(4),
    refetchInterval: 6000,
  });

  const { data: latestTransactions } = useQuery({
    queryKey: ["latestTransactions"],
    queryFn: () => getLatestTransactions(4),
    refetchInterval: 6000,
  });

  return (
    <div className="p-8 space-y-8">
      <div className="dashboard-container space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Degen Sentinels
          </h1>
          
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search by Address / Txn Hash / Block / Token"
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="text-sm text-text-secondary mb-2">Block Height</div>
            <div className="text-4xl font-bold text-accent">{blockData?.nonce?.toLocaleString() || "..."}</div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-text-secondary mb-2">Total Transactions</div>
            <div className="text-4xl font-bold text-accent">{txData?.totalProcessed?.toLocaleString() || "..."}</div>
            <div className="text-sm text-accent mt-2">
              {txData?.last24h?.toLocaleString() || "0"} today
            </div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-text-secondary mb-2">Total Accounts</div>
            <div className="text-4xl font-bold text-accent">{accountsData?.totalAccounts?.toLocaleString() || "..."}</div>
            <div className="text-sm text-accent mt-2">
              {accountsData?.activeAccounts?.toLocaleString() || "0"} active today
            </div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-text-secondary mb-2">Validators</div>
            <div className="text-4xl font-bold text-accent">{validatorsData?.totalValidators?.toString() || "..."}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Recent Blocks</h2>
            <button className="text-accent hover:text-accent/80 transition-colors duration-200 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {latestBlocks?.blocks?.map((block: Block) => (
              <div key={block.hash} className="recent-card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-semibold text-accent">{block.nonce}</div>
                    <div className="text-sm text-text-secondary">
                      Transactions: {block.numTxs} • Shard {block.shard}
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      Hash: {truncateHash(block.hash)}
                    </div>
                  </div>
                  <div className="text-sm text-text-secondary">{formatTimeAgo(block.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-text-primary">Recent Transactions</h2>
            <button className="text-accent hover:text-accent/80 transition-colors duration-200 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {latestTransactions?.map((tx: Transaction) => (
              <div key={tx.hash} className="recent-card relative overflow-hidden">
                <div className={`transaction-status transaction-status-${tx.status}`}></div>
                <div className="flex justify-between items-start pl-4">
                  <div>
                    <div className="text-sm">
                      From: <span className="text-text-secondary">{truncateHash(tx.from)}</span>
                    </div>
                    <div className="text-sm">
                      To: <span className="text-text-secondary">{truncateHash(tx.to)}</span>
                    </div>
                    <div className="text-xs text-text-secondary mt-1">
                      Hash: {truncateHash(tx.hash)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-accent">{formatValue(tx.value)}</div>
                    <div className="text-sm text-text-secondary mt-1">{formatTimeAgo(tx.timestamp)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;