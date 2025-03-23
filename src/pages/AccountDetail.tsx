import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAccountByAddress } from "../api/multiversx";

function AccountDetail() {
  const { address } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["accountDetail", address],
    queryFn: () => getAccountByAddress(address!),
    enabled: !!address,
  });

  if (isLoading) return <p className="p-4">Loading account details...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading account details.</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Account Details</h2>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white space-y-2">
        <p><strong>Address:</strong> {data.address}</p>
        <p><strong>Balance:</strong> {Number(data.balance) / 10 ** 18} EGLD</p>
        <p><strong>Nonce:</strong> {data.nonce}</p>
        <p><strong>Transaction Count:</strong> {data.numTxs}</p>
        <p><strong>Shard:</strong> {data.shard}</p>
        {data.delegationContract && (
          <p><strong>Delegation Contract:</strong> {data.delegationContract}</p>
        )}
      </div>
    </div>
  );
}

export default AccountDetail;