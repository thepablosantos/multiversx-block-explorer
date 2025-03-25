import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card-bg/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold rainbow-text">
              Degen Sentinels
            </Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`nav-link tracking-wide ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/blocks"
                className={`nav-link tracking-wide ${isActive('/blocks') ? 'active' : ''}`}
              >
                Blocks
              </Link>
              <Link
                to="/transactions"
                className={`nav-link tracking-wide ${isActive('/transactions') ? 'active' : ''}`}
              >
                Transactions
              </Link>
              <Link
                to="/accounts"
                className={`nav-link tracking-wide ${isActive('/accounts') ? 'active' : ''}`}
              >
                Accounts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}