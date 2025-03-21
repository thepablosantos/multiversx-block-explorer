import BlocksList from "./components/BlocksList";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">MultiversX Block Explorer</h1>
      <BlocksList />
    </div>
  );
}

export default App;