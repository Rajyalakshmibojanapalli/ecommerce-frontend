// import { Link } from "react-router-dom";
// import { HiOutlineMail } from "react-icons/hi";

// export default function Footer() {
//   return (
//     <footer className="bg-black border-t border-dark-border mt-auto">
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           <div>
//             <Link to="/" className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
//                 <span className="text-black font-bold">S</span>
//               </div>
//               <span className="text-xl font-bold">Shop<span className="text-primary">Ease</span></span>
//             </Link>
//             <p className="text-gray-500 text-sm leading-relaxed">
//               Your one-stop shop for everything. Quality products at unbeatable prices.
//             </p>
//           </div>

//           <div>
//             <h4 className="text-white font-semibold mb-4">Quick Links</h4>
//             <ul className="space-y-2">
//               {["Products", "Categories", "Deals"].map((item) => (
//                 <li key={item}>
//                   <Link to="/products" className="text-gray-500 hover:text-primary text-sm transition">
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-white font-semibold mb-4">Account</h4>
//             <ul className="space-y-2">
//               {[
//                 { label: "My Profile", to: "/profile" },
//                 { label: "My Orders", to: "/my-orders" },
//                 { label: "Wishlist", to: "/wishlist" },
//               ].map((item) => (
//                 <li key={item.label}>
//                   <Link to={item.to} className="text-gray-500 hover:text-primary text-sm transition">
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
//             <div className="flex">
//               <div className="relative flex-1">
//                 <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
//                 <input type="email" placeholder="Your email"
//                   className="w-full bg-dark-light border border-dark-border rounded-l-lg 
//                     pl-10 pr-3 py-2.5 text-sm text-white placeholder-gray-500
//                     focus:outline-none focus:border-primary" />
//               </div>
//               <button className="px-4 bg-primary text-black font-semibold rounded-r-lg 
//                 hover:bg-primary-dark transition text-sm cursor-pointer">
//                 Join
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-dark-border mt-10 pt-6 text-center">
//           <p className="text-gray-600 text-sm">
//             © {new Date().getFullYear()} ShopEase. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }


import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineArrowRight,
  HiOutlineHeart,
  HiOutlineChevronUp,
} from "react-icons/hi";

/* ───────── reveal on scroll ───────── */
function Reveal({ children, className = "", delay = 0 }) {
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
      { threshold: 0.1 }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] ${
        v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ───────── data ───────── */
const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { label: "Men's Collection", to: "/products?category=men" },
      { label: "Women's Collection", to: "/products?category=women" },
      { label: "Kids' Collection", to: "/products?category=kids" },
      { label: "Custom Tees", to: "/products?category=custom" },
      { label: "New Arrivals", to: "/products?sort=-createdAt" },
      { label: "Featured", to: "/products?featured=true" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Profile", to: "/profile" },
      { label: "My Orders", to: "/my-orders" },
      { label: "Wishlist", to: "/wishlist" },
      { label: "Shopping Cart", to: "/cart" },
      { label: "Track Order", to: "/my-orders" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Blog", to: "/blog" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Size Guide", to: "/size-guide" },
      { label: "Shipping Info", to: "/shipping" },
      { label: "Returns & Exchange", to: "/returns" },
      { label: "FAQs", to: "/faq" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Pinterest",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z" />
      </svg>
    ),
  },
];

const PAYMENT_ICONS = ["Visa", "Mastercard", "UPI", "Paytm", "GPay", "COD"];

/* ═══════════════════════════════════════ */
export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── inline animations ── */}
      <style>{`
        @keyframes footerGlow{0%,100%{opacity:.3}50%{opacity:.6}}
        @keyframes confetti{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(-30px) rotate(180deg);opacity:0}}
        .footer-glow{animation:footerGlow 4s ease-in-out infinite}
      `}</style>

      <footer className="relative bg-black mt-auto overflow-hidden">
        {/* ── ambient glow ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full
              bg-primary/5 blur-[150px] footer-glow"
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full
              bg-emerald-500/5 blur-[150px] footer-glow"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* ═══════════════ NEWSLETTER SECTION ═══════════════ */}
        <div className="relative border-t border-white/[.06]">
          <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
            <Reveal>
              <div className="relative bg-gradient-to-br from-white/[.03] to-white/[.01] border border-white/[.06] rounded-3xl p-8 md:p-14 overflow-hidden">
                {/* decorative grid */}
                <div
                  className="absolute inset-0 opacity-[.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                  }}
                />

                <div className="relative grid md:grid-cols-2 gap-10 items-center">
                  {/* left text */}
                  <div>
                    <span className="text-primary text-[10px] tracking-[.4em] uppercase font-bold">
                      Newsletter
                    </span>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight leading-[1.1]">
                      JOIN THE
                      <br />
                      <span className="bg-gradient-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent">
                        JAIMAX CLUB
                      </span>
                    </h3>
                    <p className="text-gray-500 mt-4 text-sm md:text-base leading-relaxed max-w-md">
                      Get early access to drops, exclusive discounts, and style tips
                      delivered to your inbox. No spam, just drip.
                    </p>
                  </div>

                  {/* right form */}
                  <div>
                    {subscribed ? (
                      <div className="text-center py-8">
                        <div className="text-5xl mb-4 animate-bounce">🎉</div>
                        <p className="text-xl font-black text-primary">You&apos;re In!</p>
                        <p className="text-gray-500 text-sm mt-2">
                          Welcome to the Jaimax family.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubscribe} className="space-y-4">
                        <div className="relative">
                          <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            className="w-full bg-white/[.04] border border-white/[.08] rounded-xl
                              pl-12 pr-4 py-4 text-sm md:text-base text-white placeholder-gray-600
                              focus:outline-none focus:border-primary/50 transition-all duration-300"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full group flex items-center justify-center gap-2
                            py-4 bg-primary text-black font-extrabold text-sm tracking-wider
                            rounded-xl hover:shadow-[0_0_30px_rgba(0,255,136,.25)]
                            transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                        >
                          SUBSCRIBE
                          <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-[11px] text-gray-700 text-center">
                          By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ═══════════════ MAIN FOOTER ═══════════════ */}
        <div className="relative border-t border-white/[.06]">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
              {/* ─ Brand Column ─ */}
              <Reveal className="col-span-2">
                <div>
                  {/* Logo */}
                  <Link to="/" className="inline-flex items-center gap-2.5 group mb-6">
                    {/* <div
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-400
                        flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,136,.3)]
                        transition-all duration-500"
                    >
                      <span className="text-black font-black text-lg">J</span>
                    </div> */}
                    <div className="flex flex-col leading-none">
                      <span className="text-xl font-black text-white tracking-tight">
                        JAI<span className="text-primary">MAX</span>
                      </span>
                      <span className="text-[8px] text-gray-600 tracking-[.35em] uppercase font-bold mt-0.5">
                        Clothing
                      </span>
                    </div>
                  </Link>

                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
                    Redefining fashion with custom tees, skin-tone matched outfits,
                    and sustainable style for Men, Women &amp; Kids.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-8">
                    <a
                      href="mailto:hello@jaimax.in"
                      className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary
                        transition-colors group/c"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/[.04] flex items-center justify-center group-hover/c:bg-primary/10 transition-colors">
                        <HiOutlineMail className="w-4 h-4" />
                      </div>
                      hello@jaimax.in
                    </a>
                    <a
                      href="tel:+911234567890"
                      className="flex items-center gap-3 text-sm text-gray-500 hover:text-primary
                        transition-colors group/c"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/[.04] flex items-center justify-center group-hover/c:bg-primary/10 transition-colors">
                        <HiOutlinePhone className="w-4 h-4" />
                      </div>
                      +91 12345 67890
                    </a>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="w-8 h-8 rounded-lg bg-white/[.04] flex items-center justify-center">
                        <HiOutlineLocationMarker className="w-4 h-4" />
                      </div>
                      Mumbai, India
                    </div>
                  </div>

                  {/* Socials */}
                  <div>
                    <p className="text-[10px] text-gray-700 tracking-[.25em] uppercase font-bold mb-3">
                      Follow Us
                    </p>
                    <div className="flex items-center gap-2">
                      {SOCIALS.map((s) => (
                        <a
                          key={s.name}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.name}
                          className="w-10 h-10 rounded-xl bg-white/[.04] border border-white/[.06]
                            flex items-center justify-center text-gray-500
                            hover:text-primary hover:border-primary/30 hover:bg-primary/5
                            hover:scale-110 transition-all duration-300"
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* ─ Link Columns ─ */}
              {FOOTER_LINKS.map((col, i) => (
                <Reveal key={col.title} delay={(i + 1) * 100}>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
                      <span className="w-5 h-px bg-primary" />
                      {col.title}
                    </h4>
                    <ul className="space-y-2.5">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            to={link.to}
                            className="text-gray-500 hover:text-primary text-sm transition-all
                              duration-300 hover:translate-x-1 inline-block group/fl"
                          >
                            <span className="relative">
                              {link.label}
                              <span
                                className="absolute bottom-0 left-0 w-0 h-px bg-primary
                                  group-hover/fl:w-full transition-all duration-300"
                              />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════ BOTTOM BAR ═══════════════ */}
        <div className="relative border-t border-white/[.06]">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* left: copyright */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                <p className="text-gray-600 text-xs">
                  © {new Date().getFullYear()}{" "}
                  <span className="text-gray-500 font-semibold">Jaimax Clothing</span>. All
                  rights reserved.
                </p>
                <span className="hidden sm:block text-gray-800">|</span>
                <p className="text-gray-700 text-xs flex items-center gap-1">
                  Made with{" "}
                  <HiOutlineHeart className="w-3.5 h-3.5 text-red-500 animate-pulse" />{" "}
                  in India
                </p>
              </div>

              {/* center: payment methods */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-gray-700 tracking-[.2em] uppercase font-bold mr-2">
                  We Accept
                </span>
                {PAYMENT_ICONS.map((pm) => (
                  <div
                    key={pm}
                    className="px-2.5 py-1.5 bg-white/[.04] border border-white/[.06]
                      rounded-md text-[10px] text-gray-500 font-bold tracking-wider
                      hover:border-white/10 hover:text-gray-400 transition-all"
                  >
                    {pm}
                  </div>
                ))}
              </div>

              {/* right: legal links */}
              <div className="flex items-center gap-4">
                {["Privacy", "Terms", "Cookies"].map((t) => (
                  <Link
                    key={t}
                    to={`/${t.toLowerCase()}`}
                    className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════ BRAND WATERMARK ═══════════════ */}
        <div className="relative border-t border-white/[.03] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p
              className="text-center text-[3rem] sm:text-[5rem] md:text-[7rem] font-black
                tracking-tighter leading-none text-white/[.02] select-none uppercase"
            >
              JAIMAX CLOTHING
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════════════ BACK TO TOP ═══════════════ */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl bg-primary/90
          text-black flex items-center justify-center shadow-[0_4px_20px_rgba(0,255,136,.3)]
          hover:bg-primary hover:scale-110 hover:shadow-[0_4px_30px_rgba(0,255,136,.5)]
          transition-all duration-500 cursor-pointer ${
            showTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        <HiOutlineChevronUp className="w-5 h-5 stroke-[3]" />
      </button>
    </>
  );
}