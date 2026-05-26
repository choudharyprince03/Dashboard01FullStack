const UsersTable = ({ users, canPromote, onPromote }) => {
  if (!users.length) {
    return (
      <div className="text-[#7B8190]">
        No users found.
      </div>
    );
  }

  return (
    <div className="bg-[#F7F6F2] rounded-xl border border-[#D8D3C7] overflow-x-auto shadow-sm">
      <table className="w-full text-left text-sm min-w-[600px]">
        <thead className="bg-[#EDEAE2] text-[#5E6473]">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            {canPromote && (
              <th className="px-6 py-3">Actions</th>
            )}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#D8D3C7]">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-[#EDEAE2]">
              <td className="px-6 py-4 text-[#2C3040]">
                {user.name}
              </td>

              <td className="px-6 py-4 text-[#7B8190]">
                {user.email}
              </td>

              <td className="px-6 py-4">
                <span className="px-3 py-1 text-xs rounded-full bg-[#DFE8DC] text-[#48684F] border border-[#C6D7C2]">
                  {user.role}
                </span>
              </td>

              {canPromote && (
                <td className="px-6 py-4">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => onPromote(user._id)}
                      className="bg-[#6B8F71] hover:bg-[#5F8065] px-3 py-1 rounded text-white text-xs"
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
