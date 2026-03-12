import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "../../features/orders/ordersApiSlice";
import { StatusBadge } from "../../components/ui/Badge";
import Loader from "../../components/ui/Loader";
import Pagination from "../../components/ui/Pagination";
import toast from "react-hot-toast";

const statuses = ["Processing", "Confirmed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

export default function AdminOrders() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const params = { page };
  if (statusFilter) params.status = statusFilter;

  const { data, isLoading } = useGetAllOrdersQuery(params);
  const [updateStatus] = useUpdateOrderStatusMutation();

  const orders = data?.data?.orders || [];
  const pagination = data?.pagination;

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  if (isLoading) return <Loader size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <select value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="bg-dark-light border border-dark-border rounded-lg px-3 py-2 
            text-sm text-white cursor-pointer focus:outline-none focus:border-primary">
          <option value="">All Status</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                {["Order", "Customer", "Amount", "Status", "Update", "Date"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-sm font-medium text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-dark-border/50 hover:bg-dark-lighter/30">
                  <td className="px-5 py-4">
                    <Link to={`/admin/orders/${order._id}`}
                      className="text-sm text-primary hover:underline">
                      #{order._id.slice(-8)}
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm text-white">{order.user?.name}</td>
                  <td className="px-5 py-4 text-sm text-white font-medium">
                    ₹{order.totalAmount?.toLocaleString()}
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-4">
                    <select value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="bg-dark-light border border-dark-border rounded-lg px-2 py-1 
                        text-xs text-white cursor-pointer focus:outline-none focus:border-primary">
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
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