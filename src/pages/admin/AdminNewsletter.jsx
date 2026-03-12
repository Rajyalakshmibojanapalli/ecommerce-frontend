// pages/admin/AdminNewsletter.jsx
import { useState } from "react";
import {
  useGetSubscribersQuery,
  useDeleteSubscriberMutation,
} from "../../features/newsletter/newsletterApiSlice";
import { HiOutlineTrash, HiOutlineMail, HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import toast from "react-hot-toast";

export default function AdminNewsletter() {
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("");
  const { data, isLoading } = useGetSubscribersQuery({ page, limit: 20, active: activeFilter || undefined });
  const [deleteSub] = useDeleteSubscriberMutation();

  const subs = data?.data?.subscribers || [];
  const total = data?.data?.total || 0;
  const activeCount = data?.data?.activeCount || 0;
  const pages = data?.data?.pages || 1;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Newsletter Subscribers</h1>
          <p className="text-gray-500 text-sm mt-1">
            {activeCount} active / {total} total
          </p>
        </div>
        <div className="flex gap-2">
          {["", "true", "false"].map((v) => (
            <button
              key={v}
              onClick={() => { setActiveFilter(v); setPage(1); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeFilter === v
                  ? "bg-primary text-black"
                  : "bg-white/5 text-gray-500 hover:bg-white/10"
              }`}
            >
              {v === "" ? "All" : v === "true" ? "Active" : "Inactive"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total", value: total, color: "text-white" },
          { label: "Active", value: activeCount, color: "text-green-400" },
          { label: "Unsubscribed", value: total - activeCount, color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="bg-white/[.02] border border-white/[.06] rounded-xl p-4 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/[.02] border border-white/[.06] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[.06]">
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-bold uppercase">Email</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-bold uppercase">Name</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-bold uppercase">Source</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-bold uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-bold uppercase">Date</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-white/[.04]">
                    <td colSpan={6} className="px-5 py-4">
                      <div className="h-4 bg-white/5 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : (
                subs.map((s) => (
                  <tr key={s._id} className="border-b border-white/[.04] hover:bg-white/[.02]">
                    <td className="px-5 py-4 text-sm text-white font-medium">{s.email}</td>
                    <td className="px-5 py-4 text-sm text-gray-400">{s.name || "—"}</td>
                    <td className="px-5 py-4">
                      <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-gray-400 uppercase">
                        {s.source}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {s.isActive ? (
                        <span className="text-[10px] font-bold bg-green-500/10 text-green-400 px-2 py-1 rounded-full">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold bg-red-500/10 text-red-400 px-2 py-1 rounded-full">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-500">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={async () => {
                          if (!window.confirm("Delete?")) return;
                          try {
                            await deleteSub(s._id).unwrap();
                            toast.success("Deleted");
                          } catch { toast.error("Failed"); }
                        }}
                        className="p-1.5 text-gray-600 hover:text-red-400 cursor-pointer transition-colors"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t border-white/[.06]">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  p === page ? "bg-primary text-black" : "bg-white/5 text-gray-500 hover:bg-white/10"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}