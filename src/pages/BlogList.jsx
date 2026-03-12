// pages/BlogList.jsx
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetBlogsQuery } from "../features/blog/blogApiSlice";
import { HiOutlineClock, HiOutlineEye, HiOutlineHeart, HiOutlineArrowRight } from "react-icons/hi";

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "fashion-tips", label: "Fashion Tips" },
  { value: "style-guide", label: "Style Guide" },
  { value: "trends", label: "Trends" },
  { value: "sustainability", label: "Sustainability" },
  { value: "behind-the-scenes", label: "Behind the Scenes" },
  { value: "how-to", label: "How To" },
  { value: "announcements", label: "Announcements" },
];

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const category = searchParams.get("category") || "";

  const { data, isLoading } = useGetBlogsQuery({
    page,
    limit: 12,
    category: category || undefined,
  });

  const blogs = data?.data?.blogs || [];
  const totalPages = data?.data?.pages || 1;

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set("category", cat);
    else params.delete("category");
    params.delete("page");
    setSearchParams(params);
  };

  const setPage = (p) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", p);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-primary text-xs tracking-[.35em] uppercase font-bold">
          Our Blog
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white mt-3 tracking-tight">
          STYLE <span className="text-primary">STORIES</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-lg mx-auto">
          Fashion tips, trends, and behind-the-scenes stories from Jaimax.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 text-xs font-bold rounded-full border transition-all
              cursor-pointer ${
                category === cat.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/[.03] rounded-2xl aspect-[4/5] animate-pulse" />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No blog posts found.</p>
        </div>
      ) : (
        <>
          {/* Featured (first post) */}
          {page === 1 && blogs[0] && (
            <Link
              to={`/blog/${blogs[0].slug}`}
              className="group block mb-12 bg-white/[.02] border border-white/[.06]
                rounded-2xl overflow-hidden hover:border-primary/20 transition-all"
            >
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={blogs[0].coverImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"}
                    alt={blogs[0].title}
                    className="w-full h-full object-cover transition-transform duration-700
                      group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="text-primary text-[10px] tracking-[.3em] uppercase font-bold mb-3">
                    {blogs[0].category?.replace(/-/g, " ")} • Featured
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight
                    group-hover:text-primary transition-colors">
                    {blogs[0].title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blogs[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-3.5 h-3.5" />
                      {blogs[0].readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineEye className="w-3.5 h-3.5" />
                      {blogs[0].views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <HiOutlineHeart className="w-3.5 h-3.5" />
                      {blogs[0].likes}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(page === 1 ? 1 : 0).map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="group bg-white/[.02] border border-white/[.06] rounded-2xl
                  overflow-hidden hover:border-primary/20 transition-all duration-500"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.coverImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700
                      group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <span className="text-primary text-[10px] tracking-[.2em] uppercase font-bold">
                    {blog.category?.replace(/-/g, " ")}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2 mb-2 line-clamp-2
                    group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-gray-600">
                    <span className="flex items-center gap-1">
                      <HiOutlineClock className="w-3 h-3" />
                      {blog.readTime} min
                    </span>
                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    p === page
                      ? "bg-primary text-black"
                      : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}