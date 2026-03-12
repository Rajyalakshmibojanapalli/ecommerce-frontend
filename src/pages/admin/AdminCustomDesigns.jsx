// pages/admin/AdminCustomDesigns.jsx
import { useState } from "react";
import {
  useGetAllDesignsQuery,
  useUpdateDesignStatusMutation,
} from "../../features/customDesign/customDesignApiSlice";
import toast from "react-hot-toast";

const STATUSES = ["submitted", "in-review", "approved", "in-production", "completed", "cancelled"];
const STATUS_COLORS = {
  submitted: "text-blue-400 bg-blue-500/10",
  "in-review": "text-yellow-400 bg-yellow-500/10",
  approved: "text-green-400 bg-green-500/10",
  "in-production": "text-purple-400 bg-purple-500/10",
  completed: "text-primary bg-primary/10",
  cancelled: "text-red-400 bg-red-500/10",
  draft: "text-gray-400 bg-gray-500/10",
};

export default function AdminCustomDesigns() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const { data, isLoading } = useGetAllDesignsQuery({ page, limit: 20, status: statusFilter || undefined });
  const [updateStatus] = useUpdateDesignStatusMutation();

  const designs = data?.data?.designs || [];
  const stats = data?.data?.stats || {};

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success(`Status: ${status}`);
    } catch { toast.error("Failed"); }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-white mb-8">Custom Design Orders</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="bg-white/[.02] border border-white/[.06] rounded-xl p-3 text-center">
            <p className="text-lg font-black text-white">{v}</p>
            <p className="text-[10px] text-gray-500 capitalize">{k.replace(/([A-Z])/g, " $1")}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => { setStatusFilter(""); setPage(1); }}
          className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${
            !statusFilter ? "bg-primary text-black" : "bg-white/5 text-gray-500"
          }`}>All</button>
        {STATUSES.map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer capitalize ${
              statusFilter === s ? "bg-primary text-black" : "bg-white/5 text-gray-500"
            }`}>{s.replace(/-/g, " ")}</button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {isLoading ? (
          [...Array(3)].map((_, i) => <div key={i} className="bg-white/[.03] rounded-xl h-28 animate-pulse" />)
        ) : designs.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No custom designs.</p>
        ) : (
          designs.map((d) => (
            <div key={d._id} className="bg-white/[.02] border border-white/[.06] rounded-xl p-5 hover:border-white/10 transition-all">
              <div className="flex items-start gap-4">
                {/* Preview */}
                <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: d.color?.hex || "#333" }}>
                  <span className="text-2xl">👕</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-white truncate">{d.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[d.status]}`}>
                      {d.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    By: {d.user?.name} ({d.user?.email}) • {d.productType} • {d.size} • {d.color?.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Qty: {d.quantity} • ₹{d.price?.toLocaleString()} •{" "}
                    {new Date(d.createdAt).toLocaleDateString()}
                  </p>
                  {d.notes && <p className="text-xs text-gray-500 mt-1 italic">"{d.notes}"</p>}
                </div>

                {/* Status Change */}
                <select
                  value={d.status}
                  onChange={(e) => handleStatusUpdate(d._id, e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg text-xs text-white
                    px-2 py-1.5 cursor-pointer focus:outline-none"
                >
                  <option value="submitted" className="bg-gray-900">Submitted</option>
                  <option value="in-review" className="bg-gray-900">In Review</option>
                  <option value="approved" className="bg-gray-900">Approved</option>
                  <option value="in-production" className="bg-gray-900">In Production</option>
                  <option value="completed" className="bg-gray-900">Completed</option>
                  <option value="cancelled" className="bg-gray-900">Cancelled</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}