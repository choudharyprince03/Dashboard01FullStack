import { NavLink } from "react-router-dom";
import { PERMISSIONS } from "../utils/Permissions";
import usePermission from "../hooks/usePermission";

const Sidebar = () => {

  const canViewTasks = usePermission(PERMISSIONS.VIEW_TASKS);
  const canViewInsights = usePermission(PERMISSIONS.VIEW_AI_INSIGHTS);
  const canViewUsers = usePermission(PERMISSIONS.VIEW_USERS);

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-8">
        Dashboard
      </h2>

      <nav className="space-y-4">

          <NavLink to="/" className={linkStyle}>
            Dashboard
          </NavLink>

        {canViewTasks && (
          <NavLink to="/tasks" className={linkStyle}>
            Tasks
          </NavLink>
        )}

        {canViewInsights && (
          <NavLink to="/insights" className={linkStyle}>
            AI Insights
          </NavLink>
        )}

        {canViewUsers && (
          <NavLink to="/admin" className={linkStyle}>
            Admin
          </NavLink>
        )}

      </nav>
    </aside>
  );
};

const linkStyle = ({ isActive }) =>
  `block px-4 py-2 rounded-md transition ${
    isActive
      ? "bg-blue-600 text-white"
      : "text-gray-400 hover:bg-gray-800 hover:text-white"
  }`;

export default Sidebar;
