import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getValidators } from "../api/multiversx";

function ValidatorDetail() {
  const { key } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["validators"],
    queryFn: getValidators,
  });
  if (isLoading) return <p>Loading validators...</p>;
  const validator = data?.validators?.find((v: { publicKey: string }) => v.publicKey === key);
  if (!validator) return <p>Validator not found.</p>;

  return (
    <div className="p-6 bg-[var(--card-bg-color)] rounded-lg">
      <h2 className="text-xl mb-4">Validator Details</h2>
      <p><strong>Public Key:</strong> {validator.publicKey}</p>
      <p><strong>Stake:</strong> {Number(validator.stake) / 10 ** 18} EGLD</p>
      <p><strong>Rating:</strong> {validator.rating}</p>
    </div>
  );
}

export default ValidatorDetail;