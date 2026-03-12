// pages/admin/AdminPages.jsx
import { useState } from "react";
import {
  useGetAllPagesQuery,
  useCreatePageMutation,
  useDeletePageMutation,
} from "../../features/pages/pageApiSlice";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineX } from "react-icons/hi";
import toast from "react-hot-toast";

export default function AdminPages() {
  const { data, isLoading } = useGetAllPagesQuery();
  const [createPage, { isLoading: creating }] = useCreatePageMutation();
  const [deletePage] = useDeletePageMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", content: "", isPublished: true });

  const pages = data?.data?.pages || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPage(form).unwrap();
      toast.success("Page created");
      setShowForm(false);
      setForm({ title: "", slug: "", content: "", isPublished: true });
    } catch (err) { toast.error(err?.data?.message || "Failed"); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-white">Static Pages</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-3 bg-primary text-black font-bold text-sm rounded-xl cursor-pointer">
          {showForm ? <HiOutlineX className="w-4 h-4" /> : <HiOutlinePlus className="w-4 h-4" />}
          {showForm ? "Cancel" : "New Page"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/[.02] border border-white/[.06] rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input placeholder="Title" value={form.title} required
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
            <input placeholder="Slug (e.g. about-us)" value={form.slug} required
              onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
              className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
          </div>
          <textarea placeholder="Content (HTML)" value={form.content} rows={10} required
            onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
            className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white font-mono resize-none focus:outline-none focus:border-primary/50" />
          <button type="submit" disabled={creating}
            className="w-full py-3 bg-primary text-black font-bold rounded-xl cursor-pointer disabled:opacity-50">
            {creating ? "Creating..." : "Create Page"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {isLoading ? (
          [...Array(3)].map((_, i) => <div key={i} className="bg-white/[.03] rounded-xl h-16 animate-pulse" />)
        ) : pages.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No pages yet.</p>
        ) : (
          pages.map((p) => (
            <div key={p._id} className="flex items-center justify-between bg-white/[.02] border border-white/[.06] rounded-xl p-4">
              <div>
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  /{p.slug} • {p.isPublished ? "✅ Published" : "📝 Draft"} •
                  Updated {new Date(p.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={async () => {
                  if (!window.confirm("Delete?")) return;
                  try { await deletePage(p._id).unwrap(); toast.success("Deleted"); }
                  catch { toast.error("Failed"); }
                }}
                className="p-2 text-gray-600 hover:text-red-400 cursor-pointer transition-colors"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}