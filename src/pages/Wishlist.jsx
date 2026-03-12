// pages/Wishlist.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
  useMoveToCartMutation,
} from "../features/wishlist/wishlistApiSlice";
import {
  HiOutlineHeart,
  HiOutlineTrash,
  HiOutlineShoppingCart,
  HiOutlineArrowRight,
  HiOutlineEmojiSad,
} from "react-icons/hi";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { data, isLoading, refetch } = useGetWishlistQuery();
  const [removeFromWishlist, { isLoading: removing }] = useRemoveFromWishlistMutation();
  const [clearWishlist, { isLoading: clearing }] = useClearWishlistMutation();
  const [moveToCart, { isLoading: moving }] = useMoveToCartMutation();
  const [removingId, setRemovingId] = useState(null);
  const [movingId, setMovingId] = useState(null);

  const items = data?.data?.wishlist?.products || [];

  const handleRemove = async (productId) => {
    setRemovingId(productId);
    try {
      await removeFromWishlist(productId).unwrap();
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to remove");
    }
    setRemovingId(null);
  };

  const handleMoveToCart = async (productId) => {
    setMovingId(productId);
    try {
      await moveToCart(productId).unwrap();
      toast.success("Moved to cart!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to move");
    }
    setMovingId(null);
  };

  const handleClearAll = async () => {
    if (!window.confirm("Clear entire wishlist?")) return;
    try {
      await clearWishlist().unwrap();
      toast.success("Wishlist cleared");
    } catch {
      toast.error("Failed to clear");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white/[.03] rounded-2xl aspect-[3/4] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            MY <span className="text-primary">WISHLIST</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {items.length} {items.length === 1 ? "item" : "items"} saved
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={handleClearAll}
            disabled={clearing}
            className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 bg-red-500/10
              border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all
              disabled:opacity-50 cursor-pointer"
          >
            <HiOutlineTrash className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Empty */}
      {items.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/[.03] border border-white/[.06]
            flex items-center justify-center">
            <HiOutlineHeart className="w-10 h-10 text-gray-700" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Start saving your favorite items by tapping the heart icon on products.
          </p>
          <Link to="/products">
            <button className="px-8 py-3 bg-primary text-black font-bold rounded-xl
              hover:shadow-[0_0_25px_rgba(0,255,136,.3)] transition-all hover:scale-105">
              Explore Products <HiOutlineArrowRight className="inline w-4 h-4 ml-1" />
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map(({ product, addedAt }) => {
            if (!product) return null;
            const outOfStock = product.stock < 1;

            return (
              <div
                key={product._id}
                className="group bg-white/[.02] border border-white/[.06] rounded-2xl
                  overflow-hidden hover:border-primary/20 transition-all duration-500"
              >
                {/* Image */}
                <Link to={`/products/${product.slug || product._id}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
                    <img
                      src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700
                        group-hover:scale-110"
                    />
                    {outOfStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-xs font-bold text-red-400 bg-red-500/20
                          px-3 py-1 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {/* Rating */}
                    {product.averageRating > 0 && (
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm
                        px-2 py-1 rounded-lg flex items-center gap-1">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-white text-xs font-bold">
                          {product.averageRating?.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4">
                  <Link to={`/products/${product.slug || product._id}`}>
                    <h3 className="text-sm font-bold text-white line-clamp-2 mb-1
                      group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-primary font-black text-lg">
                    ₹{product.price?.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-gray-600 mt-1">
                    Added {new Date(addedAt).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleMoveToCart(product._id)}
                      disabled={outOfStock || movingId === product._id}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5
                        bg-primary text-black text-xs font-bold rounded-xl
                        hover:shadow-[0_0_20px_rgba(0,255,136,.2)] transition-all
                        disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <HiOutlineShoppingCart className="w-4 h-4" />
                      {movingId === product._id ? "Moving..." : "Add to Cart"}
                    </button>
                    <button
                      onClick={() => handleRemove(product._id)}
                      disabled={removingId === product._id}
                      className="p-2.5 rounded-xl border border-white/10 text-gray-400
                        hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10
                        transition-all cursor-pointer disabled:opacity-40"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}