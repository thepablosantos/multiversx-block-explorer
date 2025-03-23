import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBlockByHash } from "../api/multiversx";

function BlockDetail() {
  const { hash } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["blockDetail", hash],
    queryFn: () => getBlockByHash(hash!),
    enabled: !!hash,
  });

  if (isLoading) return <p>Loading block...</p>;
  if (!data) return <p>Block not found.</p>;

  return (
    <div className="p-6 bg-[var(--card-bg-color)] rounded-lg">
      <h2 className="text-xl mb-4">Block Details</h2>
      <p><strong>Hash:</strong> {data.hash}</p>
      <p><strong>Nonce:</strong> {data.nonce}</p>
      <p><strong>Round:</strong> {data.round}</p>
      <p><strong>Epoch:</strong> {data.epoch}</p>
      <p><strong>Shard:</strong> {data.shard}</p>
    </div>
  );
}

export default BlockDetail;