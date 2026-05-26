import { NavLink } from "react-router-dom";
import { PERMISSIONS } from "../utils/Permissions";
import usePermission from "../hooks/usePermission";
import { LayoutDashboard, CheckSquare, Sparkles, Users, X, Orbit } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {

  const canViewTasks = usePermission(PERMISSIONS.VIEW_TASKS);
  const canViewInsights = usePermission(PERMISSIONS.VIEW_AI_INSIGHTS);
  const canViewUsers = usePermission(PERMISSIONS.VIEW_USERS);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#2C3040]/30 backdrop-blur-sm md:hidden z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-72 bg-[#EDEAE2]/95 backdrop-blur-2xl border-r border-[#D8D3C7] p-6 h-screen z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:block shadow-2xl md:shadow-none flex flex-col transition-colors`}
      >
        <div className="flex items-center justify-between mb-10 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#6B8F71] flex items-center justify-center shadow-sm">
              <Orbit className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <h2 className="text-2xl font-bold text-[#2C3040]">
              Nexus
            </h2>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-[#8A8F9E] hover:text-[#2C3040] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          <NavLink to="/" className={linkStyle} onClick={onClose}>
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          {canViewTasks && (
            <NavLink to="/tasks" className={linkStyle} onClick={onClose}>
              <CheckSquare className="w-5 h-5" />
              <span>Tasks</span>
            </NavLink>
          )}

          {canViewInsights && (
            <NavLink to="/insights" className={linkStyle} onClick={onClose}>
              <Sparkles className="w-5 h-5 text-[#6B8F71] group-hover:text-[#56765C] transition-colors" />
              <span>AI Insights</span>
            </NavLink>
          )}

          {canViewUsers && (
            <NavLink to="/admin" className={linkStyle} onClick={onClose}>
              <Users className="w-5 h-5" />
              <span>Admin</span>
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
};

const linkStyle = ({ isActive }) =>
  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
    isActive
      ? "bg-[#DFE8DC] text-[#48684F] border border-[#C6D7C2] shadow-sm"
      : "text-[#5E6473] hover:bg-[#F7F6F2] hover:text-[#2C3040]"
  }`;

export default Sidebar;
