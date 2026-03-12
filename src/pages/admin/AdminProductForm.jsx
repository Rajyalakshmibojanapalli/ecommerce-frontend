import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery, useCreateProductMutation, useUpdateProductMutation } from "../../features/products/productsApiSlice";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApiSlice";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "", description: "", price: "", mrp: "",
    category: "", brand: "", stock: "", sku: "", isFeatured: false,
  });
  const [images, setImages] = useState([]);

  const { data: catData } = useGetCategoriesQuery();
  const { data: productData } = useGetProductByIdQuery(id, { skip: !isEdit });
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const categories = catData?.data?.categories || [];

  useEffect(() => {
    if (productData?.data?.product) {
      const p = productData.data.product;
      setForm({
        name: p.name, description: p.description, price: p.price,
        mrp: p.mrp, category: p.category?._id || p.category,
        brand: p.brand, stock: p.stock, sku: p.sku || "", isFeatured: p.isFeatured,
      });
    }
  }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    images.forEach((img) => formData.append("images", img));

    try {
      if (isEdit) {
        await updateProduct({ id, formData }).unwrap();
        toast.success("Product updated");
      } else {
        await createProduct(formData).unwrap();
        toast.success("Product created");
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isEdit ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit}
        className="space-y-5 bg-dark-card border border-dark-border rounded-xl p-6">
        <Input label="Product Name" value={form.name} required
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
          <textarea value={form.description} required rows={4}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-dark-light border border-dark-border rounded-lg px-4 py-2.5 
              text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Price (₹)" type="number" value={form.price} required
            onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <Input label="MRP (₹)" type="number" value={form.mrp} required
            onChange={(e) => setForm({ ...form, mrp: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
            <select value={form.category} required
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full bg-dark-light border border-dark-border rounded-lg px-4 py-2.5 
                text-white focus:outline-none focus:border-primary cursor-pointer">
              <option value="">Select</option>
              {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <Input label="Brand" value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Stock" type="number" value={form.stock} required
            onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          <Input label="SKU" value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Images</label>
          <input type="file" multiple accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 
              file:rounded-lg file:border-0 file:bg-primary file:text-black 
              file:font-semibold file:cursor-pointer" />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            className="accent-green-400 w-4 h-4" />
          <span className="text-sm text-gray-300">Featured Product</span>
        </label>
        <div className="flex gap-3 pt-4">
          <Button type="submit" loading={creating || updating}>
            {isEdit ? "Update Product" : "Create Product"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate("/admin/products")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}