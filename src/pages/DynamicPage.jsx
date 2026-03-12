// pages/DynamicPage.jsx
import { useParams, useLocation, Link } from "react-router-dom";
import { useGetPageQuery } from "../features/pages/pageApiSlice";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function DynamicPage() {
  const { slug: paramSlug } = useParams();
  const location = useLocation();

  // If slug comes from params (e.g. /page/:slug), use it
  // Otherwise extract from pathname (e.g. /about → "about")
  const slug = paramSlug || location.pathname.replace(/^\//, "").replace(/\/$/, "");

  const { data, isLoading, error } = useGetPageQuery(slug);
  const page = data?.data?.page;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-white/[.04] rounded-xl w-1/2" />
          <div className="h-4 bg-white/[.04] rounded-xl w-full" />
          <div className="h-4 bg-white/[.04] rounded-xl w-3/4" />
          <div className="h-4 bg-white/[.04] rounded-xl w-5/6" />
          <div className="h-4 bg-white/[.04] rounded-xl w-2/3" />
          <div className="h-64 bg-white/[.04] rounded-2xl mt-8" />
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="text-center py-24">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/[.03] border
          border-white/[.06] flex items-center justify-center">
          <span className="text-3xl">📄</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or hasn&apos;t been published yet.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-bold
            hover:gap-3 transition-all"
        >
          <HiOutlineArrowLeft className="w-4 h-4" /> Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary
          text-sm font-bold mb-8 transition-colors"
      >
        <HiOutlineArrowLeft className="w-4 h-4" /> Home
      </Link>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-10">
        {page.title}
      </h1>

      {/* Sections */}
      {page.sections?.length > 0 && (
        <div className="space-y-6 mb-12">
          {page.sections
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section, i) => (
              <div
                key={i}
                className="bg-white/[.02] border border-white/[.06] rounded-2xl p-6 md:p-8
                  hover:border-white/[.08] transition-all"
              >
                {section.icon && (
                  <span className="text-3xl mb-3 block">{section.icon}</span>
                )}
                {section.heading && (
                  <h3 className="text-xl font-bold text-white mb-3">
                    {section.heading}
                  </h3>
                )}
                <div
                  className="text-gray-400 leading-relaxed prose prose-invert prose-sm max-w-none
                    prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: section.body }}
                />
              </div>
            ))}
        </div>
      )}

      {/* Main Content */}
      <div
        className="prose prose-invert prose-lg max-w-none
          prose-headings:font-black prose-headings:tracking-tight
          prose-a:text-primary prose-strong:text-white
          prose-img:rounded-2xl prose-img:border prose-img:border-white/10
          prose-blockquote:border-primary prose-blockquote:text-gray-400
          prose-code:text-primary prose-code:bg-white/5 prose-code:px-1.5
          prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
          prose-li:text-gray-400"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />

      {/* Last updated */}
      <div className="mt-14 pt-6 border-t border-white/[.06] flex items-center
        justify-between">
        <p className="text-xs text-gray-700">
          Last updated: {new Date(page.updatedAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <Link
          to="/"
          className="text-xs text-gray-600 hover:text-primary transition-colors"
        >
          Back to Home →
        </Link>
      </div>
    </div>
  );
}