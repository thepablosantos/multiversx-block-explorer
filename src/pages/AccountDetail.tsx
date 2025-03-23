import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAccountByAddress } from "../api/multiversx";

function AccountDetail() {
  const { address } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["accountDetail", address],
    queryFn: () => getAccountByAddress(address!),
    enabled: !!address,
  });

  if (isLoading) return <p>Loading account...</p>;
  if (!data) return <p>Account not found.</p>;

  return (
    <div className="p-6 bg-[var(--card-bg-color)] rounded-lg">
      <h2 className="text-xl mb-4">Account Details</h2>
      <p><strong>Address:</strong> {data.address}</p>
      <p><strong>Balance:</strong> {Number(data.balance) / 10 ** 18} EGLD</p>
      <p><strong>Nonce:</strong> {data.nonce}</p>
      <p><strong>Transactions:</strong> {data.numTxs}</p>
      <p><strong>Shard:</strong> {data.shard}</p>
    </div>
  );
}

export default AccountDetail;