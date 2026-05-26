import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen relative overflow-hidden bg-[#F7F6F2] text-[#2C3040] transition-colors duration-300">
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* the dashboardLayout children will come inside the Outlet  */}
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
