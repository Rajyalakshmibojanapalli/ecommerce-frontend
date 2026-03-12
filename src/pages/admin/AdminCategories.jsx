import { useState } from "react";
import {
  useGetCategoriesQuery, useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../features/categories/categoriesApiSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Loader from "../../components/ui/Loader";
import toast from "react-hot-toast";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

export default function AdminCategories() {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { data, isLoading } = useGetCategoriesQuery();
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.data?.categories || [];

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      await createCategory(formData).unwrap();
      toast.success("Category created");
      setModal(false);
      setName("");
      setDescription("");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete category?")) return;
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  if (isLoading) return <Loader size="lg" className="py-20" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <Button onClick={() => setModal(true)}>
          <HiOutlinePlus className="w-5 h-5" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat._id}
            className="bg-dark-card border border-dark-border rounded-xl p-5 flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">{cat.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{cat.slug}</p>
            </div>
            <button onClick={() => handleDelete(cat._id)}
              className="p-2 text-gray-400 hover:text-red-400 transition cursor-pointer">
              <HiOutlineTrash className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Category">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input label="Category Name" value={name}
            onChange={(e) => setName(e.target.value)} required />
          <Input label="Description" value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <Button type="submit" loading={creating}>Create Category</Button>
        </form>
      </Modal>
    </div>
  );
}