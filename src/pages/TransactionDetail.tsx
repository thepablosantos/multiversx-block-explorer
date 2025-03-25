import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTransactionByHash } from "../api/multiversx";
import { formatTimeAgo } from "../utils/formatting";

export default function TransactionDetail() {
  const { hash } = useParams();

  const { data: transaction, isLoading, isError } = useQuery({
    queryKey: ["transaction", hash],
    queryFn: () => getTransactionByHash(hash!),
    enabled: !!hash,
    retry: 1
  });

  if (isLoading) {
    return (
      <div className="dashboard-container px-4 py-8">
        <div className="mb-8">
          <Link to="/transactions" className="text-accent hover:text-accent/80">← Back to Transactions</Link>
          <h1 className="text-2xl font-bold mt-4 text-white">Loading Transaction...</h1>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/5 rounded w-3/4"></div>
            <div className="h-4 bg-white/5 rounded w-1/2"></div>
            <div className="h-4 bg-white/5 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !transaction) {
    return (
      <div className="dashboard-container px-4 py-8">
        <div className="mb-8">
          <Link to="/transactions" className="text-accent hover:text-accent/80">← Back to Transactions</Link>
          <h1 className="text-2xl font-bold mt-4 text-white">Transaction Not Found</h1>
        </div>
        <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 p-6">
          <p className="text-white">The transaction with hash {hash} was not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/transactions" className="text-accent hover:text-accent/80">← Back to Transactions</Link>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white">Transaction Details</h1>
            <div className={`px-2 py-1 rounded-full text-sm ${
              transaction.status === 'success' ? 'bg-accent/20 text-accent' :
              transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
              'bg-red-500/20 text-red-500'
            }`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 p-6">
          <div className="grid gap-6">
            <div>
              <div className="text-text-secondary text-sm mb-1">Hash</div>
              <div className="text-white font-medium break-all">{transaction.hash}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-text-secondary text-sm mb-1">From</div>
                <Link to={`/accounts/${transaction.sender}`} className="text-accent hover:text-accent/80 break-all">
                  {transaction.sender}
                </Link>
                <div className="text-text-secondary text-sm mt-1">Shard {transaction.senderShard}</div>
              </div>
              <div>
                <div className="text-text-secondary text-sm mb-1">To</div>
                <Link to={`/accounts/${transaction.receiver}`} className="text-accent hover:text-accent/80 break-all">
                  {transaction.receiver}
                </Link>
                <div className="text-text-secondary text-sm mt-1">Shard {transaction.receiverShard}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Transaction Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <div className="text-text-secondary text-sm">Value</div>
              <div className="text-white">{Number(transaction.value) / Math.pow(10, 18)} EGLD</div>
            </div>
            <div>
              <div className="text-text-secondary text-sm">Timestamp</div>
              <div className="text-white">{formatTimeAgo(transaction.timestamp)}</div>
            </div>
            <div>
              <div className="text-text-secondary text-sm">Nonce</div>
              <div className="text-white">{transaction.nonce}</div>
            </div>
            <div>
              <div className="text-text-secondary text-sm">Gas Price</div>
              <div className="text-white">{transaction.gasPrice}</div>
            </div>
            <div>
              <div className="text-text-secondary text-sm">Gas Limit</div>
              <div className="text-white">{transaction.gasLimit}</div>
            </div>
            <div>
              <div className="text-text-secondary text-sm">Gas Used</div>
              <div className="text-white">{transaction.gasUsed}</div>
            </div>
            <div>
              <div className="text-text-secondary text-sm">Fee</div>
              <div className="text-white">{Number(transaction.fee) / Math.pow(10, 18)} EGLD</div>
            </div>
            <div>
              <div className="text-text-secondary text-sm">Round</div>
              <div className="text-white">{transaction.round}</div>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/5 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Block Info</h2>
          <div>
            <div className="text-text-secondary text-sm">Mini Block Hash</div>
            <div className="text-white break-all">{transaction.miniBlockHash}</div>
          </div>
        </div>
      </div>
    </div>
  );
}