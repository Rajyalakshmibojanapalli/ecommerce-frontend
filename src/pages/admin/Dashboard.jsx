import { useGetDashboardStatsQuery } from "../../features/dashboard/dashboardApiSlice";
import StatsCard from "../../components/admin/StatsCard";
import { StatusBadge } from "../../components/ui/Badge";
import Loader from "../../components/ui/Loader";
import {
  HiOutlineUsers, HiOutlineShoppingBag,
  HiOutlineClipboardList, HiOutlineCurrencyRupee,
} from "react-icons/hi";

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardStatsQuery();
  const stats = data?.data;

  if (isLoading) return <Loader size="lg" className="py-20" />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Revenue" value={`₹${stats?.totalRevenue?.toLocaleString()}`}
          icon={HiOutlineCurrencyRupee} color="primary" />
        <StatsCard title="Orders" value={stats?.totalOrders}
          icon={HiOutlineClipboardList} color="blue" />
        <StatsCard title="Products" value={stats?.totalProducts}
          icon={HiOutlineShoppingBag} color="purple" />
        <StatsCard title="Users" value={stats?.totalUsers}
          icon={HiOutlineUsers} color="yellow" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-card border border-dark-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {stats?.recentOrders?.map((o) => (
              <div key={o._id} className="flex items-center justify-between py-2 
                border-b border-dark-border/50 last:border-0">
                <div>
                  <p className="text-sm text-white">#{o._id.slice(-6)}</p>
                  <p className="text-xs text-gray-500">{o.user?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">₹{o.totalAmount?.toLocaleString()}</p>
                  <StatusBadge status={o.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-card border border-dark-border rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">⚠️ Low Stock</h2>
          <div className="space-y-3">
            {stats?.lowStockProducts?.map((p) => (
              <div key={p._id} className="flex items-center justify-between py-2 
                border-b border-dark-border/50 last:border-0">
                <p className="text-sm text-white">{p.name}</p>
                <span className={`text-sm font-bold ${p.stock <= 5 ? "text-red-400" : "text-yellow-400"}`}>
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}