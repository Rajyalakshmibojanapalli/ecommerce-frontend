import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cart/cartSlice";
import {
  useGetCartQuery, useUpdateCartItemMutation,
  useRemoveFromCartMutation, useClearCartMutation,
} from "../features/cart/cartApiSlice";
import Button from "../components/ui/Button";
import Empty from "../components/ui/Empty";
import Loader from "../components/ui/Loader";
import toast from "react-hot-toast";
import { HiMinus, HiPlus, HiOutlineTrash, HiOutlineShoppingCart } from "react-icons/hi";

export default function Cart() {
  const navigate = useNavigate();
  const { isLoading } = useGetCartQuery();
  const cart = useSelector(selectCart);

  const [updateItem] = useUpdateCartItemMutation();
  const [removeItem] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  const handleUpdateQty = async (productId, qty) => {
    try {
      await updateItem({ productId, quantity: qty }).unwrap();
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeItem(productId).unwrap();
      toast.success("Item removed");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  const handleClear = async () => {
    await clearCart().unwrap();
    toast.success("Cart cleared");
  };

  if (isLoading) return <div className="py-20"><Loader size="lg" /></div>;

  if (!cart?.items?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Empty icon={HiOutlineShoppingCart} title="Your cart is empty"
          description="Add some products to get started" actionLabel="Shop Now" actionLink="/products" />
      </div>
    );
  }

  const shippingPrice = cart.totalPrice > 500 ? 0 : 50;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-8">Shopping Cart ({cart.totalItems} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item._id}
              className="bg-dark-card border border-dark-border rounded-xl p-4 flex gap-4 items-center">
              <Link to={`/products/${item.product?.slug}`} className="flex-shrink-0">
                <img src={item.product?.images?.[0]?.url || "https://via.placeholder.com/100"}
                  alt={item.product?.name} className="w-24 h-24 object-cover rounded-lg" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.product?.slug}`}>
                  <h3 className="text-sm font-medium text-white hover:text-primary transition line-clamp-2">
                    {item.product?.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-white mt-2">
                  ₹{item.price?.toLocaleString()}
                  {item.product?.mrp > item.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{item.product?.mrp?.toLocaleString()}
                    </span>
                  )}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-dark-border rounded-lg">
                    <button onClick={() => handleUpdateQty(item.product._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition cursor-pointer">
                      <HiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium text-white">{item.quantity}</span>
                    <button onClick={() => handleUpdateQty(item.product._id, item.quantity + 1)}
                      disabled={item.quantity >= (item.product?.stock || 10)}
                      className="p-2 text-gray-400 hover:text-white disabled:opacity-30 transition cursor-pointer">
                      <HiPlus className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => handleRemove(item.product._id)}
                    className="p-2 text-gray-500 hover:text-red-400 transition cursor-pointer">
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleClear}
            className="text-sm text-red-400 hover:text-red-300 transition cursor-pointer">
            Clear All Items
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-dark-card border border-dark-border rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal ({cart.totalItems} items)</span>
                <span className="text-white">₹{cart.totalPrice?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className="text-primary">{shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}</span>
              </div>
              <div className="border-t border-dark-border pt-3 flex justify-between">
                <span className="font-semibold text-white">Total</span>
                <span className="font-bold text-xl text-white">
                  ₹{(cart.totalPrice + shippingPrice).toLocaleString()}
                </span>
              </div>
            </div>
            <Button onClick={() => navigate("/checkout")} className="w-full" size="lg">
              Proceed to Checkout
            </Button>
            <Link to="/products"
              className="block text-center text-sm text-gray-400 hover:text-primary mt-4 transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}