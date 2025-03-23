import StatCard from "./StatCard";
import { useQuery } from "@tanstack/react-query";
import { getBlockHeight, getTotalTransactions, getTotalAccounts, getValidators } from "../api/multiversx";

function Statistics() {
  const { data: blockHeight } = useQuery({ queryKey: ['blockHeight'], queryFn: getBlockHeight });
  const { data: totalTransactions } = useQuery({ queryKey: ['totalTransactions'], queryFn: getTotalTransactions });
  const { data: totalAccounts } = useQuery({ queryKey: ['totalAccounts'], queryFn: getTotalAccounts });
  const { data: validators } = useQuery({ queryKey: ['validators'], queryFn: getValidators });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Block Height" value={blockHeight?.nonce || "..."} />
      <StatCard title="Total Transactions" value={totalTransactions?.count?.toLocaleString() || "..."} />
      <StatCard title="Total Accounts" value={totalAccounts?.count?.toLocaleString() || "..."} />
      <StatCard title="Validators" value={validators?.length?.toLocaleString() || "..."} />
    </div>
  );
}

export default Statistics;