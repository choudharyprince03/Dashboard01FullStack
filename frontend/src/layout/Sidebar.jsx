import { NavLink } from "react-router-dom";
import { PERMISSIONS } from "../utils/Permissions";
import usePermission from "../hooks/usePermission";

const Sidebar = ({ isOpen, onClose }) => {

  const canViewTasks = usePermission(PERMISSIONS.VIEW_TASKS);
  const canViewInsights = usePermission(PERMISSIONS.VIEW_AI_INSIGHTS);
  const canViewUsers = usePermission(PERMISSIONS.VIEW_USERS);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 bg-gray-900 border-r border-gray-800 p-6 h-screen z-50 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:block`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="space-y-4">
          <NavLink to="/" className={linkStyle} onClick={onClose}>
            Dashboard
          </NavLink>

          {canViewTasks && (
            <NavLink to="/tasks" className={linkStyle} onClick={onClose}>
              Tasks
            </NavLink>
          )}

          {canViewInsights && (
            <NavLink to="/insights" className={linkStyle} onClick={onClose}>
              AI Insights
            </NavLink>
          )}

          {canViewUsers && (
            <NavLink to="/admin" className={linkStyle} onClick={onClose}>
              Admin
            </NavLink>
          )}
        </nav>
      </aside>
    </>
  );
};

const linkStyle = ({ isActive }) =>
  `block px-4 py-2 rounded-md transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-400 hover:bg-gray-800 hover:text-white"
  }`;

export default Sidebar;
