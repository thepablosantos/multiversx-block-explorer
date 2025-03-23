import { NavLink } from "react-router-dom";

function Navigation() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-[var(--accent-color)] font-semibold" : "hover:text-[var(--accent-color)]";

  return (
    <nav className="flex gap-6">
      <NavLink to="/" className={linkClasses}>Dashboard</NavLink>
      <NavLink to="/blocks" className={linkClasses}>Blocks</NavLink>
      <NavLink to="/transactions" className={linkClasses}>Transactions</NavLink>
      <NavLink to="/accounts" className={linkClasses}>Accounts</NavLink>
      <NavLink to="/validators" className={linkClasses}>Validators</NavLink>
      <NavLink to="/tokens" className={linkClasses}>Tokens</NavLink>
    </nav>
  );
}

export default Navigation;