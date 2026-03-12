import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-black font-bold">S</span>
              </div>
              <span className="text-xl font-bold">Shop<span className="text-primary">Ease</span></span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your one-stop shop for everything. Quality products at unbeatable prices.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Products", "Categories", "Deals"].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-gray-500 hover:text-primary text-sm transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              {[
                { label: "My Profile", to: "/profile" },
                { label: "My Orders", to: "/my-orders" },
                { label: "Wishlist", to: "/wishlist" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-500 hover:text-primary text-sm transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <div className="flex">
              <div className="relative flex-1">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" placeholder="Your email"
                  className="w-full bg-dark-light border border-dark-border rounded-l-lg 
                    pl-10 pr-3 py-2.5 text-sm text-white placeholder-gray-500
                    focus:outline-none focus:border-primary" />
              </div>
              <button className="px-4 bg-primary text-black font-semibold rounded-r-lg 
                hover:bg-primary-dark transition text-sm cursor-pointer">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border mt-10 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}