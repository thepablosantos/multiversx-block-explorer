import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

function Header() {
  return (
    <header className="bg-[#1f2125] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-accent">
          Degen Sentinels
        </Link>
        <nav className="hidden md:flex gap-6 text-white">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-accent font-semibold" : "hover:text-accent"}>
            Dashboard
          </NavLink>
          <NavLink to="/blocks" className={({ isActive }) => isActive ? "text-accent font-semibold" : "hover:text-accent"}>
            Blocks
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => isActive ? "text-accent font-semibold" : "hover:text-accent"}>
            Transactions
          </NavLink>
          <NavLink to="/accounts" className={({ isActive }) => isActive ? "text-accent font-semibold" : "hover:text-accent"}>
            Accounts
          </NavLink>
          <NavLink to="/validators" className={({ isActive }) => isActive ? "text-accent font-semibold" : "hover:text-accent"}>
            Validators
          </NavLink>
        </nav>
        <button className="md:hidden text-white">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}

export default Header;