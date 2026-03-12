import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../features/orders/ordersApiSlice";
import { StatusBadge } from "../components/ui/Badge";
import Loader from "../components/ui/Loader";
import Empty from "../components/ui/Empty";
import Pagination from "../components/ui/Pagination";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function MyOrders() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyOrdersQuery({ page });

  const orders = data?.data?.orders || [];
  const pagination = data?.pagination;

  if (isLoading) return <div className="py-20"><Loader size="lg" /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <Empty icon={HiOutlineClipboardList} title="No orders yet"
          description="Start shopping" actionLabel="Shop Now" />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order._id} to={`/order/${order._id}`}
              className="block bg-dark-card border border-dark-border rounded-xl p-5 
                hover:border-primary/30 transition">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">Order #{order._id.slice(-8)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex items-center gap-3">
                {order.orderItems.slice(0, 3).map((item, i) => (
                  <img key={i} src={item.image || "https://via.placeholder.com/50"}
                    className="w-12 h-12 rounded-lg object-cover border border-dark-border" alt="" />
                ))}
                {order.orderItems.length > 3 && (
                  <span className="text-xs text-gray-500">+{order.orderItems.length - 3} more</span>
                )}
                <span className="ml-auto text-lg font-bold text-white">
                  ₹{order.totalAmount?.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Pagination pagination={pagination} onPageChange={setPage} />
    </div>
  );
}