import { NavLink } from "react-router-dom";

function Navigation() {
  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/blocks", label: "Blocks" },
    { to: "/transactions", label: "Transactions" },
    { to: "/accounts", label: "Accounts" },
    { to: "/validators", label: "Validators" },
  ];

  return (
    <nav className="bg-card-bg/50 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-end h-16 space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-text-secondary hover:text-accent transition-colors duration-200 relative group text-base font-medium tracking-wide ${
                  isActive ? "text-accent" : ""
                }`
              }
            >
              {item.label}
              <div className="absolute -bottom-[1px] left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;