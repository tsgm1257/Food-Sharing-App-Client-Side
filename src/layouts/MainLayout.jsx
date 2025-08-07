import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 min-h-[calc(100vh-200px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
