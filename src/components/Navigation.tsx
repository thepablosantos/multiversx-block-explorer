import { NavLink } from "react-router-dom";

const Navigation = () => {
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Blocks", path: "/blocks" },
    { name: "Transactions", path: "/transactions" },
    { name: "Accounts", path: "/accounts" },
    { name: "Validators", path: "/validators" },
  ];

  return (
    <nav className="flex justify-center space-x-8 bg-card-bg py-4 rounded-2xl shadow-lg">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `text-white px-4 py-2 rounded-xl transition-all duration-300 ${
              isActive ? "bg-accent" : "hover:bg-accent/50"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;