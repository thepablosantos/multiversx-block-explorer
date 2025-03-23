import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import BlockDetail from "./pages/BlockDetail";
import TransactionDetail from "./pages/TransactionDetail";
import AccountDetail from "./pages/AccountDetail";
import ValidatorDetail from "./pages/ValidatorDetail";
import TokenDetail from "./pages/TokenDetail";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/block/:hash" element={<BlockDetail />} />
        <Route path="/transaction/:hash" element={<TransactionDetail />} />
        <Route path="/account/:address" element={<AccountDetail />} />
        <Route path="/validator/:key" element={<ValidatorDetail />} />
        <Route path="/token/:id" element={<TokenDetail />} />
      </Routes>
    </div>
  );
}

export default App;