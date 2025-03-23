import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">MultiversX Explorer</h1>
      <nav className="space-x-6">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/blocks" className="hover:underline">Blocks</Link>
        <Link to="/transactions" className="hover:underline">Transactions</Link>
        <Link to="/accounts" className="hover:underline">Accounts</Link>
        <Link to="/validators" className="hover:underline">Validators</Link>
      </nav>
    </header>
  );
}

export default Header;