// pages/BlogDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetBlogQuery, useLikeBlogMutation } from "../features/blog/blogApiSlice";
import { selectCurrentUser } from "../features/auth/authSlice";
import {
  HiOutlineClock, HiOutlineEye, HiOutlineHeart, HiHeart,
  HiOutlineArrowLeft, HiOutlineShare,
} from "react-icons/hi";
import toast from "react-hot-toast";

export default function BlogDetail() {
  const { slug } = useParams();
  const user = useSelector(selectCurrentUser);
  const { data, isLoading, error } = useGetBlogQuery(slug);
  const [likeBlog, { isLoading: liking }] = useLikeBlogMutation();

  const blog = data?.data?.blog;
  const isLiked = blog?.likedBy?.includes(user?._id);

  const handleLike = async () => {
    if (!user) return toast.error("Please login to like");
    try {
      await likeBlog(blog._id).unwrap();
    } catch {
      toast.error("Failed to like");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: blog.title, url: window.location.href });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-white/5 rounded-xl w-3/4" />
          <div className="h-4 bg-white/5 rounded-xl w-1/2" />
          <div className="aspect-video bg-white/5 rounded-2xl mt-8" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold text-white mb-4">Blog not found</h2>
        <Link to="/blog" className="text-primary font-bold">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Back */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary
          text-sm font-bold mb-8 transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Meta */}
      <div className="mb-6">
        <span className="text-primary text-[10px] tracking-[.3em] uppercase font-bold">
          {blog.category?.replace(/-/g, " ")}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-white mt-3 leading-tight tracking-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-500">
          <span className="font-bold text-gray-300">
            By {blog.author?.name || "Jaimax Team"}
          </span>
          <span>•</span>
          <span>{new Date(blog.publishedAt).toLocaleDateString("en-IN", {
            year: "numeric", month: "long", day: "numeric",
          })}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <HiOutlineClock className="w-4 h-4" /> {blog.readTime} min read
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineEye className="w-4 h-4" /> {blog.views}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="aspect-video rounded-2xl overflow-hidden mb-10">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Excerpt */}
      {blog.excerpt && (
        <p className="text-xl text-gray-400 leading-relaxed mb-10 font-medium
          border-l-4 border-primary pl-6 italic">
          {blog.excerpt}
        </p>
      )}

      {/* Content */}
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-black prose-headings:tracking-tight
          prose-a:text-primary prose-strong:text-white
          prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="mt-12 pt-8 border-t border-white/[.06]">
          <p className="text-xs text-gray-600 uppercase tracking-wider font-bold mb-3">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="px-3 py-1.5 text-xs font-bold text-gray-400 bg-white/5
                  border border-white/[.06] rounded-full hover:border-primary/30
                  hover:text-primary transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-10 pt-8 border-t border-white/[.06] flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={liking}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm
            transition-all cursor-pointer ${
              isLiked
                ? "bg-red-500/10 border border-red-500/30 text-red-400"
                : "bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/20"
            }`}
        >
          {isLiked ? (
            <HiHeart className="w-5 h-5" />
          ) : (
            <HiOutlineHeart className="w-5 h-5" />
          )}
          {blog.likes} {blog.likes === 1 ? "Like" : "Likes"}
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5
            border border-white/10 text-gray-400 hover:text-primary
            hover:border-primary/20 font-bold text-sm transition-all cursor-pointer"
        >
          <HiOutlineShare className="w-5 h-5" />
          Share
        </button>
      </div>
    </article>
  );
}