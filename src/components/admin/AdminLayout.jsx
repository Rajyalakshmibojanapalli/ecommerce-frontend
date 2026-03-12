// components/admin/AdminLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineTag,
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineMail,
  HiOutlineChatAlt2,
  HiOutlinePencilAlt,
  HiOutlinePhotograph,
  HiOutlineColorSwatch,
  HiOutlineDocumentText,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const NAV_SECTIONS = [
  {
    title: "Overview",
    links: [
      { to: "/admin", icon: HiOutlineViewGrid, label: "Dashboard", end: true },
    ],
  },
  {
    title: "Store",
    links: [
      { to: "/admin/products", icon: HiOutlineCube, label: "Products" },
      { to: "/admin/orders", icon: HiOutlineClipboardList, label: "Orders" },
      { to: "/admin/categories", icon: HiOutlineTag, label: "Categories" },
      { to: "/admin/coupons", icon: HiOutlineTicket, label: "Coupons" },
      { to: "/admin/users", icon: HiOutlineUsers, label: "Users" },
    ],
  },
  {
    title: "Content",
    links: [
      { to: "/admin/banners", icon: HiOutlinePhotograph, label: "Banners" },
      { to: "/admin/blogs", icon: HiOutlinePencilAlt, label: "Blog Posts" },
      { to: "/admin/pages", icon: HiOutlineDocumentText, label: "Static Pages" },
    ],
  },
  {
    title: "Engagement",
    links: [
      { to: "/admin/newsletter", icon: HiOutlineMail, label: "Newsletter" },
      { to: "/admin/contacts", icon: HiOutlineChatAlt2, label: "Contact Msgs" },
      {
        to: "/admin/custom-designs",
        icon: HiOutlineColorSwatch,
        label: "Custom Designs",
      },
    ],
  },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <aside
        className="w-64 bg-gray-950/80 border-r border-white/[.06] flex flex-col
          fixed top-0 left-0 h-screen z-30 overflow-y-auto"
      >
        {/* Logo */}
        <div className="p-5 border-b border-white/[.06]">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-emerald-400
                flex items-center justify-center"
            >
              <span className="text-black font-black text-sm">J</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-black text-white tracking-tight">
                JAI<span className="text-primary">MAX</span>
              </span>
              <span className="text-[8px] text-gray-600 tracking-[.3em] uppercase font-bold">
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase font-bold px-3 mb-2">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
                        transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-gray-500 hover:text-white hover:bg-white/[.04]"
                        }`
                    }
                  >
                    <link.icon className="w-5 h-5 flex-shrink-0" />
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Back to store */}
        <div className="p-3 border-t border-white/[.06]">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
              text-gray-500 hover:text-primary hover:bg-primary/5
              font-semibold transition-all"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top bar */}
        <header
          className="sticky top-0 z-20 h-14 bg-black/80 backdrop-blur-xl
            border-b border-white/[.06] flex items-center px-6"
        >
          <h2 className="text-sm font-bold text-gray-400">
            Admin Panel
          </h2>
        </header>

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}