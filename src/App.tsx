import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BlockDetail from "./pages/BlockDetail";
import TransactionDetail from "./pages/TransactionDetail";
import AccountDetail from "./pages/AccountDetail";
import ValidatorDetail from "./pages/ValidatorDetail";
import TokenDetail from "./pages/TokenDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="block/:hash" element={<BlockDetail />} />
        <Route path="transaction/:hash" element={<TransactionDetail />} />
        <Route path="account/:address" element={<AccountDetail />} />
        <Route path="validator/:key" element={<ValidatorDetail />} />
        <Route path="token/:id" element={<TokenDetail />} />
        {/* Páginas futuras podem ser adicionadas aqui */}
      </Route>
    </Routes>
  );
}

export default App;