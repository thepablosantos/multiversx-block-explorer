import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getValidators } from "../api/multiversx";

function ValidatorDetail() {
  const { key } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["validators"],
    queryFn: getValidators,
  });

  if (isLoading) return <p className="p-4">Loading validators...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading validators.</p>;
  // Filter by key
  const validator = data.validators.find((v: { publicKey: string }) => v.publicKey === key);

  if (!validator) return <p className="p-4 text-red-500">Validator not found.</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Validator Details</h2>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white space-y-2">
        <p><strong>Public Key:</strong> {validator.publicKey}</p>
        <p><strong>Identity:</strong> {validator.identity}</p>
        <p><strong>Rating:</strong> {validator.rating}</p>
        <p><strong>Stake:</strong> {Number(validator.stake) / 10 ** 18} EGLD</p>
        <p><strong>Top Up:</strong> {Number(validator.topUp) / 10 ** 18} EGLD</p>
        <p><strong>Shard:</strong> {validator.shard}</p>
        <p><strong>Performance Score:</strong> {validator.performanceScore}</p>
      </div>
    </div>
  );
}

export default ValidatorDetail;