import { useEffect, useState } from "react";
import { getAllUsers, promoteUser } from "../api/admin.api";
import UsersTable from "../components/UsersTable";
import usePermission from "../hooks/usePermission";
import { PERMISSIONS } from "../utils/Permissions";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const canPromote = usePermission(PERMISSIONS.PROMOTE_USERS);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data.users);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePromote = async (id) => {
    try {
      await promoteUser(id);
      loadUsers(); // refresh
    } catch (err) {
      alert(
        err.response?.data?.message || "Promotion failed"
      );
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <div className="text-white">Loading users...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="space-y-6">
      <UsersTable
        users={users}
        canPromote={canPromote}
        onPromote={handlePromote}
      />
    </div>
  );
};

export default Admin;
