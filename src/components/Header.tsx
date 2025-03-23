import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Blocks } from "lucide-react";

function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    const isHex = /^[a-fA-F0-9]+$/.test(trimmedQuery);
    const isAddress = /^erd1[a-zA-Z0-9]{58}$/.test(trimmedQuery);
    const isValidatorKey = /^.*@.*$/.test(trimmedQuery);
    const isTokenId = /^[A-Z0-9\\-]+-[a-zA-Z0-9]{6}$/.test(trimmedQuery);

    if (isAddress) {
      navigate(`/account/${trimmedQuery}`);
    } else if (isValidatorKey) {
      navigate(`/validator/${trimmedQuery}`);
    } else if (isTokenId) {
      navigate(`/token/${trimmedQuery}`);
    } else if (isHex && trimmedQuery.length === 64) {
      navigate(`/block/${trimmedQuery}`);
    } else {
      alert("Input format not recognized!");
    }
  };

  return (
    <header className="bg-gray-800 p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-md">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <Blocks size={28} />
        <h1 className="text-xl font-bold">MultiversX Explorer</h1>
        <nav className="hidden md:flex gap-6 ml-10">
          <Link to="/" className="hover:text-green-400">Dashboard</Link>
          <Link to="/blocks" className="hover:text-green-400">Blocks</Link>
          <Link to="/transactions" className="hover:text-green-400">Transactions</Link>
          <Link to="/accounts" className="hover:text-green-400">Accounts</Link>
          <Link to="/validators" className="hover:text-green-400">Validators</Link>
          <Link to="/tokens" className="hover:text-green-400">Tokens</Link>
        </nav>
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search by hash, address, validator key, token id..."
          className="rounded-lg p-2 text-black flex-grow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600 transition"
        >
          <Search size={16} />
          Search
        </button>
      </div>
    </header>
  );
}

export default Header;