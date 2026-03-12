import ProductCard from "./ProductCard";
import Loader from "../ui/Loader";
import Empty from "../ui/Empty";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default function ProductGrid({ products, loading }) {
  if (loading) return <div className="py-20"><Loader size="lg" /></div>;

  if (!products?.length) {
    return <Empty icon={HiOutlineShoppingBag} title="No products found"
      description="Try adjusting your filters" actionLabel="Browse All" actionLink="/products" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}