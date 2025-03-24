import { Link, Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function Layout() {
  return (
    <div className="min-h-screen bg-main-bg">
      <header className="border-b border-card-bg/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.svg" alt="MultiversX" className="h-8" />
              <span className="text-xl font-bold text-text-primary">Explorer</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-200">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                Mainnet
              </button>
              <button className="text-text-secondary hover:text-accent transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Navigation />
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;