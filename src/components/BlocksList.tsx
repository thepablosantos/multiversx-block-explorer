import { useQuery } from "@tanstack/react-query";
import { getLatestBlocks } from "../api/multiversx";
import { Link } from "react-router-dom";

function BlocksList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["latestBlocks"],
    queryFn: () => getLatestBlocks(10),
    refetchInterval: 15000,
  });

  if (isLoading) return <p>Loading blocks...</p>;
  if (error) return <p className="text-red-500">Error loading blocks.</p>;

  return (
    <div className="space-y-4">
      {data.map((block: {
        hash: string;
        nonce: number;
        timestamp: number;
        numTxs: number;
        proposer: string;
      }) => (
        <div
          key={block.hash}
          className="bg-gray-800 p-4 rounded-lg shadow-md text-white space-y-1 transition transform hover:scale-[1.01]"
        >
          <p>
            <strong>Hash:</strong>
            <Link
              to={`/block/${block.hash}`}
              className="text-green-400 hover:underline ml-2 break-all"
            >
              {block.hash.slice(0, 20)}...
            </Link>
          </p>
          <p><strong>Nonce:</strong> {block.nonce}</p>
          <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
          <p><strong>Transactions:</strong> {block.numTxs}</p>
          <p><strong>Proposer:</strong> {block.proposer}</p>
        </div>
      ))}
    </div>
  );
}

export default BlocksList;