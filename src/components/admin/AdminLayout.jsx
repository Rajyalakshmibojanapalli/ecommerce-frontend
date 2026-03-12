import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HiOutlineChartBar, HiOutlineShoppingBag, HiOutlineClipboardList,
  HiOutlineTag, HiOutlineTicket, HiOutlineUsers, HiOutlineArrowLeft,
  HiOutlineMenu, HiOutlineX,
} from "react-icons/hi";

const menuItems = [
  { path: "/admin", icon: HiOutlineChartBar, label: "Dashboard" },
  { path: "/admin/products", icon: HiOutlineShoppingBag, label: "Products" },
  { path: "/admin/orders", icon: HiOutlineClipboardList, label: "Orders" },
  { path: "/admin/categories", icon: HiOutlineTag, label: "Categories" },
  { path: "/admin/coupons", icon: HiOutlineTicket, label: "Coupons" },
  { path: "/admin/users", icon: HiOutlineUsers, label: "Users" },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 bg-black border-r border-dark-border
          flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">A</span>
            </div>
            <span className="text-lg font-bold text-white">Admin Panel</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 cursor-pointer"
          >
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        <nav className="px-3 space-y-1 flex-1">
          {menuItems.map((item) => {
            const active =
              pathname === item.path ||
              (item.path !== "/admin" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
                  ${
                    active
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-400 hover:text-white hover:bg-dark-lighter"
                  }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-dark-border">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 
              hover:text-white transition"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="md:hidden bg-black border-b border-dark-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 cursor-pointer"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>
          <span className="text-white font-semibold">Admin Panel</span>
        </div>

        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}