import { useQuery } from "@tanstack/react-query";
import { getLatestBlocks } from "../api/multiversx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Definindo tipo para os blocos
type Block = {
  nonce: number;
  numTxs: number;
};

function TransactionsChart() {
  const { data, isLoading } = useQuery<Block[]>({
    queryKey: ["blocksForChart"],
    queryFn: () => getLatestBlocks(20),
    refetchInterval: 15000,
  });

  if (isLoading) return <p>Loading Chart...</p>;

  const chartData = data?.map((block) => ({
    name: block.nonce,
    transactions: block.numTxs,
  })) || [];

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-white">Transactions per Block</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: "#888" }} />
          <YAxis tick={{ fill: "#888" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#00FFB0"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TransactionsChart;