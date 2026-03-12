import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cart/cartSlice";
import { useGetAddressesQuery, useAddAddressMutation } from "../features/auth/authApiSlice";
import { useCreateOrderMutation } from "../features/orders/ordersApiSlice";
import { useValidateCouponMutation } from "../features/coupons/couponsApiSlice";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useSelector(selectCart);

  const { data: addrData } = useGetAddressesQuery();
  const addresses = addrData?.data?.addresses || [];

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [addingNew, setAddingNew] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: "", phone: "", addressLine1: "", addressLine2: "",
    city: "", state: "", pincode: "", country: "India",
  });

  const [addAddress] = useAddAddressMutation();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [validateCoupon] = useValidateCouponMutation();

  // Auto select default
  if (!selectedAddress && addresses.length > 0) {
    const def = addresses.find((a) => a.isDefault) || addresses[0];
    setSelectedAddress(def);
  }

  const handleApplyCoupon = async () => {
    try {
      const res = await validateCoupon({ code: couponCode, orderAmount: cart?.totalPrice }).unwrap();
      setDiscount(res.data.discount);
      toast.success(`Coupon applied! ₹${res.data.discount} off`);
    } catch (err) {
      setDiscount(0);
      toast.error(err.data?.message || "Invalid coupon");
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await addAddress(newAddr).unwrap();
      setSelectedAddress(res.data.address);
      setAddingNew(false);
      toast.success("Address added");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return toast.error("Select a delivery address");
    try {
      const res = await createOrder({
        shippingAddress: {
          fullName: selectedAddress.fullName, phone: selectedAddress.phone,
          addressLine1: selectedAddress.addressLine1, addressLine2: selectedAddress.addressLine2,
          city: selectedAddress.city, state: selectedAddress.state,
          pincode: selectedAddress.pincode, country: selectedAddress.country,
        },
        paymentMethod,
        couponCode: discount > 0 ? couponCode : "",
      }).unwrap();
      toast.success("Order placed!");
      navigate(`/order/${res.data.order._id}`);
    } catch (err) {
      toast.error(err.data?.message || "Order failed");
    }
  };

  if (!cart?.items?.length) { navigate("/cart"); return null; }

  const taxPrice = Math.round(cart.totalPrice * 0.18);
  const shippingPrice = cart.totalPrice > 500 ? 0 : 50;
  const totalAmount = cart.totalPrice + taxPrice + shippingPrice - discount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Addresses */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Delivery Address</h2>
            <div className="space-y-3">
              {addresses.map((addr) => (
                <label key={addr._id}
                  className={`block p-4 rounded-lg border cursor-pointer transition
                    ${selectedAddress?._id === addr._id ? "border-primary bg-primary/5" : "border-dark-border hover:border-gray-600"}`}>
                  <input type="radio" name="address" className="hidden"
                    checked={selectedAddress?._id === addr._id}
                    onChange={() => setSelectedAddress(addr)} />
                  <p className="text-sm font-medium text-white">{addr.fullName}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {addr.addressLine1}, {addr.city}, {addr.state} - {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-500">{addr.phone}</p>
                </label>
              ))}
            </div>
            <button onClick={() => setAddingNew(!addingNew)}
              className="text-sm text-primary hover:underline mt-4 cursor-pointer">
              + Add New Address
            </button>
            {addingNew && (
              <form onSubmit={handleAddAddress} className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Full Name" value={newAddr.fullName}
                    onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })} required />
                  <Input placeholder="Phone" value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })} required />
                </div>
                <Input placeholder="Address Line 1" value={newAddr.addressLine1}
                  onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })} required />
                <Input placeholder="Address Line 2" value={newAddr.addressLine2}
                  onChange={(e) => setNewAddr({ ...newAddr, addressLine2: e.target.value })} />
                <div className="grid grid-cols-3 gap-3">
                  <Input placeholder="City" value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} required />
                  <Input placeholder="State" value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })} required />
                  <Input placeholder="Pincode" value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })} required />
                </div>
                <Button type="submit" size="sm">Save Address</Button>
              </form>
            )}
          </div>

          {/* Payment */}
          <div className="bg-dark-card border border-dark-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
            <div className="space-y-3">
              {[
                { value: "COD", label: "Cash on Delivery", desc: "Pay when you receive" },
                { value: "ONLINE", label: "Online Payment", desc: "UPI / Card / NetBanking" },
              ].map((m) => (
                <label key={m.value}
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition
                    ${paymentMethod === m.value ? "border-primary bg-primary/5" : "border-dark-border hover:border-gray-600"}`}>
                  <input type="radio" name="payment" value={m.value}
                    checked={paymentMethod === m.value}
                    onChange={(e) => setPaymentMethod(e.target.value)} className="accent-green-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{m.label}</p>
                    <p className="text-xs text-gray-500">{m.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img src={item.product?.images?.[0]?.url || "https://via.placeholder.com/50"}
                    className="w-12 h-12 object-cover rounded-lg" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300 line-clamp-1">{item.product?.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-4">
              <input type="text" value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Coupon Code"
                className="flex-1 bg-dark-light border border-dark-border rounded-lg px-3 py-2 
                  text-sm text-white focus:outline-none focus:border-primary" />
              <Button onClick={handleApplyCoupon} variant="outline" size="sm">Apply</Button>
            </div>

            <div className="space-y-2 border-t border-dark-border pt-4 mb-4">
              <Row label="Items" value={`₹${cart.totalPrice?.toLocaleString()}`} />
              <Row label="Tax (18%)" value={`₹${taxPrice.toLocaleString()}`} />
              <Row label="Shipping" value={shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`} green />
              {discount > 0 && <Row label="Discount" value={`-₹${discount.toLocaleString()}`} green />}
              <div className="border-t border-dark-border pt-3 flex justify-between">
                <span className="font-semibold text-white">Total</span>
                <span className="text-xl font-bold text-white">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <Button onClick={handlePlaceOrder} loading={isLoading} className="w-full" size="lg">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, green }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={green ? "text-primary" : "text-white"}>{value}</span>
    </div>
  );
}