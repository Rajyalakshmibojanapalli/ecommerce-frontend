// import { Link } from "react-router-dom";
// import { useGetProductsQuery } from "../features/products/productsApiSlice";
// import { useGetCategoriesQuery } from "../features/categories/categoriesApiSlice";
// import ProductGrid from "../components/product/ProductGrid";
// import Button from "../components/ui/Button";
// import {
//   HiOutlineArrowRight, HiOutlineLightningBolt,
//   HiOutlineTruck, HiOutlineShieldCheck, HiOutlineCurrencyRupee,
// } from "react-icons/hi";

// export default function Home() {
//   const { data: featuredData, isLoading: fl } = useGetProductsQuery({ featured: true, limit: 8 });
//   const { data: latestData, isLoading: ll } = useGetProductsQuery({ limit: 8, sort: "-createdAt" });
//   const { data: catData } = useGetCategoriesQuery();

//   const featured = featuredData?.data?.products || [];
//   const latest = latestData?.data?.products || [];
//   const categories = catData?.data?.categories || [];

//   return (
//     <div>
//       {/* Hero */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
//         <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative">
//           <div className="max-w-2xl">
//             <span className="inline-flex items-center gap-2 bg-primary/10 text-primary 
//               px-4 py-1.5 rounded-full text-sm font-medium mb-6">
//               <HiOutlineLightningBolt className="w-4 h-4" /> New Season Collection
//             </span>
//             <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
//               Shop Smarter,<br />
//               <span className="text-primary glow-text">Save Bigger</span>
//             </h1>
//             <p className="text-lg text-gray-400 mb-8 max-w-lg">
//               Discover amazing products at unbeatable prices. Free shipping on orders above ₹500.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Link to="/products">
//                 <Button size="lg">Shop Now <HiOutlineArrowRight className="w-5 h-5" /></Button>
//               </Link>
//               <Link to="/products?featured=true">
//                 <Button variant="outline" size="lg">Featured Picks</Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="border-y border-dark-border bg-dark-light/50">
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               { icon: HiOutlineTruck, label: "Free Shipping", sub: "Orders ₹500+" },
//               { icon: HiOutlineShieldCheck, label: "Secure Payment", sub: "100% Protected" },
//               { icon: HiOutlineCurrencyRupee, label: "Best Prices", sub: "Guaranteed" },
//               { icon: HiOutlineLightningBolt, label: "Fast Delivery", sub: "2-5 Days" },
//             ].map((f, i) => (
//               <div key={i} className="flex items-center gap-3">
//                 <f.icon className="w-8 h-8 text-primary flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-semibold text-white">{f.label}</p>
//                   <p className="text-xs text-gray-500">{f.sub}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Categories */}
//       {categories.length > 0 && (
//         <section className="max-w-7xl mx-auto px-4 py-16">
//           <SectionHeader title="Shop by Category" link="/products" />
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//             {categories.map((cat) => (
//               <Link key={cat._id} to={`/products?category=${cat._id}`}
//                 className="group bg-dark-card border border-dark-border rounded-xl p-6 
//                   text-center hover:border-primary/30 hover:glow transition-all">
//                 <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-primary/10 
//                   flex items-center justify-center">
//                   <span className="text-2xl text-primary font-bold">{cat.name.charAt(0)}</span>
//                 </div>
//                 <p className="text-sm font-medium text-gray-300 group-hover:text-primary transition">
//                   {cat.name}
//                 </p>
//               </Link>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Featured */}
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <SectionHeader title="🔥 Featured Products" link="/products?featured=true" />
//         <ProductGrid products={featured} loading={fl} />
//       </section>

//       {/* Latest */}
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <SectionHeader title="🆕 New Arrivals" link="/products?sort=-createdAt" />
//         <ProductGrid products={latest} loading={ll} />
//       </section>

//       {/* CTA */}
//       <section className="max-w-7xl mx-auto px-4 py-16">
//         <div className="gradient-primary rounded-2xl p-10 md:p-16 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
//             Get 20% Off Your First Order
//           </h2>
//           <p className="text-black/70 mb-8">
//             Use code <span className="font-bold">FIRST20</span> at checkout.
//           </p>
//           <Link to="/register">
//             <Button variant="secondary" size="lg" className="!bg-black !text-white hover:!bg-gray-900">
//               Sign Up Now
//             </Button>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// function SectionHeader({ title, link }) {
//   return (
//     <div className="flex items-center justify-between mb-8">
//       <h2 className="text-2xl font-bold text-white">{title}</h2>
//       <Link to={link} className="text-primary text-sm hover:underline flex items-center gap-1">
//         View All <HiOutlineArrowRight className="w-4 h-4" />
//       </Link>
//     </div>
//   );
// }


// // import { Link } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { selectIsAdmin, selectIsAuthenticated } from "../features/auth/authSlice";

// // export default function Home() {
// //   const isAuth = useSelector(selectIsAuthenticated);
// //   const isAdmin = useSelector(selectIsAdmin);

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-20">
// //       <div className="text-center">
// //         <h1 className="text-5xl font-bold text-white mb-4">
// //           Shop<span className="text-primary">Ease</span>
// //         </h1>
// //         <p className="text-xl text-gray-400 mb-8">
// //           Your one-stop ecommerce store
// //         </p>

// //         <div className="flex gap-4 justify-center flex-wrap">
// //           {!isAuth ? (
// //             <>
// //               <Link to="/login"
// //                 className="px-8 py-3 bg-primary text-black font-semibold rounded-lg 
// //                   hover:bg-primary-dark transition">
// //                 Login
// //               </Link>
// //               <Link to="/register"
// //                 className="px-8 py-3 border-2 border-primary text-primary rounded-lg 
// //                   hover:bg-primary hover:text-black transition">
// //                 Register
// //               </Link>
// //             </>
// //           ) : (
// //             <>
// //               <Link to="/products"
// //                 className="px-8 py-3 bg-primary text-black font-semibold rounded-lg 
// //                   hover:bg-primary-dark transition">
// //                 Shop Now
// //               </Link>
// //               <Link to="/my-orders"
// //                 className="px-8 py-3 border-2 border-primary text-primary rounded-lg 
// //                   hover:bg-primary hover:text-black transition">
// //                 My Orders
// //               </Link>

// //               {/* ✅ Admin Button - Only shows for admins */}
// //               {isAdmin && (
// //                 <Link to="/admin"
// //                   className="px-8 py-3 bg-purple-500/20 text-purple-400 border 
// //                     border-purple-500/30 font-semibold rounded-lg 
// //                     hover:bg-purple-500/30 transition">
// //                   🔧 Admin Panel
// //                 </Link>
// //               )}
// //             </>
// //           )}
// //         </div>

// //         {/* User Info */}
// //         {isAuth && (
// //           <div className="mt-12 bg-dark-card border border-dark-border rounded-xl p-6 
// //             max-w-md mx-auto text-left">
// //             <h3 className="text-primary font-semibold mb-2">✅ Logged In</h3>
// //             <p className="text-sm text-gray-400">
// //               Role: <span className="text-white font-medium">
// //                 {isAdmin ? "Admin 👑" : "User"}
// //               </span>
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../features/products/productsApiSlice";
import { useGetCategoriesQuery } from "../features/categories/categoriesApiSlice";
import ProductGrid from "../components/product/ProductGrid";
import {
  HiOutlineArrowRight,
  HiOutlineLightningBolt,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineCurrencyRupee,
} from "react-icons/hi";

// ═══════════════════════════════════════════════════
//  CONSTANTS
// ═══════════════════════════════════════════════════

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80&fit=crop",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1920&q=80&fit=crop",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80&fit=crop",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80&fit=crop",
];

const CATEGORY_DATA = [
  {
    name: "Men",
    slug: "men",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80&fit=crop",
    desc: "Elevate your everyday",
  },
  {
    name: "Women",
    slug: "women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&fit=crop",
    desc: "Effortless elegance",
  },
  {
    name: "Kids",
    slug: "kids",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80&fit=crop",
    desc: "Fun & colorful",
  },
];

const SKIN_TONES = [
  { name: "Fair", hex: "#FDEBD0", best: [0, 1, 2, 9] },
  { name: "Light", hex: "#F5CBA7", best: [8, 1, 5, 7] },
  { name: "Medium", hex: "#E0A370", best: [6, 3, 2, 7] },
  { name: "Tan", hex: "#C68642", best: [6, 5, 8, 9] },
  { name: "Deep", hex: "#8D5524", best: [6, 3, 5, 7] },
  { name: "Dark", hex: "#5C3310", best: [6, 3, 7, 5] },
];

const CLOTH_COLORS = [
  { name: "Navy", hex: "#1B2A4A" },
  { name: "Burgundy", hex: "#722F37" },
  { name: "Forest", hex: "#2D5F2D" },
  { name: "White", hex: "#F5F5F5" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Mustard", hex: "#FFDB58" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Teal", hex: "#008080" },
  { name: "Lavender", hex: "#B57EDC" },
  { name: "Rose", hex: "#E8637A" },
  { name: "Olive", hex: "#6B8E23" },
];

const TEE_CARDS = [
  {
    title: "Minimal Line Art",
    style: "Clean & Simple",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fit=crop",
  },
  {
    title: "Urban Graphics",
    style: "Street Style",
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80&fit=crop",
  },
  {
    title: "Typography Tees",
    style: "Bold Words",
    img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80&fit=crop",
  },
  {
    title: "Abstract Art",
    style: "Artistic",
    img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80&fit=crop",
  },
];

// ═══════════════════════════════════════════════════
//  REVEAL (scroll animation wrapper)
// ═══════════════════════════════════════════════════

function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.unobserve(e.target);
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  const m = {
    up: "translate-y-16",
    down: "-translate-y-16",
    left: "translate-x-20",
    right: "-translate-x-20",
    scale: "scale-90",
  };
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] ${
        v ? "opacity-100 translate-x-0 translate-y-0 scale-100" : `opacity-0 ${m[direction] || ""}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  SVG PERSON FIGURES
// ═══════════════════════════════════════════════════

function PersonFigure({ type = "man", skinColor, clothColor }) {
  const s = { fill: skinColor, transition: "fill 0.6s ease" };
  const c = { fill: clothColor, transition: "fill 0.6s ease" };

  /* ── MAN ── */
  if (type === "man")
    return (
      <svg viewBox="0 0 200 430" className="w-full h-full drop-shadow-2xl">
        {/* hair */}
        <path
          d="M62,60 Q62,26 100,22 Q138,26 138,60 L134,48 Q100,34 66,48Z"
          fill="#1a1a2e"
        />
        {/* head */}
        <circle cx="100" cy="65" r="30" style={s} />
        {/* brows */}
        <line x1="82" y1="50" x2="94" y2="50" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="106" y1="50" x2="118" y2="50" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        {/* eyes */}
        <circle cx="88" cy="58" r="3.8" fill="#222" />
        <circle cx="112" cy="58" r="3.8" fill="#222" />
        <circle cx="89.5" cy="56.5" r="1.4" fill="#fff" />
        <circle cx="113.5" cy="56.5" r="1.4" fill="#fff" />
        {/* smile */}
        <path
          d="M90,78 Q100,88 110,78"
          fill="none"
          stroke="#444"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* neck */}
        <rect x="92" y="92" width="16" height="20" rx="6" style={s} />
        {/* t-shirt body */}
        <path
          d="M52,118 Q52,108 64,106 L82,106 Q92,122 100,122 Q108,122 118,106 L136,106
             Q148,108 148,118 L148,250 Q148,260 138,260 L62,260 Q52,260 52,250Z"
          style={c}
        />
        {/* collar line */}
        <path
          d="M82,106 Q92,122 100,122 Q108,122 118,106"
          fill="none"
          stroke="rgba(0,0,0,.12)"
          strokeWidth="1.5"
        />
        {/* left sleeve */}
        <path d="M52,118 L26,148 L26,170 Q26,174 30,174 L38,174 L52,154Z" style={c} />
        {/* right sleeve */}
        <path d="M148,118 L174,148 L174,170 Q174,174 170,174 L162,174 L148,154Z" style={c} />
        {/* left arm + hand */}
        <rect x="23" y="170" width="16" height="42" rx="8" style={s} />
        <ellipse cx="31" cy="218" rx="11" ry="9" style={s} />
        {/* right arm + hand */}
        <rect x="161" y="170" width="16" height="42" rx="8" style={s} />
        <ellipse cx="169" cy="218" rx="11" ry="9" style={s} />
        {/* jeans */}
        <path
          d="M52,258 L52,385 Q52,395 62,395 L88,395 Q93,395 93,385 L93,282
             L107,282 L107,385 Q107,395 112,395 L138,395 Q148,395 148,385 L148,258Z"
          fill="#374151"
        />
        {/* belt */}
        <rect x="52" y="256" width="96" height="8" rx="2" fill="#1f2937" />
        <rect x="96" y="255" width="8" height="10" rx="2" fill="#d4a853" />
        {/* shoes */}
        <rect x="46" y="390" width="52" height="16" rx="8" fill="#1f2937" />
        <rect x="102" y="390" width="52" height="16" rx="8" fill="#1f2937" />
      </svg>
    );

  /* ── WOMAN ── */
  if (type === "woman")
    return (
      <svg viewBox="0 0 200 430" className="w-full h-full drop-shadow-2xl">
        {/* long hair back */}
        <path
          d="M56,55 Q56,16 100,12 Q144,16 144,55 L150,125 Q152,145 140,135 L138,62
             Q138,32 100,26 Q62,32 62,62 L60,135 Q48,145 50,125Z"
          fill="#3d2314"
        />
        {/* head */}
        <circle cx="100" cy="62" r="28" style={s} />
        {/* hair bangs */}
        <path d="M72,48 Q72,38 80,35 Q74,50 72,55Z" fill="#3d2314" />
        <path d="M128,48 Q128,38 120,35 Q126,50 128,55Z" fill="#3d2314" />
        {/* eyes */}
        <ellipse cx="88" cy="58" rx="3" ry="3.5" fill="#222" />
        <ellipse cx="112" cy="58" rx="3" ry="3.5" fill="#222" />
        <circle cx="89.3" cy="56.5" r="1.2" fill="#fff" />
        <circle cx="113.3" cy="56.5" r="1.2" fill="#fff" />
        {/* lashes */}
        <path d="M84,54 L81,51" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M116,54 L119,51" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        {/* blush */}
        <circle cx="78" cy="68" r="5" fill="rgba(255,150,150,.15)" />
        <circle cx="122" cy="68" r="5" fill="rgba(255,150,150,.15)" />
        {/* lips */}
        <path d="M92,75 Q100,84 108,75" fill="#e8a0a0" />
        {/* earrings */}
        <circle cx="72" cy="68" r="3" fill="#d4a853" opacity=".7" />
        <circle cx="128" cy="68" r="3" fill="#d4a853" opacity=".7" />
        {/* neck */}
        <rect x="93" y="87" width="14" height="18" rx="5" style={s} />
        {/* top */}
        <path
          d="M58,110 Q58,104 68,102 L84,102 Q92,114 100,114 Q108,114 116,102 L132,102
             Q142,104 142,110 L140,195 Q140,200 133,200 L67,200 Q60,200 60,195Z"
          style={c}
        />
        {/* neckline detail */}
        <path
          d="M84,102 Q92,114 100,114 Q108,114 116,102"
          fill="none"
          stroke="rgba(0,0,0,.1)"
          strokeWidth="1.5"
        />
        {/* cap sleeves */}
        <path d="M58,110 L38,130 L38,142 Q38,146 42,146 L48,146 L58,128Z" style={c} />
        <path d="M142,110 L162,130 L162,142 Q162,146 158,146 L152,146 L142,128Z" style={c} />
        {/* arms + hands */}
        <rect x="35" y="142" width="14" height="44" rx="7" style={s} />
        <ellipse cx="42" cy="192" rx="10" ry="8" style={s} />
        <rect x="151" y="142" width="14" height="44" rx="7" style={s} />
        <ellipse cx="158" cy="192" rx="10" ry="8" style={s} />
        {/* skirt */}
        <path
          d="M60,198 L40,370 Q38,380 52,380 L148,380 Q162,380 160,370 L140,198Z"
          style={c}
        />
        {/* skirt fold lines */}
        <line x1="80" y1="210" x2="68" y2="375" stroke="rgba(0,0,0,.06)" strokeWidth="1" />
        <line x1="120" y1="210" x2="132" y2="375" stroke="rgba(0,0,0,.06)" strokeWidth="1" />
        {/* legs */}
        <rect x="68" y="375" width="12" height="28" rx="6" style={s} />
        <rect x="120" y="375" width="12" height="28" rx="6" style={s} />
        {/* heels */}
        <path d="M62,400 L86,400 L86,410 Q86,416 78,416 L66,416 Q58,416 62,406Z" fill="#1f2937" />
        <path d="M114,400 L138,400 L138,410 Q138,416 130,416 L118,416 Q110,416 114,406Z" fill="#1f2937" />
      </svg>
    );

  /* ── KID ── */
  return (
    <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-2xl">
      {/* hair */}
      <path
        d="M58,72 Q55,32 100,26 Q145,32 142,72 L138,58 Q100,42 62,58Z"
        fill="#5c4033"
      />
      {/* cowlick */}
      <path d="M94,28 Q98,16 106,24" fill="#5c4033" stroke="#5c4033" strokeWidth="2" />
      {/* head (bigger for kid) */}
      <circle cx="100" cy="78" r="35" style={s} />
      {/* big eyes */}
      <circle cx="85" cy="74" r="5.5" fill="#222" />
      <circle cx="115" cy="74" r="5.5" fill="#222" />
      <circle cx="87" cy="72" r="2.2" fill="#fff" />
      <circle cx="117" cy="72" r="2.2" fill="#fff" />
      {/* freckles */}
      <circle cx="76" cy="85" r="1.5" fill="rgba(0,0,0,.07)" />
      <circle cx="82" cy="88" r="1.5" fill="rgba(0,0,0,.07)" />
      <circle cx="124" cy="85" r="1.5" fill="rgba(0,0,0,.07)" />
      <circle cx="118" cy="88" r="1.5" fill="rgba(0,0,0,.07)" />
      {/* big smile */}
      <path
        d="M82,94 Q100,110 118,94"
        fill="none"
        stroke="#444"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* neck */}
      <rect x="93" y="110" width="14" height="14" rx="5" style={s} />
      {/* t-shirt */}
      <path
        d="M52,130 Q52,122 62,120 L82,120 Q92,134 100,134 Q108,134 118,120 L138,120
           Q148,122 148,130 L148,240 Q148,248 140,248 L60,248 Q52,248 52,240Z"
        style={c}
      />
      {/* star graphic */}
      <text
        x="100"
        y="198"
        textAnchor="middle"
        fontSize="30"
        fill="rgba(255,255,255,.2)"
        fontFamily="sans-serif"
      >
        ★
      </text>
      {/* sleeves */}
      <path d="M52,130 L28,155 L28,174 Q28,178 32,178 L40,178 L52,158Z" style={c} />
      <path d="M148,130 L172,155 L172,174 Q172,178 168,178 L160,178 L148,158Z" style={c} />
      {/* arms + hands */}
      <rect x="25" y="174" width="14" height="36" rx="7" style={s} />
      <ellipse cx="32" cy="215" rx="10" ry="8" style={s} />
      <rect x="161" y="174" width="14" height="36" rx="7" style={s} />
      <ellipse cx="168" cy="215" rx="10" ry="8" style={s} />
      {/* shorts */}
      <path
        d="M52,246 L52,305 Q52,312 60,312 L86,312 Q90,312 90,305 L90,274
           L110,274 L110,305 Q110,312 114,312 L140,312 Q148,312 148,305 L148,246Z"
        fill="#4B5563"
      />
      {/* legs */}
      <rect x="58" y="308" width="16" height="52" rx="8" style={s} />
      <rect x="126" y="308" width="16" height="52" rx="8" style={s} />
      {/* sneakers */}
      <rect x="52" y="356" width="28" height="15" rx="7" fill="#EF4444" />
      <rect x="120" y="356" width="28" height="15" rx="7" fill="#EF4444" />
      <line x1="55" y1="363" x2="77" y2="363" stroke="#fff" strokeWidth="1.5" />
      <line x1="123" y1="363" x2="145" y2="363" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════
//  SECTION HEADER
// ═══════════════════════════════════════════════════

function SectionHead({ title, to }) {
  return (
    <div className="flex items-center justify-between mb-12">
      <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
        {title}
      </h2>
      <Link
        to={to}
        className="text-primary text-xs sm:text-sm font-bold flex items-center gap-1
          tracking-wider uppercase group hover:gap-2 transition-all"
      >
        View All
        <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

// ═══════════════════════════════════════════════════
//  MAIN HOME COMPONENT
// ═══════════════════════════════════════════════════

export default function Home() {
  /* — state — */
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [skinIdx, setSkinIdx] = useState(2);
  const [clothIdx, setClothIdx] = useState(0);
  const [person, setPerson] = useState("man");

  /* — API — */
  const { data: fd, isLoading: fl } = useGetProductsQuery({ featured: true, limit: 8 });
  const { data: ld, isLoading: ll } = useGetProductsQuery({ limit: 8, sort: "-createdAt" });
  const { data: cd } = useGetCategoriesQuery();

  const featured = fd?.data?.products || [];
  const latest = ld?.data?.products || [];
  const categories = cd?.data?.categories || [];

  /* — effects — */
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setHeroSlide((p) => (p + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const bestColors = SKIN_TONES[skinIdx].best;

  /* ─────────────────────────── RENDER ─────────────────────────── */
  return (
    <div className="overflow-hidden bg-black">
      {/* ── global keyframes ── */}
      <style>{`
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-20px) rotate(2deg)}}
        @keyframes gradX{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes kenBurns{0%{transform:scale(1)}100%{transform:scale(1.12) translate(-1.5%,-1%)}}
        @keyframes spinSlow{to{transform:rotate(360deg)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}
        .marquee-track{animation:marquee 28s linear infinite}
        .float{animation:float 6s ease-in-out infinite}
        .grad-x{background-size:200% 200%;animation:gradX 8s ease infinite}
        .shimmer{background-size:200% auto;animation:shimmer 3s linear infinite}
        .kb{animation:kenBurns 22s ease-in-out infinite alternate}
        .text-outline{-webkit-text-stroke:2px currentColor;-webkit-text-fill-color:transparent}
        .slide-up{animation:slideUp .8s ease both}
      `}</style>

      {/* ═══════════════════════════════════════════
           HERO
         ═══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[750px] flex items-center overflow-hidden">
        {/* slideshow */}
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out
              ${heroSlide === i ? "opacity-100" : "opacity-0"}`}
          >
            <img src={src} alt="" className="w-full h-full object-cover kb" loading="eager" />
          </div>
        ))}

        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

        {/* decorative ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[700px] h-[700px] rounded-full border border-white/[.03] pointer-events-none"
          style={{ animation: "spinSlow 100s linear infinite" }}
        />

        {/* grid overlay */}
        <div
          className="absolute inset-0 opacity-[.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* ── hero content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl">
            {/* pill */}
           

            {/* brand / heading */}
            <h1 className="mb-6 select-none">
              {[
                { text: "JAIMAX", cls: "text-white" },
                { text: "CLOTHING", cls: "text-outline text-white/20" },
                {
                  text: "WEAR YOUR STORY",
                  cls: "bg-gradient-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent shimmer",
                },
              ].map((w, i) => (
                <div
                  key={i}
                  className={`transition-all duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)]
                    ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
                  style={{ transitionDelay: `${400 + i * 200}ms` }}
                >
                  <span
                    className={`block font-black leading-[.82] tracking-[-0.04em]
                      ${i === 2
                        ? "text-2xl sm:text-3xl md:text-4xl mt-4"
                        : "text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem]"
                      } ${w.cls}`}
                  >
                    {w.text}
                  </span>
                </div>
              ))}
            </h1>

            {/* subtitle */}
            <p
              className={`text-base md:text-lg text-gray-500 max-w-lg mb-10
                transition-all duration-1000 delay-[1100ms]
                ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Custom tees, curated collections &amp; colours that complement{" "}
              <span className="italic text-primary">your</span> skin. For{" "}
              <strong className="text-white">Men</strong>,{" "}
              <strong className="text-white">Women</strong> &amp;{" "}
              <strong className="text-white">Kids</strong>.
            </p>

            {/* CTA */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-1000 delay-[1300ms]
                ${heroReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Link to="/products">
                <button
                  className="group relative px-9 py-4 bg-primary text-black font-extrabold
                    text-sm tracking-wider rounded-full overflow-hidden transition-all
                    hover:scale-105 hover:shadow-[0_0_50px_rgba(0,255,136,.35)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    SHOP COLLECTION
                    <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
              <a href="#try-on">
                <button
                  className="px-9 py-4 border-2 border-white/15 text-white font-extrabold
                    text-sm tracking-wider rounded-full hover:border-primary/50
                    hover:text-primary transition-all hover:scale-105"
                >
                  TRY ON COLORS
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`h-1 rounded-full transition-all duration-500
                ${heroSlide === i ? "w-10 bg-primary" : "w-4 bg-white/25 hover:bg-white/40"}`}
            />
          ))}
        </div>

        {/* scroll cue */}
        
      </section>

      {/* ═══════════════════════════════════════════
           MARQUEE
         ═══════════════════════════════════════════ */}
      <div className="border-y border-white/5 py-4 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="marquee-track flex items-center">
            {[...Array(2)].flatMap((_, j) =>
              [
                "JAIMAX CLOTHING",
                "◆",
                "CUSTOM TEES",
                "◆",
                "MEN · WOMEN · KIDS",
                "◆",
                "SKIN-TONE MATCHED",
                "◆",
                "FREE SHIPPING ₹500+",
                "◆",
                "100% ORGANIC COTTON",
                "◆",
                "DESIGNED IN INDIA",
                "◆",
              ].map((t, i) => (
                <span
                  key={`${j}-${i}`}
                  className={`mx-5 ${
                    t === "◆"
                      ? "text-primary text-[10px]"
                      : "text-gray-600 text-[11px] font-bold tracking-[.3em] uppercase"
                  }`}
                >
                  {t}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
           BOLD QUOTE 1
         ═══════════════════════════════════════════ */}
      <section className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <blockquote className="text-center">
              <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
                &ldquo;YOUR OUTFIT IS YOUR{" "}
                <span className="bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent">
                  FIRST IMPRESSION
                </span>{" "}
                — MAKE IT COUNT.&rdquo;
              </p>
              <footer className="mt-8 text-gray-600 text-sm tracking-[.3em] uppercase">
                — Jaimax Clothing
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           CATEGORIES — MEN / WOMEN / KIDS
         ═══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-primary text-xs tracking-[.35em] uppercase font-semibold">
                Shop By
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white mt-3 tracking-tight">
                CATEGORY
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORY_DATA.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 150} direction="scale">
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="group block relative aspect-[3/4] rounded-2xl overflow-hidden"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform
                      duration-[1500ms] group-hover:scale-110"
                  />
                  {/* gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent
                      opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                  />
                  {/* content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <span className="text-primary text-xs tracking-[.3em] uppercase font-bold mb-2">
                      {cat.desc}
                    </span>
                    <h3
                      className="text-4xl md:text-5xl font-black text-white tracking-tight
                        group-hover:translate-x-2 transition-transform duration-500"
                    >
                      {cat.name}
                    </h3>
                    <div
                      className="flex items-center gap-2 mt-4 text-white/60 text-sm font-bold
                        group-hover:text-primary transition-colors"
                    >
                      Shop Now
                      <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                  {/* border glow */}
                  <div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent
                      group-hover:border-primary/30 transition-all duration-500"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           TRY ON — SKIN TONE + CLOTHING MATCHER
         ═══════════════════════════════════════════ */}
      <section
        id="try-on"
        className="py-28 bg-gradient-to-b from-black via-gray-950/80 to-black"
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* heading */}
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-primary text-xs tracking-[.35em] uppercase font-semibold">
                Interactive Try-On
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-4 tracking-tight leading-[.95]">
                FIND YOUR{" "}
                <span className="text-outline text-white/20">PERFECT</span>
                <br className="hidden md:block" /> COLOR MATCH
              </h2>
              <p className="text-gray-500 mt-5 max-w-xl mx-auto text-lg">
                Pick a person, choose your skin tone, and try different clothing colours.
                Watch the outfit change in real time.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* ─ LEFT: Controls ─ */}
            <Reveal direction="left" delay={200}>
              <div className="space-y-10">
                {/* person type toggle */}
                <div>
                  <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase mb-3 font-bold">
                    Person
                  </p>
                  <div className="flex gap-3">
                    {[
                      { id: "man", emoji: "👨", label: "Man" },
                      { id: "woman", emoji: "👩", label: "Woman" },
                      { id: "kid", emoji: "🧒", label: "Kid" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPerson(p.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm
                          font-bold transition-all duration-300 ${
                            person === p.id
                              ? "border-primary bg-primary/10 text-primary scale-105"
                              : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
                          }`}
                      >
                        <span className="text-lg">{p.emoji}</span>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* skin tone selector */}
                <div>
                  <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase mb-3 font-bold">
                    Skin Tone — {SKIN_TONES[skinIdx].name}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {SKIN_TONES.map((t, i) => (
                      <button
                        key={i}
                        onClick={() => setSkinIdx(i)}
                        className={`w-12 h-12 rounded-full transition-all duration-500 ${
                          skinIdx === i
                            ? "ring-[3px] ring-primary ring-offset-[4px] ring-offset-gray-950 scale-110"
                            : "opacity-50 hover:opacity-90 hover:scale-105"
                        }`}
                        style={{ backgroundColor: t.hex }}
                        title={t.name}
                      />
                    ))}
                  </div>
                </div>

                {/* clothing colour selector */}
                <div>
                  <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase mb-3 font-bold">
                    Clothing Colour — {CLOTH_COLORS[clothIdx].name}
                  </p>
                  <div className="grid grid-cols-6 gap-3">
                    {CLOTH_COLORS.map((cl, i) => (
                      <button
                        key={i}
                        onClick={() => setClothIdx(i)}
                        className={`group relative w-full aspect-square rounded-xl transition-all
                          duration-300 hover:scale-110 ${
                            clothIdx === i
                              ? "ring-[3px] ring-primary ring-offset-[3px] ring-offset-gray-950 scale-110"
                              : "opacity-50 hover:opacity-90"
                          }`}
                        style={{ backgroundColor: cl.hex }}
                        title={cl.name}
                      >
                        {/* recommended badge */}
                        {bestColors.includes(i) && (
                          <span
                            className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full
                              border-2 border-gray-950"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-600 mt-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                    Recommended for {SKIN_TONES[skinIdx].name} skin
                  </p>
                </div>

                {/* shop CTA */}
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-primary text-sm font-bold
                    group hover:gap-3 transition-all"
                >
                  Shop This Look
                  <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Reveal>

            {/* ─ RIGHT: Person Figure ─ */}
            <Reveal direction="right" delay={400}>
              <div className="relative flex items-center justify-center py-8">
                {/* ambient glow */}
                <div
                  className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl opacity-20
                    transition-colors duration-700 pointer-events-none"
                  style={{ backgroundColor: CLOTH_COLORS[clothIdx].hex }}
                />

                {/* person */}
                <div className="relative z-10 w-48 sm:w-56 md:w-64 transition-all duration-500">
                  <PersonFigure
                    type={person}
                    skinColor={SKIN_TONES[skinIdx].hex}
                    clothColor={CLOTH_COLORS[clothIdx].hex}
                  />
                </div>

                {/* floating colour chips */}
                {bestColors.slice(0, 3).map((ci, i) => (
                  <div
                    key={ci}
                    className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-lg shadow-xl float
                      cursor-pointer hover:scale-125 transition-all duration-300"
                    onClick={() => setClothIdx(ci)}
                    style={{
                      backgroundColor: CLOTH_COLORS[ci].hex,
                      top: `${12 + i * 25}%`,
                      [i % 2 === 0 ? "right" : "left"]: "2%",
                      animationDelay: `${i * 1.5}s`,
                      transition: "background-color 0.5s ease",
                    }}
                    title={`Try ${CLOTH_COLORS[ci].name}`}
                  />
                ))}

                {/* person type label */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-[10px] text-gray-600 tracking-[.25em] uppercase font-bold">
                    {person === "man" ? "👨 Man" : person === "woman" ? "👩 Woman" : "🧒 Kid"}
                    {" "}in{" "}
                    <span style={{ color: CLOTH_COLORS[clothIdx].hex }}>
                      {CLOTH_COLORS[clothIdx].name}
                    </span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           QUOTE 2 — STACKED
         ═══════════════════════════════════════════ */}
      <section className="py-24 border-y border-white/5">
        <Reveal>
          <p className="text-center text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1] px-4 select-none">
            <span className="text-white/[.06]">YOUR BODY.</span>{" "}
            <span className="text-white/20">YOUR CANVAS.</span>{" "}
            <span className="text-primary">YOUR RULES.</span>
          </p>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
           CUSTOM TEES
         ═══════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-primary text-xs tracking-[.35em] uppercase font-semibold">
                Express Yourself
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mt-4 tracking-tight">
                CUSTOM{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  TEES
                </span>
              </h2>
              <p className="text-gray-500 mt-4 max-w-lg mx-auto text-lg">
                Upload your art, pick a style, or let us design it — your tee, your way.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TEE_CARDS.map((tee, i) => (
              <Reveal key={i} delay={i * 100} direction="scale">
                <Link to="/products" className="group block">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-[1.03]">
                    <img
                      src={tee.img}
                      alt={tee.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform
                        duration-[1500ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <span className="text-primary text-[10px] tracking-[.25em] uppercase font-bold mb-1">
                        {tee.style}
                      </span>
                      <p className="text-white font-extrabold text-sm sm:text-base">
                        {tee.title}
                      </p>
                    </div>
                    {/* hover overlay */}
                    <div
                      className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100
                        transition-opacity duration-500 flex items-center justify-center"
                    >
                      <span
                        className="px-5 py-2 bg-primary text-black text-xs font-extrabold
                          rounded-full tracking-wider"
                      >
                        CUSTOMIZE
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           TRUST BAR
         ═══════════════════════════════════════════ */}
      <div className="border-y border-white/5 bg-white/[.015]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { I: HiOutlineTruck, t: "Free Shipping", s: "Orders ₹500+" },
              { I: HiOutlineShieldCheck, t: "Premium Quality", s: "100% organic cotton" },
              { I: HiOutlineCurrencyRupee, t: "Best Prices", s: "Factory direct" },
              { I: HiOutlineLightningBolt, t: "Fast Delivery", s: "2–5 business days" },
            ].map(({ I, t, s: sub }, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-center gap-4 group">
                  <div
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                      group-hover:bg-primary/20 transition-colors"
                  >
                    <I className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
           DB CATEGORIES (from API)
         ═══════════════════════════════════════════ */}
      {categories.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <Reveal>
              <SectionHead title="ALL CATEGORIES" to="/products" />
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <Reveal key={cat._id} delay={i * 60} direction="scale">
                  <Link
                    to={`/products?category=${cat._id}`}
                    className="group block bg-white/[.02] border border-white/[.06] rounded-2xl p-6
                      text-center hover:border-primary/30 hover:bg-primary/5
                      transition-all duration-500 hover:scale-105"
                  >
                    <div
                      className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br
                        from-primary/20 to-primary/5 flex items-center justify-center"
                    >
                      <span className="text-xl text-primary font-black">
                        {cat.name.charAt(0)}
                      </span>
                    </div>
                    <p
                      className="text-xs font-bold text-gray-400 group-hover:text-primary
                        tracking-wider uppercase transition-colors"
                    >
                      {cat.name}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
           FEATURED PRODUCTS
         ═══════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <SectionHead title="🔥 FEATURED DROPS" to="/products?featured=true" />
          </Reveal>
          <Reveal delay={150}>
            <ProductGrid products={featured} loading={fl} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           QUOTE 3 — FASHION QUOTE
         ═══════════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        </div>
        <Reveal>
          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                text-[10rem] md:text-[14rem] font-black text-white/[.025] select-none leading-none"
            >
              &ldquo;&rdquo;
            </span>
            <blockquote>
              <p className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
                FASHION FADES,
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  ONLY STYLE
                </span>
                <br />
                REMAINS THE SAME.
              </p>
              <footer className="mt-8 text-gray-600 text-sm tracking-[.3em] uppercase">
                — Coco Chanel
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
           NEW ARRIVALS
         ═══════════════════════════════════════════ */}
      <section className="py-28 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <SectionHead title="🆕 NEW ARRIVALS" to="/products?sort=-createdAt" />
          </Reveal>
          <Reveal delay={150}>
            <ProductGrid products={latest} loading={ll} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           MANIFESTO
         ═══════════════════════════════════════════ */}
      <section className="py-28">
        <Reveal>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-600 leading-relaxed">
              At <span className="text-primary font-black">Jaimax</span> we believe
              clothing is more than fabric.
              <br />
              It&apos;s <span className="text-white">confidence</span>.
              <br />
              It&apos;s <span className="text-white">identity</span>.
              <br />
              It&apos;s{" "}
              <span className="text-primary font-black text-[1.2em]">you</span>.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════
           LIFESTYLE GALLERY
         ═══════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                #JAIMAX<span className="text-primary">STYLE</span>
              </h2>
              <p className="text-gray-500 mt-3 text-sm">Join the community</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80&fit=crop",
              "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop",
              "https://images.unsplash.com/photo-1519748771451-a94c596fad67?w=400&q=80&fit=crop",
              "https://images.unsplash.com/photo-1596609548086-85bbf8ddb6b6?w=400&q=80&fit=crop",
              "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80&fit=crop",
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&fit=crop",
              "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=400&q=80&fit=crop",
            ].map((src, i) => (
              <Reveal key={i} delay={i * 60} direction="scale">
                <div className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                  <img
                    src={src}
                    alt="lifestyle"
                    className="w-full h-full object-cover transition-transform duration-[1500ms]
                      group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                      transition-opacity duration-500 flex items-center justify-center"
                  >
                    <span className="text-primary font-black text-sm tracking-wider">
                      #JAIMAXSTYLE
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           CTA
         ═══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="scale">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-500 to-teal-500 grad-x" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, black 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="relative px-8 py-16 md:p-24 text-center">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-black leading-tight tracking-tight mb-5">
                  GET 20% OFF
                  <br />
                  YOUR FIRST ORDER
                </h2>
                <p className="text-black/60 text-lg mb-8 font-medium">
                  Use code{" "}
                  <span className="bg-black/10 px-3 py-1 rounded-lg font-black">
                    JAIMAX20
                  </span>{" "}
                  at checkout
                </p>
                <Link to="/register">
                  <button
                    className="px-10 py-4 bg-black text-white font-extrabold rounded-full
                      hover:bg-gray-900 transition-all hover:scale-105 shadow-2xl tracking-wider text-sm"
                  >
                    SIGN UP NOW
                  </button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           FOOTER LINE
         ═══════════════════════════════════════════ */}
      <div className="py-14 border-t border-white/5">
        <Reveal>
          <p className="text-center text-gray-700 text-[11px] tracking-[.5em] uppercase font-bold select-none">
            Jaimax Clothing — Dress how you want to be addressed.
          </p>
        </Reveal>
      </div>
    </div>
  );
}