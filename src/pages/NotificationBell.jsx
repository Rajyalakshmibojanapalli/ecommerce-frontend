// components/NotificationBell.jsx
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetNotificationsQuery, useMarkAsReadMutation } from "../features/notifications/notificationApiSlice";
import { HiOutlineBell } from "react-icons/hi";

const TYPE_ICONS = {
  "order-placed": "📦",
  "order-shipped": "🚚",
  "order-delivered": "✅",
  promo: "🎉",
  "price-drop": "💰",
  system: "⚙️",
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const { data } = useGetNotificationsQuery({ limit: 5, unread: "true" }, {
    pollingInterval: 60000, // poll every 60s
  });

  const [markAsRead] = useMarkAsReadMutation();
  const notifications = data?.data?.notifications || [];
  const unreadCount = data?.data?.unreadCount || 0;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2.5 rounded-xl text-gray-400 hover:text-primary
          hover:bg-primary/5 transition-all cursor-pointer"
      >
        <HiOutlineBell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
            bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center
            justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-950/95 backdrop-blur-2xl
          border border-white/[.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,.6)]
          overflow-hidden z-50"
          style={{ animation: "megaPop .25s ease both" }}
        >
          <div className="p-4 border-b border-white/[.06] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5
                rounded-full font-bold">
                {unreadCount} new
              </span>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 text-sm">No new notifications</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => {
                    markAsRead(n._id);
                    setOpen(false);
                  }}
                  className="flex gap-3 p-4 hover:bg-white/[.03] border-b border-white/[.04]
                    cursor-pointer transition-colors"
                >
                  <span className="text-lg flex-shrink-0">
                    {TYPE_ICONS[n.type] || "🔔"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{n.title}</p>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                      {n.message}
                    </p>
                    <p className="text-[9px] text-gray-700 mt-1">
                      {new Date(n.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link
            to="/notifications"
            onClick={() => setOpen(false)}
            className="block p-3 text-center text-xs text-primary font-bold
              border-t border-white/[.06] hover:bg-white/[.02] transition-colors"
          >
            View All Notifications
          </Link>
        </div>
      )}
    </div>
  );
}