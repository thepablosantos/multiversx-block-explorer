import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

async function getLatestTransactions(limit) {
  const res = await fetch(`https://api.example.com/transactions?limit=${limit}`);
  return res.json();
}

function TransactionsList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["latestTxs"],
    queryFn: () => getLatestTransactions(4),
    refetchInterval: 15000,
  });

  if (isLoading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">Error loading transactions.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {data.map((tx) => (
        <div
          key={tx.hash}
          className="bg-[var(--card-bg-color)] p-4 rounded-lg shadow-md space-y-1"
        >
          <p><strong>From:</strong> {tx.from.slice(0, 12)}...</p>
          <p><strong>To:</strong> {tx.to.slice(0, 12)}...</p>
          <p><strong>Value:</strong> {tx.value} EGLD</p>
          <p className="break-all text-xs">
            <strong>Hash:</strong>{" "}
            <Link to={`/transaction/${tx.hash}`} className="text-[var(--accent-color)] hover:underline">
              {tx.hash.slice(0, 12)}...{tx.hash.slice(-8)}
            </Link>
          </p>
          <p className="text-xs text-gray-400">{new Date(tx.timestamp * 1000).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default TransactionsList;
