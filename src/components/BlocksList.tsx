import { useQuery } from "@tanstack/react-query";
import { getLatestBlocks } from "../api/multiversx";

interface Block {
  hash: string;
  nonce: number;
  timestamp: number;
}

function BlocksList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['latestBlocks'],
    queryFn: () => getLatestBlocks(10)
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Latest Blocks</h2>
      <ul>
        {data.map((block: Block) => (
          <li key={block.hash} className="mb-3 p-3 border rounded">
            <p><strong>Hash:</strong> {block.hash}</p>
            <p><strong>Nonce:</strong> {block.nonce}</p>
            <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlocksList;