import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Layout = () => {
  return (
    <div className="min-h-screen bg-main-bg text-white">
      <header className="p-4">
        <h1 className="text-center text-3xl font-bold mb-6">Degen Sentinels</h1>
        <Navigation />
      </header>
      <main className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
      <footer className="text-center p-4 opacity-50">
        © {new Date().getFullYear()} Degen Sentinels Explorer
      </footer>
    </div>
  );
};

export default Layout;