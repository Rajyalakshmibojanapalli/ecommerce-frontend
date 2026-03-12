// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";

// Existing pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import MyOrders from "../pages/MyOrders";
import OrderDetail from "../pages/OrderDetail";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

// New pages
import Wishlist from "../pages/Wishlist";
import Contact from "../pages/Contact";
import BlogList from "../pages/BlogList";
import BlogDetail from "../pages/BlogDetail";
import DynamicPage from "../pages/DynamicPage";
import CustomDesignCreator from "../pages/CustomDesignCreator";
import MyDesigns from "../pages/MyDesigns";
import Notifications from "../pages/Notifications";
import Addresses from "../pages/Addresses";
import SearchResults from "../pages/SearchResults";

// Existing admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminCoupons from "../pages/admin/AdminCoupons";

// New admin
import AdminNewsletter from "../pages/admin/AdminNewsletter";
import AdminContacts from "../pages/admin/AdminContacts";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminBanners from "../pages/admin/AdminBanners";
import AdminCustomDesigns from "../pages/admin/AdminCustomDesigns";
import AdminPages from "../pages/admin/AdminPages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* ── PUBLIC ── */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="search" element={<SearchResults />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/:slug" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />

        {/* Static pages */}
        <Route path="about" element={<DynamicPage />} />
        <Route path="faq" element={<DynamicPage />} />
        <Route path="shipping" element={<DynamicPage />} />
        <Route path="returns" element={<DynamicPage />} />
        <Route path="privacy" element={<DynamicPage />} />
        <Route path="terms" element={<DynamicPage />} />
        <Route path="size-guide" element={<DynamicPage />} />
        <Route path="careers" element={<DynamicPage />} />
        <Route path="press" element={<DynamicPage />} />
        <Route path="cookies" element={<DynamicPage />} />
        <Route path="page/:slug" element={<DynamicPage />} />

        {/* ── PROTECTED (logged-in) ── */}
        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="addresses" element={<Addresses />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="custom-design" element={<CustomDesignCreator />} />
          <Route path="my-designs" element={<MyDesigns />} />
        </Route>

        {/* ── ADMIN ── */}
        <Route path="admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="coupons" element={<AdminCoupons />} />
          {/* New admin pages */}
          <Route path="newsletter" element={<AdminNewsletter />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="banners" element={<AdminBanners />} />
          <Route path="custom-designs" element={<AdminCustomDesigns />} />
          <Route path="pages" element={<AdminPages />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}