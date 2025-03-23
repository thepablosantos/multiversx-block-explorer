import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlockByHash } from "../api/multiversx";

function BlockDetail() {
  const { hash } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["blockDetail", hash],
    queryFn: () => getBlockByHash(hash!),
    enabled: !!hash, // Só faz a query se hash existir
  });

  if (isLoading) return <p className="p-4">Loading block details...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading block details.</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Block Details</h2>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white space-y-2">
        <p><strong>Block Hash:</strong> {data.hash}</p>
        <p><strong>Nonce:</strong> {data.nonce}</p>
        <p><strong>Round:</strong> {data.round}</p>
        <p><strong>Epoch:</strong> {data.epoch}</p>
        <p><strong>Shard:</strong> {data.shard}</p>
        <p><strong>Timestamp:</strong> {new Date(data.timestamp * 1000).toLocaleString()}</p>
        <p><strong>Gas Used:</strong> {data.gasUsed}</p>
        <p><strong>Gas Provided:</strong> {data.gasProvided}</p>
        <p><strong>Size:</strong> {data.size} bytes</p>
        <p><strong>Proposer:</strong> {data.proposer}</p>
        {/* To add another fields */}
      </div>
    </div>
  );
}

export default BlockDetail;