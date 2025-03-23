import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTokenById } from "../api/multiversx";

function TokenDetail() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tokenDetail", id],
    queryFn: () => getTokenById(id!),
    enabled: !!id,
  });

  if (isLoading) return <p className="p-4">Loading token details...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading token details.</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Token Details</h2>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white space-y-2">
        <p><strong>ID:</strong> {data.identifier}</p>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Ticker:</strong> {data.ticker}</p>
        <p><strong>Owner:</strong> {data.owner}</p>
        <p><strong>Decimals:</strong> {data.decimals}</p>
        <p><strong>Supply:</strong> {Number(data.supply) / 10 ** data.decimals}</p>
        <p><strong>Can Freeze:</strong> {data.canFreeze ? "Yes" : "No"}</p>
        <p><strong>Can Mint:</strong> {data.canMint ? "Yes" : "No"}</p>
        <p><strong>Can Burn:</strong> {data.canBurn ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default TokenDetail;