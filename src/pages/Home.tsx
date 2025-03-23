import StatCard from "../components/StatCard";
import BlocksList from "../components/BlocksList";
import TransactionsChart from "../components/TransactionsChart";
import { useQuery } from "@tanstack/react-query";
import {
  getBlockHeight,
  getTotalTransactions,
  getTotalAccounts,
  getValidators,
} from "../api/multiversx";

function Home() {
  // Block Height
  const { data: blockData, isLoading: loadingBlock } = useQuery({
    queryKey: ["blockHeight"],
    queryFn: getBlockHeight,
    refetchInterval: 15000, // update after 15s
  });

  // Total Transactions
  const { data: txData, isLoading: loadingTx } = useQuery({
    queryKey: ["transactionsCount"],
    queryFn: getTotalTransactions,
    refetchInterval: 15000,
  });

  // Total Accounts
  const { data: accountsData, isLoading: loadingAccounts } = useQuery({
    queryKey: ["accountsCount"],
    queryFn: getTotalAccounts,
    refetchInterval: 15000,
  });

  // Validators
  const { data: validatorsData, isLoading: loadingValidators } = useQuery({
    queryKey: ["validators"],
    queryFn: getValidators,
    refetchInterval: 30000, // Menos frequente
  });

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">MultiversX Block Explorer</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          title="Block Height"
          value={loadingBlock ? "Loading..." : blockData?.nonce}
        />
        <StatCard
          title="Total Transactions"
          value={loadingTx ? "Loading..." : txData}
        />
        <StatCard
          title="Total Accounts"
          value={loadingAccounts ? "Loading..." : accountsData}
        />
        <StatCard
          title="Validators"
          value={loadingValidators ? "Loading..." : validatorsData?.validators?.length}
        />
      </div>

      {/* Transactions Chart */}
      <TransactionsChart />

      {/* Recent Blocks */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Blocks</h2>
        <BlocksList />
      </div>
    </div>
  );
}

export default Home;