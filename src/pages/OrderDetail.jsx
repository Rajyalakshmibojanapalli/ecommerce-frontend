import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery, useCancelOrderMutation } from "../features/orders/ordersApiSlice";
import { StatusBadge } from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import toast from "react-hot-toast";

export default function OrderDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetOrderByIdQuery(id);
  const [cancelOrder, { isLoading: cancelling }] = useCancelOrderMutation();

  const order = data?.data?.order;

  const handleCancel = async () => {
    if (!confirm("Cancel this order?")) return;
    try {
      await cancelOrder({ id, reason: "Changed my mind" }).unwrap();
      toast.success("Order cancelled");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  if (isLoading) return <div className="py-20"><Loader size="lg" /></div>;
  if (!order) return null;

  const canCancel = ["Pending", "Processing", "Confirmed"].includes(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Order #{order._id.slice(-8)}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <img src={item.image || "https://via.placeholder.com/60"}
                    className="w-16 h-16 rounded-lg object-cover" alt="" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-3">Shipping Address</h2>
            <p className="text-sm text-white">{order.shippingAddress.fullName}</p>
            <p className="text-sm text-gray-400">
              {order.shippingAddress.addressLine1}, {order.shippingAddress.city},
              {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </p>
            <p className="text-sm text-gray-500">{order.shippingAddress.phone}</p>
          </div>

          {/* Status History */}
          {order.statusHistory?.length > 0 && (
            <div className="bg-dark-card border border-dark-border rounded-xl p-5">
              <h2 className="text-lg font-semibold text-white mb-4">Order Timeline</h2>
              <div className="space-y-4">
                {order.statusHistory.map((s, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-white">{s.status}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(s.date).toLocaleString()} — {s.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card border border-dark-border rounded-xl p-5 sticky top-24 space-y-3">
            <h2 className="text-lg font-semibold text-white mb-2">Price Details</h2>
            <Row label="Items" value={`₹${order.itemsPrice?.toLocaleString()}`} />
            <Row label="Tax" value={`₹${order.taxPrice?.toLocaleString()}`} />
            <Row label="Shipping" value={order.shippingPrice === 0 ? "FREE" : `₹${order.shippingPrice}`} />
            {order.discountAmount > 0 && (
              <Row label="Discount" value={`-₹${order.discountAmount?.toLocaleString()}`} />
            )}
            <div className="border-t border-dark-border pt-3 flex justify-between">
              <span className="font-semibold text-white">Total</span>
              <span className="text-xl font-bold text-white">₹{order.totalAmount?.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-500">Payment: {order.paymentMethod}</p>
            <p className="text-sm text-gray-500">Paid: {order.isPaid ? "Yes ✅" : "No ❌"}</p>

            {canCancel && (
              <Button variant="danger" className="w-full mt-4" loading={cancelling}
                onClick={handleCancel}>
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}