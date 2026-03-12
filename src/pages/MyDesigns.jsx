// pages/MyDesigns.jsx
import { Link } from "react-router-dom";
import {
  useGetMyDesignsQuery,
  useDeleteDesignMutation,
  useSubmitDesignMutation,
} from "../features/customDesign/customDesignApiSlice";
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineArrowRight } from "react-icons/hi";
import toast from "react-hot-toast";

const STATUS_MAP = {
  draft: { label: "Draft", color: "text-gray-400 bg-gray-500/10" },
  submitted: { label: "Submitted", color: "text-blue-400 bg-blue-500/10" },
  "in-review": { label: "In Review", color: "text-yellow-400 bg-yellow-500/10" },
  approved: { label: "Approved", color: "text-green-400 bg-green-500/10" },
  "in-production": { label: "In Production", color: "text-purple-400 bg-purple-500/10" },
  completed: { label: "Completed", color: "text-primary bg-primary/10" },
  cancelled: { label: "Cancelled", color: "text-red-400 bg-red-500/10" },
};

export default function MyDesigns() {
  const { data, isLoading } = useGetMyDesignsQuery({});
  const [deleteDesign] = useDeleteDesignMutation();
  const [submitDesign] = useSubmitDesignMutation();

  const designs = data?.data?.designs || [];

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this design?")) return;
    try {
      await deleteDesign(id).unwrap();
      toast.success("Design deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleSubmit = async (id) => {
    if (!window.confirm("Submit for review? You won't be able to edit after.")) return;
    try {
      await submitDesign(id).unwrap();
      toast.success("Design submitted for review!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to submit");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            MY <span className="text-primary">DESIGNS</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">{designs.length} designs</p>
        </div>
        <Link to="/custom-design">
          <button className="flex items-center gap-2 px-5 py-3 bg-primary text-black
            font-bold text-sm rounded-xl hover:shadow-lg transition-all cursor-pointer">
            <HiOutlinePlus className="w-4 h-4" /> New Design
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white/[.03] rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      ) : designs.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🎨</p>
          <h2 className="text-2xl font-bold text-white mb-2">No designs yet</h2>
          <p className="text-gray-500 mb-8">Create your first custom tee!</p>
          <Link to="/custom-design">
            <button className="px-8 py-3 bg-primary text-black font-bold rounded-xl cursor-pointer">
              Start Designing
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {designs.map((d) => {
            const st = STATUS_MAP[d.status] || STATUS_MAP.draft;
            return (
              <div
                key={d._id}
                className="bg-white/[.02] border border-white/[.06] rounded-2xl p-6
                  hover:border-primary/20 transition-all group"
              >
                {/* Preview */}
                <div
                  className="aspect-square rounded-xl mb-4 flex flex-col items-center
                    justify-center transition-colors duration-500"
                  style={{ backgroundColor: d.color?.hex || "#1a1a1a" }}
                >
                  <span className="text-4xl mb-2 opacity-60">👕</span>
                  {d.design?.frontText?.content && (
                    <p
                      className="text-sm font-bold text-center px-4 break-words"
                      style={{ color: d.design.frontText.color || "#fff" }}
                    >
                      {d.design.frontText.content}
                    </p>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-base font-bold text-white mb-1 truncate">
                  {d.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${st.color}`}>
                    {st.label}
                  </span>
                  <span className="text-xs text-gray-600">
                    {d.size} • {d.color?.name}
                  </span>
                </div>
                <p className="text-primary font-black text-lg mb-4">
                  ₹{d.price?.toLocaleString()} × {d.quantity}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  {d.status === "draft" && (
                    <>
                      <button
                        onClick={() => handleSubmit(d._id)}
                        className="flex-1 py-2 bg-primary text-black text-xs font-bold
                          rounded-lg cursor-pointer hover:shadow-lg transition-all"
                      >
                        Submit for Review
                      </button>
                      <button
                        onClick={() => handleDelete(d._id)}
                        className="p-2 rounded-lg border border-white/10 text-gray-500
                          hover:text-red-400 hover:border-red-500/30 cursor-pointer transition-all"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  {d.status !== "draft" && (
                    <div className="text-xs text-gray-600">
                      {d.estimatedDelivery &&
                        `Est. delivery: ${new Date(d.estimatedDelivery).toLocaleDateString()}`}
                      {d.adminNotes && (
                        <p className="mt-1 text-yellow-400/60">Note: {d.adminNotes}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}