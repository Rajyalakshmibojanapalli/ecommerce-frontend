import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import { useGetCategoriesQuery } from "../features/categories/categoriesApiSlice";
import ProductGrid from "../components/product/ProductGrid";
import Button from "../components/ui/Button";
import {
  HiOutlineArrowRight, HiOutlineLightningBolt,
  HiOutlineTruck, HiOutlineShieldCheck, HiOutlineCurrencyRupee,
} from "react-icons/hi";

export default function Home() {
  const { data: featuredData, isLoading: fl } = useGetProductsQuery({ featured: true, limit: 8 });
  const { data: latestData, isLoading: ll } = useGetProductsQuery({ limit: 8, sort: "-createdAt" });
  const { data: catData } = useGetCategoriesQuery();

  const featured = featuredData?.data?.products || [];
  const latest = latestData?.data?.products || [];
  const categories = catData?.data?.categories || [];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary 
              px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <HiOutlineLightningBolt className="w-4 h-4" /> New Season Collection
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Shop Smarter,<br />
              <span className="text-primary glow-text">Save Bigger</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-lg">
              Discover amazing products at unbeatable prices. Free shipping on orders above ₹500.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg">Shop Now <HiOutlineArrowRight className="w-5 h-5" /></Button>
              </Link>
              <Link to="/products?featured=true">
                <Button variant="outline" size="lg">Featured Picks</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-dark-border bg-dark-light/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: HiOutlineTruck, label: "Free Shipping", sub: "Orders ₹500+" },
              { icon: HiOutlineShieldCheck, label: "Secure Payment", sub: "100% Protected" },
              { icon: HiOutlineCurrencyRupee, label: "Best Prices", sub: "Guaranteed" },
              { icon: HiOutlineLightningBolt, label: "Fast Delivery", sub: "2-5 Days" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <f.icon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">{f.label}</p>
                  <p className="text-xs text-gray-500">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <SectionHeader title="Shop by Category" link="/products" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat._id} to={`/products?category=${cat._id}`}
                className="group bg-dark-card border border-dark-border rounded-xl p-6 
                  text-center hover:border-primary/30 hover:glow transition-all">
                <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-primary/10 
                  flex items-center justify-center">
                  <span className="text-2xl text-primary font-bold">{cat.name.charAt(0)}</span>
                </div>
                <p className="text-sm font-medium text-gray-300 group-hover:text-primary transition">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader title="🔥 Featured Products" link="/products?featured=true" />
        <ProductGrid products={featured} loading={fl} />
      </section>

      {/* Latest */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader title="🆕 New Arrivals" link="/products?sort=-createdAt" />
        <ProductGrid products={latest} loading={ll} />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="gradient-primary rounded-2xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Get 20% Off Your First Order
          </h2>
          <p className="text-black/70 mb-8">
            Use code <span className="font-bold">FIRST20</span> at checkout.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg" className="!bg-black !text-white hover:!bg-gray-900">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, link }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <Link to={link} className="text-primary text-sm hover:underline flex items-center gap-1">
        View All <HiOutlineArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}


// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectIsAdmin, selectIsAuthenticated } from "../features/auth/authSlice";

// export default function Home() {
//   const isAuth = useSelector(selectIsAuthenticated);
//   const isAdmin = useSelector(selectIsAdmin);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-20">
//       <div className="text-center">
//         <h1 className="text-5xl font-bold text-white mb-4">
//           Shop<span className="text-primary">Ease</span>
//         </h1>
//         <p className="text-xl text-gray-400 mb-8">
//           Your one-stop ecommerce store
//         </p>

//         <div className="flex gap-4 justify-center flex-wrap">
//           {!isAuth ? (
//             <>
//               <Link to="/login"
//                 className="px-8 py-3 bg-primary text-black font-semibold rounded-lg 
//                   hover:bg-primary-dark transition">
//                 Login
//               </Link>
//               <Link to="/register"
//                 className="px-8 py-3 border-2 border-primary text-primary rounded-lg 
//                   hover:bg-primary hover:text-black transition">
//                 Register
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/products"
//                 className="px-8 py-3 bg-primary text-black font-semibold rounded-lg 
//                   hover:bg-primary-dark transition">
//                 Shop Now
//               </Link>
//               <Link to="/my-orders"
//                 className="px-8 py-3 border-2 border-primary text-primary rounded-lg 
//                   hover:bg-primary hover:text-black transition">
//                 My Orders
//               </Link>

//               {/* ✅ Admin Button - Only shows for admins */}
//               {isAdmin && (
//                 <Link to="/admin"
//                   className="px-8 py-3 bg-purple-500/20 text-purple-400 border 
//                     border-purple-500/30 font-semibold rounded-lg 
//                     hover:bg-purple-500/30 transition">
//                   🔧 Admin Panel
//                 </Link>
//               )}
//             </>
//           )}
//         </div>

//         {/* User Info */}
//         {isAuth && (
//           <div className="mt-12 bg-dark-card border border-dark-border rounded-xl p-6 
//             max-w-md mx-auto text-left">
//             <h3 className="text-primary font-semibold mb-2">✅ Logged In</h3>
//             <p className="text-sm text-gray-400">
//               Role: <span className="text-white font-medium">
//                 {isAdmin ? "Admin 👑" : "User"}
//               </span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }