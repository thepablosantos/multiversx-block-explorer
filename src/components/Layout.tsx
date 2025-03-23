import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;