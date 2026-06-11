import { Outlet } from "react-router-dom";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-brand-ivory text-brand-text flex flex-col">
      <Navbar />
      <main className="flex-1" data-testid="page-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}