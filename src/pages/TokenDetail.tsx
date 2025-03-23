import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTokenById } from "../api/multiversx";

function TokenDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["tokenDetail", id],
    queryFn: () => getTokenById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading token...</p>;
  if (!data) return <p>Token not found.</p>;

  return (
    <div className="p-6 bg-[var(--card-bg-color)] rounded-lg">
      <h2 className="text-xl mb-4">Token Details</h2>
      <p><strong>ID:</strong> {data.identifier}</p>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Owner:</strong> {data.owner}</p>
      <p><strong>Supply:</strong> {Number(data.supply) / 10 ** data.decimals}</p>
    </div>
  );
}

export default TokenDetail;