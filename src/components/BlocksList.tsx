import { useQuery } from "@tanstack/react-query";
import { getLatestBlocks } from "../api/multiversx";
import { Link } from "react-router-dom";

function BlocksList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["latestBlocks"],
    queryFn: () => getLatestBlocks(4),
    refetchInterval: 15000,
  });

  if (isLoading) return <p>Loading blocks...</p>;
  if (error) return <p className="text-red-500">Error loading blocks.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((block) => (
        <div
          key={block.hash}
          className="bg-[var(--card-bg-color)] p-4 rounded-lg shadow-md text-white space-y-1"
        >
          <p className="text-sm text-gray-400">Nonce: {block.nonce}</p>
          <p><strong>Txs:</strong> {block.numTxs}</p>
          <p><strong>Proposer:</strong> {block.proposer.slice(0, 12)}...</p>
          <p className="break-all text-xs">
            <strong>Hash:</strong>{" "}
            <Link to={`/block/${block.hash}`} className="text-[var(--accent-color)] hover:underline">
              {block.hash.slice(0, 12)}...{block.hash.slice(-8)}
            </Link>
          </p>
          <p className="text-xs text-gray-400">{new Date(block.timestamp * 1000).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default BlocksList;
