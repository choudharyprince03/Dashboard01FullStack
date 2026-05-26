import useAuth from "../auth/useAuth";
import { Menu, LogOut, User } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-[#F7F6F2]/90 backdrop-blur-xl border-b border-[#D8D3C7] flex items-center justify-between px-8 sticky top-0 z-30 transition-colors duration-300">
      
      <div className="flex items-center gap-6">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl bg-[#EDEAE2] text-[#5E6473] hover:text-[#2C3040] hover:bg-[#E3DED2] transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-xl font-bold text-[#2C3040] transition-colors duration-300">
            Welcome back, {user?.name || "User"}
          </h1>
          <p className="text-sm text-[#6B8F71] font-medium capitalize mt-0.5">
            {user?.role || "Guest"} Account
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* User Avatar Placeholder */}
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-[#EDEAE2] border border-[#D8D3C7] transition-colors duration-300">
          <div className="w-8 h-8 rounded-full bg-[#6B8F71] flex items-center justify-center shadow-inner">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-[#3D4354] transition-colors duration-300">{user?.name || "Profile"}</span>
        </div>

        <button
          onClick={logout}
          className="group flex items-center gap-2 bg-[#F4E6E4] hover:bg-[#EBD6D2] text-[#A7625B] hover:text-[#8F4F49] border border-[#E1C1BC] px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
