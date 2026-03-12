// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   HiOutlineShoppingCart, HiOutlineHeart, HiOutlineUser,
//   HiOutlineSearch, HiOutlineMenu, HiOutlineX, HiOutlineLogout,
//   HiOutlineCog, HiOutlineClipboardList,
// } from "react-icons/hi";
// import { selectCurrentUser, selectIsAuthenticated, selectIsAdmin, logout } from "../../features/auth/authSlice";
// import { selectCartItemsCount } from "../../features/cart/cartSlice";
// import { useLogoutApiMutation } from "../../features/auth/authApiSlice";
// import { apiSlice } from "../../features/api/apiSlice";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const user = useSelector(selectCurrentUser);
//   const isAuth = useSelector(selectIsAuthenticated);
//   const isAdmin = useSelector(selectIsAdmin);
//   const cartCount = useSelector(selectCartItemsCount);
//   const [logoutApi] = useLogoutApiMutation();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (search.trim()) {
//       navigate(`/products?search=${search}`);
//       setSearch("");
//       setMenuOpen(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await logoutApi().unwrap();
//     } catch {}
//     dispatch(logout());
//     dispatch(apiSlice.util.resetApiState());
//     navigate("/login");
//   };

//   return (
//     <nav className="sticky top-0 z-40 glass border-b border-dark-border">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex items-center justify-between h-16">

//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
//               <span className="text-black font-bold text-lg">V</span>
//             </div>
//             <span className="text-xl font-bold text-white">
//               Velvet<span className="text-primary">Curve</span>
//             </span>
//           </Link>

//           {/* Search - Desktop */}
//           <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
//               <input type="text" value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full bg-dark-light border border-dark-border rounded-lg 
//                   pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500
//                   focus:outline-none focus:border-primary transition" />
//             </div>
//           </form>

//           {/* Right */}
//           <div className="flex items-center gap-1">
//             {isAuth ? (
//               <>
//                 <Link to="/wishlist"
//                   className="p-2 rounded-lg text-gray-400 hover:text-primary 
//                     hover:bg-dark-lighter transition hidden sm:block">
//                   <HiOutlineHeart className="w-6 h-6" />
//                 </Link>

//                 <Link to="/cart"
//                   className="p-2 rounded-lg text-gray-400 hover:text-primary 
//                     hover:bg-dark-lighter transition relative">
//                   <HiOutlineShoppingCart className="w-6 h-6" />
//                   {cartCount > 0 && (
//                     <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary 
//                       text-black text-xs font-bold rounded-full flex items-center justify-center">
//                       {cartCount}
//                     </span>
//                   )}
//                 </Link>

//                 {/* Profile */}
//                 <div className="relative">
//                   <button onClick={() => setProfileOpen(!profileOpen)}
//                     className="flex items-center gap-2 p-2 rounded-lg text-gray-400 
//                       hover:text-white hover:bg-dark-lighter transition cursor-pointer">
//                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
//                       <span className="text-primary font-semibold text-sm">
//                         {user?.name?.charAt(0).toUpperCase()}
//                       </span>
//                     </div>
//                     <span className="hidden sm:block text-sm font-medium text-white">
//                       {user?.name?.split(" ")[0]}
//                     </span>
//                   </button>

//                   {profileOpen && (
//                     <>
//                       <div className="fixed inset-0" onClick={() => setProfileOpen(false)} />
//                       <div className="absolute right-0 mt-2 w-56 bg-dark-light border 
//                         border-dark-border rounded-xl shadow-xl overflow-hidden">
//                         <div className="p-3 border-b border-dark-border">
//                           <p className="text-sm font-medium text-white">{user?.name}</p>
//                           <p className="text-xs text-gray-500">{user?.email}</p>
//                         </div>
//                         <div className="py-1">
//                           <DropdownLink to="/profile" icon={HiOutlineUser} label="My Profile"
//                             onClick={() => setProfileOpen(false)} />
//                           <DropdownLink to="/my-orders" icon={HiOutlineClipboardList} label="My Orders"
//                             onClick={() => setProfileOpen(false)} />
//                           <DropdownLink to="/wishlist" icon={HiOutlineHeart} label="Wishlist"
//                             onClick={() => setProfileOpen(false)} />
//                           {isAdmin && (
//                             <DropdownLink to="/admin" icon={HiOutlineCog} label="Admin Panel"
//                               onClick={() => setProfileOpen(false)} />
//                           )}
//                         </div>
//                         <div className="border-t border-dark-border py-1">
//                           <button onClick={() => { setProfileOpen(false); handleLogout(); }}
//                             className="w-full flex items-center gap-3 px-4 py-2.5 text-sm 
//                               text-red-400 hover:bg-red-500/10 transition cursor-pointer">
//                             <HiOutlineLogout className="w-5 h-5" /> Logout
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <Link to="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition">
//                   Login
//                 </Link>
//                 <Link to="/register"
//                   className="px-4 py-2 text-sm bg-primary text-black font-semibold 
//                     rounded-lg hover:bg-primary-dark transition">
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             <button onClick={() => setMenuOpen(!menuOpen)}
//               className="md:hidden p-2 text-gray-400 hover:text-white cursor-pointer">
//               {menuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden pb-4 border-t border-dark-border mt-2 pt-4">
//             <form onSubmit={handleSearch} className="mb-4">
//               <div className="relative">
//                 <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
//                 <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search..."
//                   className="w-full bg-dark-light border border-dark-border rounded-lg 
//                     pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500
//                     focus:outline-none focus:border-primary" />
//               </div>
//             </form>
//             <div className="space-y-1">
//               {[
//                 { to: "/products", label: "All Products" },
//                 { to: "/wishlist", label: "Wishlist" },
//                 { to: "/my-orders", label: "My Orders" },
//               ].map((item) => (
//                 <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
//                   className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white
//                     hover:bg-dark-lighter rounded-lg transition">
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// function DropdownLink({ to, icon: Icon, label, onClick }) {
//   return (
//     <Link to={to} onClick={onClick}
//       className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 
//         hover:text-white hover:bg-dark-lighter transition">
//       <Icon className="w-5 h-5" /> {label}
//     </Link>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineShoppingCart,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineClipboardList,
  HiOutlineChevronDown,
  HiOutlineCollection,
  HiOutlineSparkles,
  HiOutlineFire,
  HiOutlineTag,
} from "react-icons/hi";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsAdmin,
  logout,
} from "../../features/auth/authSlice";
import { selectCartItemsCount } from "../../features/cart/cartSlice";
import { useLogoutApiMutation } from "../../features/auth/authApiSlice";
import { apiSlice } from "../../features/api/apiSlice";

/* ───────── NAV LINKS ───────── */
const SHOP_LINKS = [
  {
    label: "Men",
    to: "/products?category=men",
    icon: "👨",
    desc: "Shirts, Tees, Jeans & more",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&q=80&fit=crop",
  },
  {
    label: "Women",
    to: "/products?category=women",
    icon: "👩",
    desc: "Dresses, Tops, Kurtas & more",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80&fit=crop",
  },
  {
    label: "Kids",
    to: "/products?category=kids",
    icon: "🧒",
    desc: "Fun & colorful styles",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=300&q=80&fit=crop",
  },
];

const QUICK_LINKS = [
  { label: "New Arrivals", to: "/products?sort=-createdAt", icon: HiOutlineSparkles },
  { label: "Featured", to: "/products?featured=true", icon: HiOutlineFire },
  { label: "Custom Tees", to: "/products?category=custom", icon: HiOutlineTag },
  { label: "All Products", to: "/products", icon: HiOutlineCollection },
];

/* ═══════════════════════════════════════════ */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef(null);
  const shopRef = useRef(null);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectCurrentUser);
  const isAuth = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const cartCount = useSelector(selectCartItemsCount);
  const [logoutApi] = useLogoutApiMutation();

  /* — scroll listener — */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* — close menus on route change — */
  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
    setShopOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  /* — click outside — */
  useEffect(() => {
    const handler = (e) => {
      if (shopRef.current && !shopRef.current.contains(e.target)) setShopOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* — focus search on open — */
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  /* — body scroll lock — */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch {
      // silent
    }
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    navigate("/login");
  };

  return (
    <>
      {/* ── inline keyframes ── */}
      <style>{`
        @keyframes navSlideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes navFadeIn{from{opacity:0}to{opacity:1}}
        @keyframes searchExpand{from{width:0;opacity:0}to{width:100%;opacity:1}}
        @keyframes megaPop{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes mobileSlide{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
        @keyframes itemSlide{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
        @keyframes pulse-ring{0%{transform:scale(1);opacity:1}100%{transform:scale(1.8);opacity:0}}
        .nav-mega{animation:megaPop .25s ease both}
        .nav-mobile{animation:mobileSlide .35s cubic-bezier(.16,1,.3,1) both}
        .nav-item-slide{animation:itemSlide .4s ease both}
        .search-overlay{animation:navFadeIn .2s ease both}
      `}</style>

      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/[.06] shadow-[0_4px_30px_rgba(0,0,0,.5)]"
            : "bg-transparent border-b border-white/[.03]"
        }`}
      >
        {/* ── TOP ANNOUNCEMENT BAR ── */}
        <div
          className={`bg-primary/10 border-b border-primary/10 overflow-hidden transition-all duration-500 ${
            scrolled ? "h-0 opacity-0" : "h-8 opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center">
            <p className="text-[10px] sm:text-xs text-primary font-bold tracking-[.2em] uppercase">
              🔥 Free shipping on orders above ₹500 &nbsp;|&nbsp; Use code{" "}
              <span className="text-white">JAIMAX20</span> for 20% off
            </p>
          </div>
        </div>

        {/* ── MAIN NAV ── */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* ─ LEFT: Logo + Nav Links ─ */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 group">
                <div
                  className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-emerald-400
                    flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,136,.3)]
                    transition-all duration-500 group-hover:scale-105"
                >
                  <span className="text-black font-black text-base">J</span>
                  {/* subtle pulse */}
                  <div
                    className="absolute inset-0 rounded-xl border-2 border-primary opacity-0
                      group-hover:opacity-100"
                    style={{ animation: "pulse-ring 1.5s ease infinite" }}
                  />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-lg font-black text-white tracking-tight">
                    JAI<span className="text-primary">MAX</span>
                  </span>
                  <span className="text-[8px] text-gray-500 tracking-[.35em] uppercase font-bold mt-px">
                    Clothing
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-1">
                {/* Shop dropdown */}
                <div ref={shopRef} className="relative">
                  <button
                    onClick={() => setShopOpen(!shopOpen)}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-lg
                      transition-all duration-300 cursor-pointer ${
                        shopOpen
                          ? "text-primary bg-primary/5"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    Shop
                    <HiOutlineChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        shopOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mega Menu */}
                  {shopOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 w-[680px] bg-gray-950/95 backdrop-blur-2xl
                        border border-white/[.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,.6)]
                        nav-mega overflow-hidden"
                    >
                      <div className="grid grid-cols-5 gap-0">
                        {/* Category Cards */}
                        <div className="col-span-3 p-5">
                          <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase font-bold mb-4">
                            Categories
                          </p>
                          <div className="grid grid-cols-3 gap-3">
                            {SHOP_LINKS.map((item) => (
                              <Link
                                key={item.label}
                                to={item.to}
                                onClick={() => setShopOpen(false)}
                                className="group/card block rounded-xl border border-white/[.05]
                                  hover:border-primary/20 bg-white/[.02] hover:bg-primary/5
                                  transition-all duration-300 overflow-hidden"
                              >
                                <div className="aspect-[4/3] overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.label}
                                    className="w-full h-full object-cover transition-transform
                                      duration-700 group-hover/card:scale-110"
                                  />
                                </div>
                                <div className="p-3">
                                  <p className="text-sm font-bold text-white flex items-center gap-1.5">
                                    {/* <span className="text-base">{item.icon}</span> */}
                                    {item.label}
                                  </p>
                                  <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-span-2 p-5 bg-white/[.02] border-l border-white/[.05]">
                          <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase font-bold mb-4">
                            Quick Links
                          </p>
                          <div className="space-y-1">
                            {QUICK_LINKS.map((ql) => (
                              <Link
                                key={ql.label}
                                to={ql.to}
                                onClick={() => setShopOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                                  text-gray-400 hover:text-primary hover:bg-primary/5
                                  transition-all duration-300 group/ql"
                              >
                                <ql.icon className="w-4.5 h-4.5 text-gray-600 group-hover/ql:text-primary transition-colors" />
                                {ql.label}
                              </Link>
                            ))}
                          </div>

                          {/* Promo Card */}
                          <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-emerald-500/5 border border-primary/10">
                            <p className="text-primary text-xs font-black tracking-wider">
                              CUSTOM TEES
                            </p>
                            <p className="text-gray-400 text-[11px] mt-1 leading-relaxed">
                              Design your own. Upload art or choose from templates.
                            </p>
                            <Link
                              to="/products?category=custom"
                              onClick={() => setShopOpen(false)}
                              className="inline-flex items-center gap-1 mt-3 text-primary text-xs
                                font-bold hover:gap-2 transition-all"
                            >
                              Start Designing →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct links */}
                {[
                  { label: "New In", to: "/products?sort=-createdAt" },
                  { label: "Custom Tees", to: "/products?category=custom" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="px-3 py-2 text-sm font-semibold text-gray-400 hover:text-white
                      hover:bg-white/5 rounded-lg transition-all duration-300"
                  >
                    {link.label}
                    {link.label === "New In" && (
                      <span
                        className="ml-1.5 text-[9px] bg-primary/20 text-primary px-1.5 py-0.5
                          rounded-full font-bold"
                      >
                        NEW
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* ─ RIGHT: Actions ─ */}
            <div className="flex items-center gap-1">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                  searchOpen
                    ? "text-primary bg-primary/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                aria-label="Search"
              >
                {searchOpen ? (
                  <HiOutlineX className="w-5 h-5" />
                ) : (
                  <HiOutlineSearch className="w-5 h-5" />
                )}
              </button>

              {isAuth ? (
                <>
                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="hidden sm:flex p-2.5 rounded-xl text-gray-400 hover:text-primary
                      hover:bg-primary/5 transition-all duration-300 relative"
                    aria-label="Wishlist"
                  >
                    <HiOutlineHeart className="w-5 h-5" />
                  </Link>

                  {/* Cart */}
                  <Link
                    to="/cart"
                    className="p-2.5 rounded-xl text-gray-400 hover:text-primary
                      hover:bg-primary/5 transition-all duration-300 relative group"
                    aria-label="Cart"
                  >
                    <HiOutlineShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span
                        className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1
                          bg-primary text-black text-[10px] font-black rounded-full
                          flex items-center justify-center
                          group-hover:scale-110 transition-transform"
                      >
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Profile */}
                  <div ref={profileRef} className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className={`flex items-center gap-2 p-1.5 pr-3 rounded-xl transition-all
                        duration-300 cursor-pointer ${
                          profileOpen
                            ? "bg-primary/10 text-white"
                            : "hover:bg-white/5 text-gray-400 hover:text-white"
                        }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center
                          transition-all duration-300 ${
                            profileOpen
                              ? "bg-primary text-black"
                              : "bg-gradient-to-br from-primary/20 to-primary/5 text-primary"
                          }`}
                      >
                        <span className="font-bold text-sm">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="hidden sm:block text-sm font-semibold max-w-[80px] truncate">
                        {user?.name?.split(" ")[0]}
                      </span>
                      <HiOutlineChevronDown
                        className={`w-3 h-3 hidden sm:block transition-transform duration-300 ${
                          profileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Profile Dropdown */}
                    {profileOpen && (
                      <div
                        className="absolute right-0 mt-2 w-64 bg-gray-950/95 backdrop-blur-2xl
                          border border-white/[.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,.6)]
                          nav-mega overflow-hidden"
                      >
                        {/* User info header */}
                        <div className="p-4 border-b border-white/[.06] bg-white/[.02]">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-emerald-400
                                flex items-center justify-center flex-shrink-0"
                            >
                              <span className="text-black font-black text-lg">
                                {user?.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-white truncate">
                                {user?.name}
                              </p>
                              <p className="text-[11px] text-gray-500 truncate">
                                {user?.email}
                              </p>
                              {isAdmin && (
                                <span
                                  className="inline-flex items-center mt-1 text-[9px] bg-purple-500/20
                                    text-purple-400 px-2 py-0.5 rounded-full font-bold tracking-wider"
                                >
                                  👑 ADMIN
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Links */}
                        <div className="py-2">
                          <DropdownLink
                            to="/profile"
                            icon={HiOutlineUser}
                            label="My Profile"
                            desc="Account settings"
                            onClick={() => setProfileOpen(false)}
                          />
                          <DropdownLink
                            to="/my-orders"
                            icon={HiOutlineClipboardList}
                            label="My Orders"
                            desc="Track & manage"
                            onClick={() => setProfileOpen(false)}
                          />
                          <DropdownLink
                            to="/wishlist"
                            icon={HiOutlineHeart}
                            label="Wishlist"
                            desc="Saved items"
                            onClick={() => setProfileOpen(false)}
                          />
                          {isAdmin && (
                            <>
                              <div className="mx-3 my-1 border-t border-white/[.05]" />
                              <DropdownLink
                                to="/admin"
                                icon={HiOutlineCog}
                                label="Admin Panel"
                                desc="Manage store"
                                onClick={() => setProfileOpen(false)}
                                accent
                              />
                            </>
                          )}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-white/[.06] p-2">
                          <button
                            onClick={() => {
                              setProfileOpen(false);
                              handleLogout();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm
                              text-red-400 hover:bg-red-500/10 rounded-lg transition-all
                              duration-300 cursor-pointer group/lo"
                          >
                            <div
                              className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center
                                justify-center group-hover/lo:bg-red-500/20 transition-colors"
                            >
                              <HiOutlineLogout className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <p className="font-semibold">Logout</p>
                              <p className="text-[10px] text-red-400/60">
                                Sign out of your account
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white
                      rounded-lg hover:bg-white/5 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 text-sm bg-primary text-black font-bold rounded-lg
                      hover:shadow-[0_0_20px_rgba(0,255,136,.25)] transition-all duration-300
                      hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-gray-400 hover:text-white
                  hover:bg-white/5 transition-all duration-300 cursor-pointer ml-1"
                aria-label="Menu"
              >
                {menuOpen ? (
                  <HiOutlineX className="w-5 h-5" />
                ) : (
                  <HiOutlineMenu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
           SEARCH OVERLAY
         ═══════════════════════════════════════════ */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60]">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm search-overlay"
            onClick={() => setSearchOpen(false)}
          />

          {/* search container */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 pt-24">
            <div
              className="bg-gray-950/95 backdrop-blur-2xl border border-white/[.08]
                rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,.8)] overflow-hidden nav-mega"
            >
              <form onSubmit={handleSearch} className="p-2">
                <div className="relative">
                  <HiOutlineSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for products, categories, brands..."
                    className="w-full bg-transparent text-white text-lg pl-14 pr-14 py-5
                      placeholder-gray-600 focus:outline-none"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500
                        hover:text-white transition-colors cursor-pointer"
                    >
                      <HiOutlineX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </form>

              {/* Quick suggestions */}
              <div className="border-t border-white/[.06] p-5">
                <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase font-bold mb-3">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "T-Shirts",
                    "Custom Tees",
                    "Men's Collection",
                    "Women's Kurta",
                    "Kids Wear",
                    "Summer",
                    "Oversized",
                    "Cotton",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        navigate(`/products?search=${encodeURIComponent(term)}`);
                        setSearchOpen(false);
                        setSearch("");
                      }}
                      className="px-4 py-2 text-xs font-semibold text-gray-400 bg-white/[.04]
                        border border-white/[.06] rounded-full hover:border-primary/30
                        hover:text-primary hover:bg-primary/5 transition-all duration-300
                        cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category shortcuts */}
              <div className="border-t border-white/[.06] p-5">
                <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase font-bold mb-3">
                  Browse Categories
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {SHOP_LINKS.map((cat) => (
                    <Link
                      key={cat.label}
                      to={cat.to}
                      onClick={() => setSearchOpen(false)}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-white/[.02]
                        border border-white/[.05] hover:border-primary/20 hover:bg-primary/5
                        transition-all duration-300"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                          {cat.label}
                        </p>
                        <p className="text-[10px] text-gray-500">{cat.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* keyboard hint */}
              <div className="border-t border-white/[.06] px-5 py-3 flex items-center justify-between">
                <p className="text-[10px] text-gray-600">
                  Press <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-gray-400 text-[10px] font-mono">Enter</kbd> to search
                </p>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                >
                  Press <kbd className="px-1.5 py-0.5 bg-white/5 rounded text-gray-400 text-[10px] font-mono">ESC</kbd> to close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
           MOBILE FULLSCREEN MENU
         ═══════════════════════════════════════════ */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm search-overlay"
            onClick={() => setMenuOpen(false)}
          />

          {/* menu panel */}
          <div
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-gray-950/98 backdrop-blur-2xl
              border-l border-white/[.06] nav-mobile overflow-y-auto"
          >
            {/* header */}
            <div className="flex items-center justify-between p-4 border-b border-white/[.06]">
              <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-emerald-400
                    flex items-center justify-center"
                >
                  <span className="text-black font-black text-sm">J</span>
                </div>
                <span className="text-base font-black text-white">
                  JAI<span className="text-primary">MAX</span>
                </span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5
                  transition-all cursor-pointer"
              >
                <HiOutlineX className="w-5 h-5" />
              </button>
            </div>

            {/* search */}
            <div className="p-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-white/[.04] border border-white/[.08] rounded-xl
                      pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600
                      focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </form>
            </div>

            {/* categories */}
            <div className="px-4 pb-4">
              <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase font-bold mb-3 px-1">
                Shop By
              </p>
              <div className="space-y-1">
                {SHOP_LINKS.map((item, i) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm
                      text-gray-300 hover:text-primary hover:bg-primary/5
                      transition-all duration-300 nav-item-slide"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold flex items-center gap-1.5">
                        <span>{item.icon}</span> {item.label}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* quick links */}
            <div className="px-4 pb-4">
              <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase font-bold mb-3 px-1">
                Quick Links
              </p>
              <div className="space-y-0.5">
                {QUICK_LINKS.map((ql, i) => (
                  <Link
                    key={ql.label}
                    to={ql.to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                      text-gray-400 hover:text-primary hover:bg-primary/5
                      transition-all duration-300 nav-item-slide"
                    style={{ animationDelay: `${(SHOP_LINKS.length + i) * 60}ms` }}
                  >
                    <ql.icon className="w-5 h-5" />
                    <span className="font-semibold">{ql.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* user section */}
            {isAuth && (
              <div className="px-4 pb-4">
                <div className="border-t border-white/[.06] pt-4">
                  <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase font-bold mb-3 px-1">
                    Account
                  </p>
                  <div className="space-y-0.5">
                    {[
                      { to: "/profile", icon: HiOutlineUser, label: "My Profile" },
                      { to: "/my-orders", icon: HiOutlineClipboardList, label: "My Orders" },
                      { to: "/wishlist", icon: HiOutlineHeart, label: "Wishlist" },
                      ...(isAdmin
                        ? [{ to: "/admin", icon: HiOutlineCog, label: "Admin Panel" }]
                        : []),
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                          text-gray-400 hover:text-primary hover:bg-primary/5
                          transition-all duration-300"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-semibold">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* bottom */}
            <div className="p-4 border-t border-white/[.06] mt-auto">
              {isAuth ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm
                    text-red-400 bg-red-500/10 rounded-xl font-semibold
                    hover:bg-red-500/20 transition-all cursor-pointer"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-3 text-center text-sm font-semibold text-white
                      border border-white/10 rounded-xl hover:bg-white/5 transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full py-3 text-center text-sm font-bold text-black
                      bg-primary rounded-xl hover:shadow-[0_0_20px_rgba(0,255,136,.3)]
                      transition-all"
                  >
                    Sign Up Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ───────── Dropdown Link ───────── */
function DropdownLink({ to, icon: Icon, label, desc, onClick, accent }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-sm
        transition-all duration-300 group/dl ${
          accent
            ? "text-purple-400 hover:bg-purple-500/10"
            : "text-gray-300 hover:text-white hover:bg-white/5"
        }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
          transition-colors ${
            accent
              ? "bg-purple-500/10 group-hover/dl:bg-purple-500/20"
              : "bg-white/5 group-hover/dl:bg-white/10"
          }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="font-semibold leading-none">{label}</p>
        {desc && (
          <p className={`text-[10px] mt-0.5 ${accent ? "text-purple-400/50" : "text-gray-600"}`}>
            {desc}
          </p>
        )}
      </div>
    </Link>
  );
}