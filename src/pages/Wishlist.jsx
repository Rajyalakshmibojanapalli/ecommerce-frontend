import { useGetWishlistQuery } from "../features/auth/authApiSlice";
import ProductGrid from "../components/product/ProductGrid";
import Empty from "../components/ui/Empty";
import Loader from "../components/ui/Loader";
import { HiOutlineHeart } from "react-icons/hi";

export default function Wishlist() {
  const { data, isLoading } = useGetWishlistQuery();
  const products = data?.data?.wishlist || [];

  if (isLoading) return <div className="py-20"><Loader size="lg" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-8">My Wishlist</h1>
      {products.length === 0 ? (
        <Empty icon={HiOutlineHeart} title="Wishlist is empty"
          description="Save your favorite products" actionLabel="Browse Products" />
      ) : (
        <ProductGrid products={products} loading={false} />
      )}
    </div>
  );
}