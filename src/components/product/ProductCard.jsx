import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineHeart, HiHeart, HiOutlineShoppingCart, HiStar } from "react-icons/hi";
import { useAddToCartMutation } from "../../features/cart/cartApiSlice";
import { useToggleWishlistMutation, useGetWishlistQuery } from "../../features/auth/authApiSlice";
import { selectIsAuthenticated } from "../../features/auth/authSlice";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuthenticated);

  const [addToCart, { isLoading: adding }] = useAddToCartMutation();
  const [toggleWishlist] = useToggleWishlistMutation();

  // Check if wishlisted
  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !isAuth });
  const isWishlisted = wishlistData?.data?.wishlist?.some((w) => w._id === product._id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!isAuth) return navigate("/login");
    try {
      await addToCart({ productId: product._id, quantity: 1 }).unwrap();
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.data?.message || "Failed to add");
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!isAuth) return navigate("/login");
    try {
      await toggleWishlist(product._id).unwrap();
      toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  return (
    <Link to={`/products/${product.slug}`}
      className="group bg-dark-card border border-dark-border rounded-xl overflow-hidden 
        hover:border-primary/30 hover:glow transition-all duration-300">

      {/* Image */}
      <div className="relative aspect-square bg-dark-light overflow-hidden">
        <img src={product.images?.[0]?.url || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-primary text-black text-xs font-bold px-2 py-1 rounded-md">
            -{product.discount}%
          </span>
        )}

        <button onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 
            flex items-center justify-center text-white hover:bg-black/80 transition cursor-pointer">
          {isWishlisted
            ? <HiHeart className="w-5 h-5 text-red-500" />
            : <HiOutlineHeart className="w-5 h-5" />}
        </button>

        <button onClick={handleAddToCart} disabled={adding || product.stock === 0}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full gradient-primary 
            flex items-center justify-center text-black
            opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 
            transition-all duration-300 disabled:opacity-50 cursor-pointer">
          <HiOutlineShoppingCart className="w-5 h-5" />
        </button>

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-red-500 px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-primary font-medium mb-1">{product.category?.name || "General"}</p>
        <h3 className="text-sm font-medium text-white line-clamp-2 mb-2 
          group-hover:text-primary transition">{product.name}</h3>

        {product.ratingsCount > 0 && (
          <div className="flex items-center gap-1 mb-2">
            <HiStar className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-gray-400">
              {product.ratingsAverage} ({product.ratingsCount})
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">₹{product.price?.toLocaleString()}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-gray-500 line-through">₹{product.mrp?.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
  );
}