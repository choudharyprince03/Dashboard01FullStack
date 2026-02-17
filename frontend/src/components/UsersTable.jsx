const UsersTable = ({ users, canPromote, onPromote }) => {
  if (!users.length) {
    return (
      <div className="text-gray-400">
        No users found.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            {canPromote && (
              <th className="px-6 py-3">Actions</th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-800">
              <td className="px-6 py-4 text-white">
                {user.name}
              </td>

              <td className="px-6 py-4 text-gray-400">
                {user.email}
              </td>

              <td className="px-6 py-4">
                <span className="px-3 py-1 text-xs rounded-full bg-blue-600 text-white">
                  {user.role}
                </span>
              </td>

              {canPromote && (
                <td className="px-6 py-4">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => onPromote(user._id)}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-xs"
                    >
                      Promote
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
