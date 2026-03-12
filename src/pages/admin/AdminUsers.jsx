import { useState } from "react";
import { useGetAllUsersQuery, useToggleUserStatusMutation } from "../../features/dashboard/dashboardApiSlice";
import Badge from "../../components/ui/Badge";
import Loader from "../../components/ui/Loader";
import Pagination from "../../components/ui/Pagination";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetAllUsersQuery({ page, search });
  const [toggleStatus] = useToggleUserStatusMutation();

  const users = data?.data?.users || [];
  const pagination = data?.pagination;

  const handleToggle = async (id) => {
    try {
      const res = await toggleStatus(id).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  if (isLoading) return <Loader size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="bg-dark-light border border-dark-border rounded-lg px-4 py-2 
            text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary" />
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                {["User", "Email", "Role", "Status", "Joined", "Action"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-sm font-medium text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-dark-border/50 hover:bg-dark-lighter/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary text-sm font-semibold">
                          {u.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-white">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">{u.email}</td>
                  <td className="px-5 py-4">
                    <Badge color={u.role === "admin" ? "purple" : "blue"}>{u.role}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge color={u.isActive ? "green" : "red"}>
                      {u.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => handleToggle(u._id)}
                      className={`text-xs font-medium px-3 py-1 rounded-lg transition cursor-pointer
                        ${u.isActive
                          ? "text-red-400 bg-red-500/10 hover:bg-red-500/20"
                          : "text-primary bg-primary/10 hover:bg-primary/20"}`}>
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination pagination={pagination} onPageChange={setPage} />
    </div>
  );
}