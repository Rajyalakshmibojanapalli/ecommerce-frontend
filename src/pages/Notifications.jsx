// pages/Notifications.jsx
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useDeleteNotificationMutation,
  useClearAllNotificationsMutation,
} from "../features/notifications/notificationApiSlice";
import {
  HiOutlineBell,
  HiOutlineTrash,
  HiOutlineCheckCircle,
  HiOutlineCheck,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const TYPE_ICONS = {
  "order-placed": "📦",
  "order-shipped": "🚚",
  "order-delivered": "✅",
  "order-cancelled": "❌",
  "price-drop": "💰",
  "back-in-stock": "🔔",
  promo: "🎉",
  "custom-design-update": "🎨",
  "review-reply": "💬",
  system: "⚙️",
};

export default function Notifications() {
  const { data, isLoading } = useGetNotificationsQuery({ limit: 50 });
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead, { isLoading: markingAll }] = useMarkAllAsReadMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [clearAll, { isLoading: clearing }] = useClearAllNotificationsMutation();

  const notifications = data?.data?.notifications || [];
  const unreadCount = data?.data?.unreadCount || 0;

  const handleMarkAll = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success("All marked as read");
    } catch {
      toast.error("Failed");
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm("Clear all notifications?")) return;
    try {
      await clearAll().unwrap();
      toast.success("Cleared");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            NOTIFICATIONS
          </h1>
          {unreadCount > 0 && (
            <p className="text-primary text-sm font-bold mt-1">
              {unreadCount} unread
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAll}
              disabled={markingAll}
              className="flex items-center gap-1.5 px-4 py-2 text-xs text-primary
                bg-primary/10 border border-primary/20 rounded-xl font-bold
                hover:bg-primary/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <HiOutlineCheck className="w-3.5 h-3.5" /> Read All
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              disabled={clearing}
              className="flex items-center gap-1.5 px-4 py-2 text-xs text-red-400
                bg-red-500/10 border border-red-500/20 rounded-xl font-bold
                hover:bg-red-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <HiOutlineTrash className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/[.03] rounded-xl h-20 animate-pulse" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-24">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/[.03]
            flex items-center justify-center">
            <HiOutlineBell className="w-8 h-8 text-gray-700" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">All caught up!</h2>
          <p className="text-gray-500">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n._id}
              className={`relative rounded-xl border p-4 transition-all group ${
                n.isRead
                  ? "bg-white/[.01] border-white/[.04]"
                  : "bg-primary/[.02] border-primary/10"
              }`}
            >
              <div className="flex gap-4">
                <div className="text-2xl flex-shrink-0 mt-1">
                  {TYPE_ICONS[n.type] || "🔔"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-white">{n.title}</p>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                    {!n.isRead && (
                      <span className="w-2.5 h-2.5 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[10px] text-gray-600">
                      {new Date(n.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    {n.link && (
                      <Link
                        to={n.link}
                        className="text-[10px] text-primary font-bold hover:underline"
                      >
                        View →
                      </Link>
                    )}

                    <div className="flex-1" />

                    {!n.isRead && (
                      <button
                        onClick={() => markAsRead(n._id)}
                        className="text-[10px] text-gray-600 hover:text-primary cursor-pointer
                          transition-colors"
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n._id)}
                      className="text-gray-700 hover:text-red-400 cursor-pointer
                        opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <HiOutlineTrash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}