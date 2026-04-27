import { NavLink } from "react-router-dom";
import { PERMISSIONS } from "../utils/Permissions";
import usePermission from "../hooks/usePermission";
import { LayoutDashboard, CheckSquare, Sparkles, Users, X } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {

  const canViewTasks = usePermission(PERMISSIONS.VIEW_TASKS);
  const canViewInsights = usePermission(PERMISSIONS.VIEW_AI_INSIGHTS);
  const canViewUsers = usePermission(PERMISSIONS.VIEW_USERS);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm md:hidden z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-72 bg-white/80 dark:bg-[#0A0F1C]/80 backdrop-blur-2xl border-r border-gray-200 dark:border-white/5 p-6 h-screen z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:block shadow-2xl md:shadow-none flex flex-col transition-colors`}
      >
        <div className="flex items-center justify-between mb-10 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
              Nexus
            </h2>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
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
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors" />
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
      ? "bg-blue-50 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.05)] dark:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100"
  }`;

export default Sidebar;
