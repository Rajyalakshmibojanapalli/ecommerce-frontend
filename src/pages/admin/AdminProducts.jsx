import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery, useDeleteProductMutation } from "../../features/products/productsApiSlice";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Loader from "../../components/ui/Loader";
import Pagination from "../../components/ui/Pagination";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

export default function AdminProducts() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductsQuery({ page, limit: 20 });
  const [deleteProduct] = useDeleteProductMutation();

  const products = data?.data?.products || [];
  const pagination = data?.pagination;

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  if (isLoading) return <Loader size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <Link to="/admin/products/new">
          <Button><HiOutlinePlus className="w-5 h-5" /> Add Product</Button>
        </Link>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-border">
                {["Product", "Price", "Stock", "Category", "Actions"].map((h) => (
                  <th key={h} className={`${h === "Actions" ? "text-right" : "text-left"} 
                    px-5 py-3 text-sm font-medium text-black bg-[#22c55e]`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-dark-border/50 hover:bg-dark-lighter/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]?.url || "https://via.placeholder.com/50"}
                        className="w-10 h-10 rounded-lg object-cover" alt="" />
                      <span className="text-sm text-white font-medium line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white">₹{p.price}</td>
                  <td className="px-5 py-4">
                    <Badge color={p.stock > 10 ? "green" : p.stock > 0 ? "yellow" : "red"}>
                      {p.stock}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">{p.category?.name}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/admin/products/edit/${p._id}`}
                        className="p-2 text-gray-400 hover:text-primary transition">
                        <HiOutlinePencil className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(p._id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition cursor-pointer">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
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