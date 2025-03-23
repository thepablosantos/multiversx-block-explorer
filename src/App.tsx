import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Rotas futuras */}
        <Route path="/block/:hash" element={<div>Block Details Page (coming soon)</div>} />
        <Route path="/transaction/:hash" element={<div>Transaction Details Page (coming soon)</div>} />
        <Route path="/account/:address" element={<div>Account Details Page (coming soon)</div>} />
        <Route path="/validator/:key" element={<div>Validator Details Page (coming soon)</div>} />
        <Route path="/token/:id" element={<div>Token Details Page (coming soon)</div>} />
      </Routes>
    </div>
  );
}

export default App;