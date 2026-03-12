import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HiOutlineShoppingCart, HiOutlineHeart, HiOutlineUser,
  HiOutlineSearch, HiOutlineMenu, HiOutlineX, HiOutlineLogout,
  HiOutlineCog, HiOutlineClipboardList,
} from "react-icons/hi";
import { selectCurrentUser, selectIsAuthenticated, selectIsAdmin, logout } from "../../features/auth/authSlice";
import { selectCartItemsCount } from "../../features/cart/cartSlice";
import { useLogoutApiMutation } from "../../features/auth/authApiSlice";
import { apiSlice } from "../../features/api/apiSlice";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const isAuth = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const cartCount = useSelector(selectCartItemsCount);
  const [logoutApi] = useLogoutApiMutation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${search}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch {}
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 glass border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">V</span>
            </div>
            <span className="text-xl font-bold text-white">
              Velvet<span className="text-primary">Curve</span>
            </span>
          </Link>

          {/* Search - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input type="text" value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-dark-light border border-dark-border rounded-lg 
                  pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500
                  focus:outline-none focus:border-primary transition" />
            </div>
          </form>

          {/* Right */}
          <div className="flex items-center gap-1">
            {isAuth ? (
              <>
                <Link to="/wishlist"
                  className="p-2 rounded-lg text-gray-400 hover:text-primary 
                    hover:bg-dark-lighter transition hidden sm:block">
                  <HiOutlineHeart className="w-6 h-6" />
                </Link>

                <Link to="/cart"
                  className="p-2 rounded-lg text-gray-400 hover:text-primary 
                    hover:bg-dark-lighter transition relative">
                  <HiOutlineShoppingCart className="w-6 h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary 
                      text-black text-xs font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Profile */}
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-2 rounded-lg text-gray-400 
                      hover:text-white hover:bg-dark-lighter transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-white">
                      {user?.name?.split(" ")[0]}
                    </span>
                  </button>

                  {profileOpen && (
                    <>
                      <div className="fixed inset-0" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-dark-light border 
                        border-dark-border rounded-xl shadow-xl overflow-hidden">
                        <div className="p-3 border-b border-dark-border">
                          <p className="text-sm font-medium text-white">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <div className="py-1">
                          <DropdownLink to="/profile" icon={HiOutlineUser} label="My Profile"
                            onClick={() => setProfileOpen(false)} />
                          <DropdownLink to="/my-orders" icon={HiOutlineClipboardList} label="My Orders"
                            onClick={() => setProfileOpen(false)} />
                          <DropdownLink to="/wishlist" icon={HiOutlineHeart} label="Wishlist"
                            onClick={() => setProfileOpen(false)} />
                          {isAdmin && (
                            <DropdownLink to="/admin" icon={HiOutlineCog} label="Admin Panel"
                              onClick={() => setProfileOpen(false)} />
                          )}
                        </div>
                        <div className="border-t border-dark-border py-1">
                          <button onClick={() => { setProfileOpen(false); handleLogout(); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm 
                              text-red-400 hover:bg-red-500/10 transition cursor-pointer">
                            <HiOutlineLogout className="w-5 h-5" /> Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition">
                  Login
                </Link>
                <Link to="/register"
                  className="px-4 py-2 text-sm bg-primary text-black font-semibold 
                    rounded-lg hover:bg-primary-dark transition">
                  Sign Up
                </Link>
              </div>
            )}

            <button onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white cursor-pointer">
              {menuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-dark-border mt-2 pt-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full bg-dark-light border border-dark-border rounded-lg 
                    pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500
                    focus:outline-none focus:border-primary" />
              </div>
            </form>
            <div className="space-y-1">
              {[
                { to: "/products", label: "All Products" },
                { to: "/wishlist", label: "Wishlist" },
                { to: "/my-orders", label: "My Orders" },
              ].map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white
                    hover:bg-dark-lighter rounded-lg transition">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function DropdownLink({ to, icon: Icon, label, onClick }) {
  return (
    <Link to={to} onClick={onClick}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 
        hover:text-white hover:bg-dark-lighter transition">
      <Icon className="w-5 h-5" /> {label}
    </Link>
  );
}