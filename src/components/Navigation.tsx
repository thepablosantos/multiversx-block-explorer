import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="flex items-center justify-center gap-8 py-4">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-text-secondary hover:text-accent transition-colors duration-200 ${
            isActive ? "text-accent" : ""
          }`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/blocks"
        className={({ isActive }) =>
          `text-text-secondary hover:text-accent transition-colors duration-200 ${
            isActive ? "text-accent" : ""
          }`
        }
      >
        Blocks
      </NavLink>
      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          `text-text-secondary hover:text-accent transition-colors duration-200 ${
            isActive ? "text-accent" : ""
          }`
        }
      >
        Transactions
      </NavLink>
      <NavLink
        to="/accounts"
        className={({ isActive }) =>
          `text-text-secondary hover:text-accent transition-colors duration-200 ${
            isActive ? "text-accent" : ""
          }`
        }
      >
        Accounts
      </NavLink>
      <NavLink
        to="/validators"
        className={({ isActive }) =>
          `text-text-secondary hover:text-accent transition-colors duration-200 ${
            isActive ? "text-accent" : ""
          }`
        }
      >
        Validators
      </NavLink>
    </nav>
  );
}

export default Navigation;