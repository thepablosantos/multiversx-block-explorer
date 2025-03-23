import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTransactionByHash } from "../api/multiversx";

function TransactionDetail() {
  const { hash } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["transactionDetail", hash],
    queryFn: () => getTransactionByHash(hash!),
    enabled: !!hash,
  });

  if (isLoading) return <p>Loading transaction...</p>;
  if (!data) return <p>Transaction not found.</p>;

  return (
    <div className="p-6 bg-[var(--card-bg-color)] rounded-lg">
      <h2 className="text-xl mb-4">Transaction Details</h2>
      <p><strong>Hash:</strong> {data.txHash}</p>
      <p><strong>From:</strong> {data.sender}</p>
      <p><strong>To:</strong> {data.receiver}</p>
      <p><strong>Value:</strong> {data.value}</p>
      <p><strong>Status:</strong> {data.status}</p>
    </div>
  );
}

export default TransactionDetail;