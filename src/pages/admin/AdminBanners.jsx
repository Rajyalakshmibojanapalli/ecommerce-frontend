// pages/admin/AdminBanners.jsx
import { useState } from "react";
import {
  useGetAllBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from "../../features/banners/bannerApiSlice";
import { HiOutlinePlus, HiOutlineTrash, HiOutlineX, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import toast from "react-hot-toast";

export default function AdminBanners() {
  const { data, isLoading } = useGetAllBannersQuery();
  const [createBanner, { isLoading: creating }] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "", subtitle: "", image: "", link: "/products",
    buttonText: "Shop Now", position: "hero", isActive: true,
  });

  const banners = data?.data?.banners || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBanner(form).unwrap();
      toast.success("Banner created");
      setShowForm(false);
      setForm({ title: "", subtitle: "", image: "", link: "/products", buttonText: "Shop Now", position: "hero", isActive: true });
    } catch (err) {
      toast.error(err?.data?.message || "Failed");
    }
  };

  const toggleActive = async (banner) => {
    try {
      await updateBanner({ id: banner._id, isActive: !banner.isActive }).unwrap();
      toast.success(banner.isActive ? "Deactivated" : "Activated");
    } catch { toast.error("Failed"); }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-white">Banners</h1>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-3 bg-primary text-black font-bold text-sm rounded-xl cursor-pointer">
          {showForm ? <HiOutlineX className="w-4 h-4" /> : <HiOutlinePlus className="w-4 h-4" />}
          {showForm ? "Cancel" : "New Banner"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/[.02] border border-white/[.06] rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input placeholder="Title" value={form.title} required
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
            <input placeholder="Subtitle" value={form.subtitle}
              onChange={(e) => setForm(f => ({ ...f, subtitle: e.target.value }))}
              className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
          </div>
          <input placeholder="Image URL" value={form.image} required
            onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))}
            className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
          <div className="grid sm:grid-cols-3 gap-4">
            <input placeholder="Link" value={form.link}
              onChange={(e) => setForm(f => ({ ...f, link: e.target.value }))}
              className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
            <input placeholder="Button Text" value={form.buttonText}
              onChange={(e) => setForm(f => ({ ...f, buttonText: e.target.value }))}
              className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50" />
            <select value={form.position}
              onChange={(e) => setForm(f => ({ ...f, position: e.target.value }))}
              className="w-full bg-white/[.04] border border-white/[.08] rounded-xl px-4 py-3 text-sm text-white cursor-pointer focus:outline-none">
              <option value="hero" className="bg-gray-900">Hero</option>
              <option value="category" className="bg-gray-900">Category</option>
              <option value="promo" className="bg-gray-900">Promo</option>
            </select>
          </div>
          <button type="submit" disabled={creating}
            className="w-full py-3 bg-primary text-black font-bold rounded-xl cursor-pointer disabled:opacity-50">
            {creating ? "Creating..." : "Create Banner"}
          </button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => <div key={i} className="bg-white/[.03] rounded-2xl aspect-video animate-pulse" />)
        ) : (
          banners.map((b) => (
            <div key={b._id} className={`bg-white/[.02] border rounded-2xl overflow-hidden transition-all ${
              b.isActive ? "border-white/[.06]" : "border-white/[.03] opacity-50"
            }`}>
              <div className="aspect-video overflow-hidden relative">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${
                    b.isActive ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"
                  }`}>{b.isActive ? "Active" : "Inactive"}</span>
                  <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-black/60 text-white">
                    {b.position}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white">{b.title}</h3>
                {b.subtitle && <p className="text-xs text-gray-500 mt-1">{b.subtitle}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => toggleActive(b)}
                    className="flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer transition-all border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
                    {b.isActive ? <><HiOutlineEyeOff className="inline w-3 h-3 mr-1" /> Deactivate</> : <><HiOutlineEye className="inline w-3 h-3 mr-1" /> Activate</>}
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete?")) return;
                      try { await deleteBanner(b._id).unwrap(); toast.success("Deleted"); }
                      catch { toast.error("Failed"); }
                    }}
                    className="p-2 text-gray-500 hover:text-red-400 cursor-pointer transition-colors"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}