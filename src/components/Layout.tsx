import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;