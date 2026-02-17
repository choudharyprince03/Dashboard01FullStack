import useAuth from "../auth/useAuth";

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      
      <div>
        <h1 className="text-lg font-semibold">
          Welcome, {user?.name}
        </h1>
        <p className="text-xs text-gray-400 capitalize">
          Role: {user?.role}
        </p>
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
