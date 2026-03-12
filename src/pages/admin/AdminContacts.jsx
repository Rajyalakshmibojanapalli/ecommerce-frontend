// pages/admin/AdminContacts.jsx
import { useState } from "react";
import {
  useGetContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "../../features/contact/contactApiSlice";
import { HiOutlineTrash, HiOutlineEye, HiOutlineX } from "react-icons/hi";
import toast from "react-hot-toast";

const STATUS_COLORS = {
  new: "text-blue-400 bg-blue-500/10",
  "in-progress": "text-yellow-400 bg-yellow-500/10",
  resolved: "text-green-400 bg-green-500/10",
  closed: "text-gray-400 bg-gray-500/10",
};

const PRIORITY_COLORS = {
  low: "text-gray-400",
  medium: "text-yellow-400",
  high: "text-orange-400",
  urgent: "text-red-400",
};

export default function AdminContacts() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  const { data, isLoading } = useGetContactsQuery({
    page,
    limit: 20,
    status: statusFilter || undefined,
  });
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const contacts = data?.data?.contacts || [];
  const stats = data?.data?.stats || {};
  const pages = data?.data?.pages || 1;

  const handleStatusChange = async (id, status) => {
    try {
      await updateContact({ id, status }).unwrap();
      toast.success("Status updated");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-white mb-8">Contact Messages</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "New", value: stats.new || 0, color: "text-blue-400" },
          { label: "In Progress", value: stats.inProgress || 0, color: "text-yellow-400" },
          { label: "Resolved", value: stats.resolved || 0, color: "text-green-400" },
          { label: "Total", value: (data?.data?.total || 0), color: "text-white" },
        ].map((s) => (
          <div key={s.label} className="bg-white/[.02] border border-white/[.06] rounded-xl p-4 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["", "new", "in-progress", "resolved", "closed"].map((s) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
              statusFilter === s ? "bg-primary text-black" : "bg-white/5 text-gray-500"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/[.03] rounded-xl h-24 animate-pulse" />
          ))
        ) : (
          contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white/[.02] border border-white/[.06] rounded-xl p-5
                hover:border-white/10 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-white">{c.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      STATUS_COLORS[c.status]
                    }`}>
                      {c.status}
                    </span>
                    <span className={`text-[10px] font-bold ${PRIORITY_COLORS[c.priority]}`}>
                      ● {c.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{c.email} • {c.subject}</p>
                  <p className="text-sm text-gray-400 mt-2 line-clamp-2">{c.message}</p>
                  <p className="text-[10px] text-gray-600 mt-2">
                    {new Date(c.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c._id, e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg text-xs
                      text-white px-2 py-1.5 cursor-pointer focus:outline-none"
                  >
                    <option value="new" className="bg-gray-900">New</option>
                    <option value="in-progress" className="bg-gray-900">In Progress</option>
                    <option value="resolved" className="bg-gray-900">Resolved</option>
                    <option value="closed" className="bg-gray-900">Closed</option>
                  </select>
                  <button
                    onClick={() => setSelectedContact(c)}
                    className="p-2 text-gray-500 hover:text-primary cursor-pointer transition-colors"
                  >
                    <HiOutlineEye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete?")) return;
                      try {
                        await deleteContact(c._id).unwrap();
                        toast.success("Deleted");
                      } catch { toast.error("Failed"); }
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

      {/* Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedContact(null)} />
          <div className="relative bg-gray-950 border border-white/[.08] rounded-2xl
            p-6 md:p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white mb-4">Contact Details</h3>

            <div className="space-y-3 text-sm">
              <Row label="Name" value={selectedContact.name} />
              <Row label="Email" value={selectedContact.email} />
              <Row label="Phone" value={selectedContact.phone || "—"} />
              <Row label="Subject" value={selectedContact.subject} />
              {selectedContact.orderId && (
                <Row label="Order ID" value={selectedContact.orderId} />
              )}
              <div className="pt-3 border-t border-white/[.06]">
                <p className="text-xs text-gray-500 font-bold uppercase mb-2">Message</p>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}