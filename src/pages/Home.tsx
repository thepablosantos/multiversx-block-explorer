import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
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
      <div className="dashboard-container">
        <div className="header-section">
          <div className="header-content">
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-5xl rainbow-text">
                Degen Sentinels
              </h1>
              
              <div className="relative w-1/2">
                <input
                  type="text"
                  placeholder="Search by Address / Txn Hash / Block / Token"
                  className="search-bar text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-text-secondary hover:text-accent transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-value">
                  {blockData?.nonce?.toLocaleString() || "..."}
                </div>
                <div className="stat-label">Block Height</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {txData?.totalProcessed?.toLocaleString() || "..."}
                </div>
                <div className="stat-label">Total Transactions</div>
                <div className="text-sm text-accent mt-2 flex items-center">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    {txData?.last24h?.toLocaleString() || "0"}
                  </span>
                  <span className="ml-1">today</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {accountsData?.totalAccounts?.toLocaleString() || "..."}
                </div>
                <div className="stat-label">Total Accounts</div>
                <div className="text-sm text-accent mt-2 flex items-center">
                  <span className="flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    {accountsData?.activeAccounts?.toLocaleString() || "0"}
                  </span>
                  <span className="ml-1">active today</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {validatorsData?.totalValidators?.toString() || "..."}
                </div>
                <div className="stat-label">Validators</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="dashboard-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold rainbow-text">Recent Blocks</h2>
              <Link to="/blocks" className="text-accent hover:text-accent/80 transition-colors duration-200 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {latestBlocks?.blocks?.map((block: Block) => (
                <div key={block.hash} className="recent-card">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/blocks/${block.nonce}`} className="text-lg font-semibold link-hover">
                        {block.nonce}
                      </Link>
                      <div className="text-sm text-text-secondary">
                        Transactions: {block.numTxs} • Shard {block.shard}
                      </div>
                      <div className="text-xs text-text-secondary mt-1">
                        Hash: <Link to={`/blocks/${block.hash}`} className="link-hover">{truncateHash(block.hash)}</Link>
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
              <h2 className="text-xl font-semibold rainbow-text">Recent Transactions</h2>
              <Link to="/transactions" className="text-accent hover:text-accent/80 transition-colors duration-200 font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {latestTransactions?.map((tx: Transaction) => (
                <div key={tx.hash} className="recent-card relative overflow-hidden">
                  <div className={`transaction-status transaction-status-${tx.status}`}></div>
                  <div className="flex justify-between items-start pl-4">
                    <div>
                      <div className="text-sm">
                        From: <Link to={`/accounts/${tx.from}`} className="link-hover">{truncateHash(tx.from)}</Link>
                      </div>
                      <div className="text-sm">
                        To: <Link to={`/accounts/${tx.to}`} className="link-hover">{truncateHash(tx.to)}</Link>
                      </div>
                      <div className="text-xs text-text-secondary mt-1">
                        Hash: <Link to={`/transactions/${tx.hash}`} className="link-hover">{truncateHash(tx.hash)}</Link>
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
    </div>
  );
}

export default Home;