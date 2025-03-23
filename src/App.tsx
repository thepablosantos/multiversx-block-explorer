import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import BlockDetail from "./pages/BlockDetail";
import TransactionDetail from "./pages/TransactionDetail";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/block/:hash" element={<BlockDetail />} />
        <Route path="/transaction/:hash" element={<TransactionDetail />} />
        {/* Futuras páginas */}
        <Route path="/account/:address" element={<div>Account Details Page (coming soon)</div>} />
        <Route path="/validator/:key" element={<div>Validator Details Page (coming soon)</div>} />
        <Route path="/token/:id" element={<div>Token Details Page (coming soon)</div>} />
      </Routes>
    </div>
  );
}

export default App;