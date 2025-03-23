import BlocksList from "../components/BlocksList";
import TransactionsChart from "../components/TransactionsChart";
import StatCard from "../components/StatCard";
import SearchBox from "../components/SearchBox";
import { useQuery } from "@tanstack/react-query";
import {
  getBlockHeight,
  getTotalTransactions,
  getTotalAccounts,
  getValidators,
} from "../api/multiversx";

function Home() {
  const { data: blockData, isLoading: loadingBlock } = useQuery({
    queryKey: ["blockHeight"],
    queryFn: getBlockHeight,
    refetchInterval: 15000,
  });

  const { data: txData, isLoading: loadingTx } = useQuery({
    queryKey: ["transactionsCount"],
    queryFn: getTotalTransactions,
    refetchInterval: 15000,
  });

  const { data: accountsData, isLoading: loadingAccounts } = useQuery({
    queryKey: ["accountsCount"],
    queryFn: getTotalAccounts,
    refetchInterval: 15000,
  });

  const { data: validatorsData, isLoading: loadingValidators } = useQuery({
    queryKey: ["validators"],
    queryFn: getValidators,
    refetchInterval: 30000,
  });

  return (
    <div className="space-y-10">
      <div className="bg-gray-800 rounded-xl p-6 shadow-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center md:text-left">
          Dashboard
        </h1>
        <SearchBox />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
      </div>

      <TransactionsChart />

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-white">Recent Blocks</h2>
        <BlocksList />
      </div>
    </div>
  );
}

export default Home;