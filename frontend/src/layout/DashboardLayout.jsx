import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen relative overflow-hidden bg-gray-50 dark:bg-[#0A0F1C] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Vibrant background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/30 dark:bg-blue-600/20 blur-[120px] pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-300/30 dark:bg-purple-600/20 blur-[120px] pointer-events-none transition-colors duration-500" />
      
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
