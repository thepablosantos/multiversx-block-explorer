import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTransactionByHash } from "../api/multiversx";

function TransactionDetail() {
  const { hash } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactionDetail", hash],
    queryFn: () => getTransactionByHash(hash!),
    enabled: !!hash,
  });

  if (isLoading) return <p className="p-4">Loading transaction details...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading transaction details.</p>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>

      <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white space-y-2">
        <p><strong>Hash:</strong> {data.txHash}</p>
        <p><strong>From:</strong> {data.sender}</p>
        <p><strong>To:</strong> {data.receiver}</p>
        <p><strong>Value:</strong> {data.value}</p>
        <p><strong>Fee:</strong> {data.fee}</p>
        <p><strong>Status:</strong> {data.status}</p>
        <p><strong>Gas Used:</strong> {data.gasUsed}</p>
        <p><strong>Gas Price:</strong> {data.gasPrice}</p>
        <p><strong>Timestamp:</strong> {new Date(data.timestamp * 1000).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default TransactionDetail;