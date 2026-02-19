import useAuth from "../auth/useAuth";

const Topbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-400 hover:text-white transition"
          aria-label="Toggle sidebar"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div>
          <h1 className="text-lg font-semibold">
            Welcome, {user?.name}
          </h1>
          <p className="text-xs text-gray-400 capitalize">
            Role: {user?.role}
          </p>
        </div>
      </div>

      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
