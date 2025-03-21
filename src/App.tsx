import { gql, useQuery } from "@apollo/client";

const GET_BLOCKS = gql`
  query {
    blocks(size: 5) {
      hash
      timestamp
      gasUsed
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_BLOCKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Blocks</h1>
      <ul>
        {data.blocks.map((block: {hash: string, timestamp: number, gasUsed: number}) => (
          <li key={block.hash} className="mb-2 p-2 border rounded">
            <p><strong>Hash:</strong> {block.hash}</p>
            <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
            <p><strong>Gas Used:</strong> {block.gasUsed}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;