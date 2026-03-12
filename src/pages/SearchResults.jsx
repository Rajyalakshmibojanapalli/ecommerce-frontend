// pages/SearchResults.jsx
import { useSearchParams, Link } from "react-router-dom";
import { useGlobalSearchQuery } from "../features/search/searchApiSlice";
import { HiOutlineSearch, HiOutlineArrowRight } from "react-icons/hi";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("search") || searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useGlobalSearchQuery(
    { q, page, limit: 20 },
    { skip: !q }
  );

  const products = data?.data?.products || [];
  const categories = data?.data?.categories || [];
  const blogs = data?.data?.blogs || [];
  const totalProducts = data?.data?.totalProducts || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-10">
        <p className="text-gray-500 text-sm">Search results for</p>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-1">
          &ldquo;<span className="text-primary">{q}</span>&rdquo;
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          {totalProducts} product{totalProducts !== 1 ? "s" : ""} found
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white/[.03] rounded-2xl aspect-[3/4] animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/products?category=${cat._id}`}
                    className="px-4 py-2 bg-white/5 border border-white/[.06] rounded-xl
                      text-sm text-white font-bold hover:border-primary/30 hover:text-primary
                      transition-all"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {products.length > 0 ? (
            <div>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Products
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                  <Link
                    key={p._id}
                    to={`/products/${p.slug || p._id}`}
                    className="group bg-white/[.02] border border-white/[.06] rounded-2xl
                      overflow-hidden hover:border-primary/20 transition-all"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-900">
                      <img
                        src={p.images?.[0] || "/placeholder.png"}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-700
                          group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-white line-clamp-2
                        group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-primary font-black mt-1">
                        ₹{p.price?.toLocaleString()}
                      </p>
                      {p.averageRating > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          ★ {p.averageRating?.toFixed(1)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            !isLoading && q && (
              <div className="text-center py-20">
                <HiOutlineSearch className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">No products found</h2>
                <p className="text-gray-500 mb-6">
                  Try different keywords or browse categories.
                </p>
                <Link to="/products">
                  <button className="px-6 py-3 bg-primary text-black font-bold rounded-xl cursor-pointer">
                    Browse All Products
                  </button>
                </Link>
              </div>
            )
          )}

          {/* Blog results */}
          {blogs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Related Blog Posts
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogs.map((blog) => (
                  <Link
                    key={blog._id}
                    to={`/blog/${blog.slug}`}
                    className="flex gap-4 p-4 bg-white/[.02] border border-white/[.06]
                      rounded-xl hover:border-primary/20 transition-all group"
                  >
                    {blog.coverImage && (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-primary
                        transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}