// pages/admin/AdminBlogs.jsx
import { useState } from "react";
import { useGetBlogsQuery, useCreateBlogMutation, useDeleteBlogMutation } from "../../features/blog/blogApiSlice";
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineX } from "react-icons/hi";
import toast from "react-hot-toast";

const CATS = [
  "fashion-tips", "style-guide", "trends", "sustainability",
  "behind-the-scenes", "how-to", "announcements",
];

export default function AdminBlogs() {
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading } = useGetBlogsQuery({ page, limit: 20 });
  const [createBlog, { isLoading: creating }] = useCreateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = data?.data?.blogs || [];

  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", category: "fashion-tips",
    coverImage: "", tags: "", status: "draft",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }).unwrap();
      toast.success("Blog created");
      setShowForm(false);
      setForm({ title: "", excerpt: "", content: "", category: "fashion-tips", coverImage: "", tags: "", status: "draft" });
    } catch (err) {
      toast.error(err?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-white">Blog Posts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-3 bg-primary text-black
            font-bold text-sm rounded-xl cursor-pointer"
        >
          {showForm ? <HiOutlineX className="w-4 h-4" /> : <HiOutlinePlus className="w-4 h-4" />}
          {showForm ? "Cancel" : "New Post"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/[.02] border border-white/[.06] rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Title</label>
              <input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                required className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Category</label>
              <select value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none cursor-pointer">
                {CATS.map(c => <option key={c} value={c} className="bg-gray-900">{c.replace(/-/g, " ")}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Cover Image URL</label>
            <input value={form.coverImage} onChange={(e) => setForm(f => ({ ...f, coverImage: e.target.value }))}
              className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm(f => ({ ...f, excerpt: e.target.value }))}
              rows={2} className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white resize-none focus:outline-none focus:border-primary/50" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Content (HTML)</label>
            <textarea value={form.content} onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
              rows={8} required className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white resize-none font-mono focus:outline-none focus:border-primary/50" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Tags (comma separated)</label>
              <input value={form.tags} onChange={(e) => setForm(f => ({ ...f, tags: e.target.value }))}
                placeholder="fashion, summer, tips" className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 font-bold uppercase mb-2">Status</label>
              <select value={form.status} onChange={(e) => setForm(f => ({ ...f, status: e.target.value }))}
                className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white cursor-pointer focus:outline-none">
                <option value="draft" className="bg-gray-900">Draft</option>
                <option value="published" className="bg-gray-900">Published</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={creating}
            className="w-full py-3 bg-primary text-black font-bold rounded-xl cursor-pointer disabled:opacity-50">
            {creating ? "Creating..." : "Create Blog Post"}
          </button>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {isLoading ? (
          [...Array(3)].map((_, i) => <div key={i} className="bg-white/[.03] rounded-xl h-20 animate-pulse" />)
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No blog posts yet.</p>
        ) : (
          blogs.map((b) => (
            <div key={b._id} className="flex items-center gap-4 bg-white/[.02] border border-white/[.06] rounded-xl p-4 hover:border-white/10 transition-all">
              {b.coverImage && (
                <img src={b.coverImage} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white truncate">{b.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    b.status === "published" ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"
                  }`}>{b.status}</span>
                  <span className="text-[10px] text-gray-600">{b.category?.replace(/-/g, " ")}</span>
                  <span className="text-[10px] text-gray-600">👁 {b.views} • ❤ {b.likes}</span>
                </div>
              </div>
              <button
                onClick={async () => {
                  if (!window.confirm("Delete?")) return;
                  try { await deleteBlog(b._id).unwrap(); toast.success("Deleted"); }
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