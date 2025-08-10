import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20 bg-base-200">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
