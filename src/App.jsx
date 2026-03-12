// App.jsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useGetMeQuery } from "./features/auth/authApiSlice";
import { setCredentials, selectCurrentToken } from "./features/auth/authSlice";
import { useGetCartQuery } from "./features/cart/cartApiSlice";
import { PageLoader } from "./components/ui/Loader";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

// ─────────────────────────────────────────────
//  PUBLIC PAGES
// ─────────────────────────────────────────────
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

// New Public Pages
import Contact from "./pages/Contact";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import DynamicPage from "./pages/DynamicPage";
import SearchResults from "./pages/SearchResults";

// ─────────────────────────────────────────────
//  PROTECTED PAGES (Logged-in users)
// ─────────────────────────────────────────────
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

// New Protected Pages
import Addresses from "./pages/Addresses";
import Notifications from "./pages/Notifications";
import CustomDesignCreator from "./pages/CustomDesignCreator";
import MyDesigns from "./pages/MyDesigns";

// ─────────────────────────────────────────────
//  ADMIN PAGES
// ─────────────────────────────────────────────
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminUsers from "./pages/admin/AdminUsers";

// New Admin Pages
import AdminNewsletter from "./pages/admin/AdminNewsletter";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminBanners from "./pages/admin/AdminBanners";
import AdminCustomDesigns from "./pages/admin/AdminCustomDesigns";
import AdminPages from "./pages/admin/AdminPages";

// ─────────────────────────────────────────────
//  HELPER: wraps page in Layout
// ─────────────────────────────────────────────
function P({ children }) {
  return <Layout>{children}</Layout>;
}

function PP({ children }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

// ═══════════════════════════════════════════════
//  APP CONTENT
// ═══════════════════════════════════════════════
function AppContent() {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);

  // Auto-fetch user on app load if token exists
  const { data, isLoading } = useGetMeQuery(undefined, { skip: !token });

  // Auto-fetch cart when authenticated
  const { isAuthenticated } = useSelector((s) => s.auth);
  useGetCartQuery(undefined, { skip: !isAuthenticated });

  useEffect(() => {
    if (data?.data?.user) {
      dispatch(setCredentials({ user: data.data.user, token }));
    }
  }, [data, dispatch, token]);

  if (token && isLoading) return <PageLoader />;

  return (
    <Routes>
      {/* ═══════════════════════════════════════
            PUBLIC ROUTES
         ═══════════════════════════════════════ */}
      <Route path="/" element={<P><Home /></P>} />
      <Route path="/login" element={<P><Login /></P>} />
      <Route path="/register" element={<P><Register /></P>} />
      <Route path="/products" element={<P><Products /></P>} />
      <Route path="/products/:slug" element={<P><ProductDetail /></P>} />

      {/* Search */}
      <Route path="/search" element={<P><SearchResults /></P>} />

      {/* Blog */}
      <Route path="/blog" element={<P><BlogList /></P>} />
      <Route path="/blog/:slug" element={<P><BlogDetail /></P>} />

      {/* Contact */}
      <Route path="/contact" element={<P><Contact /></P>} />

      {/* Static / Dynamic Pages */}
      <Route path="/about" element={<P><DynamicPage /></P>} />
      <Route path="/faq" element={<P><DynamicPage /></P>} />
      <Route path="/shipping" element={<P><DynamicPage /></P>} />
      <Route path="/returns" element={<P><DynamicPage /></P>} />
      <Route path="/privacy" element={<P><DynamicPage /></P>} />
      <Route path="/terms" element={<P><DynamicPage /></P>} />
      <Route path="/cookies" element={<P><DynamicPage /></P>} />
      <Route path="/size-guide" element={<P><DynamicPage /></P>} />
      <Route path="/careers" element={<P><DynamicPage /></P>} />
      <Route path="/press" element={<P><DynamicPage /></P>} />
      <Route path="/page/:slug" element={<P><DynamicPage /></P>} />

      {/* ═══════════════════════════════════════
            PROTECTED ROUTES (logged-in users)
         ═══════════════════════════════════════ */}
      <Route path="/cart" element={<PP><Cart /></PP>} />
      <Route path="/checkout" element={<PP><Checkout /></PP>} />
      <Route path="/my-orders" element={<PP><MyOrders /></PP>} />
      <Route path="/order/:id" element={<PP><OrderDetail /></PP>} />
      <Route path="/profile" element={<PP><Profile /></PP>} />
      <Route path="/wishlist" element={<PP><Wishlist /></PP>} />

      {/* New Protected */}
      <Route path="/addresses" element={<PP><Addresses /></PP>} />
      <Route path="/notifications" element={<PP><Notifications /></PP>} />
      <Route path="/custom-design" element={<PP><CustomDesignCreator /></PP>} />
      <Route path="/my-designs" element={<PP><MyDesigns /></PP>} />

      {/* ═══════════════════════════════════════
            ADMIN ROUTES
         ═══════════════════════════════════════ */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />

        {/* Existing Admin */}
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductForm />} />
        <Route path="products/edit/:id" element={<AdminProductForm />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="coupons" element={<AdminCoupons />} />
        <Route path="users" element={<AdminUsers />} />

        {/* New Admin */}
        <Route path="newsletter" element={<AdminNewsletter />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="banners" element={<AdminBanners />} />
        <Route path="custom-designs" element={<AdminCustomDesigns />} />
        <Route path="pages" element={<AdminPages />} />
      </Route>

      {/* ═══════════════════════════════════════
            404
         ═══════════════════════════════════════ */}
      <Route path="*" element={<P><NotFound /></P>} />
    </Routes>
  );
}

// ═══════════════════════════════════════════════
//  APP ROOT
// ═══════════════════════════════════════════════
export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0a0f14",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "600",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          },
          success: {
            iconTheme: { primary: "#00ff88", secondary: "#000" },
            style: {
              background: "#0a0f14",
              border: "1px solid rgba(0,255,136,0.1)",
            },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
            style: {
              background: "#0a0f14",
              border: "1px solid rgba(239,68,68,0.1)",
            },
          },
        }}
      />
      <AppContent />
    </BrowserRouter>
  );
}