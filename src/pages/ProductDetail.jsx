import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetProductBySlugQuery, useGetRelatedProductsQuery } from "../features/products/productsApiSlice";
import { useGetProductReviewsQuery, useCreateReviewMutation } from "../features/reviews/reviewsApiSlice";
import { useAddToCartMutation } from "../features/cart/cartApiSlice";
import { selectIsAuthenticated } from "../features/auth/authSlice";
import ProductGrid from "../components/product/ProductGrid";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import toast from "react-hot-toast";
import { HiStar, HiOutlineTruck, HiOutlineShieldCheck, HiMinus, HiPlus } from "react-icons/hi";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuthenticated);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: "", comment: "" });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data, isLoading, error } = useGetProductBySlugQuery(slug);
  const product = data?.data?.product;

  const { data: relatedData } = useGetRelatedProductsQuery(product?._id, { skip: !product?._id });
  const { data: reviewsData } = useGetProductReviewsQuery(
    { productId: product?._id }, { skip: !product?._id }
  );

  const [addToCart, { isLoading: adding }] = useAddToCartMutation();
  const [createReview, { isLoading: reviewing }] = useCreateReviewMutation();

  const related = relatedData?.data?.products || [];
  const reviews = reviewsData?.data?.reviews || [];

  const handleAddToCart = async () => {
    if (!isAuth) return navigate("/login");
    try {
      await addToCart({ productId: product._id, quantity }).unwrap();
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId: product._id, ...reviewForm }).unwrap();
      toast.success("Review added!");
      setShowReviewForm(false);
      setReviewForm({ rating: 5, title: "", comment: "" });
    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  if (isLoading) return <div className="py-20"><Loader size="lg" /></div>;
  if (error) { navigate("/products"); return null; }
  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div>
          <div className="aspect-square bg-dark-card border border-dark-border rounded-xl overflow-hidden mb-4">
            <img src={product.images?.[selectedImage]?.url || "https://via.placeholder.com/600"}
              alt={product.name} className="w-full h-full object-cover" />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition cursor-pointer
                    ${i === selectedImage ? "border-primary" : "border-dark-border"}`}>
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-primary text-sm font-medium mb-2">{product.category?.name}</p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{product.name}</h1>

          {product.ratingsCount > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} className={`w-5 h-5 ${i < Math.round(product.ratingsAverage) ? "text-yellow-400" : "text-gray-600"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-400">({product.ratingsCount} reviews)</span>
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-white">₹{product.price?.toLocaleString()}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-xl text-gray-500 line-through">₹{product.mrp?.toLocaleString()}</span>
                <span className="bg-primary/20 text-primary text-sm font-bold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            {product.stock > 0
              ? <p className="text-sm text-primary">✓ In Stock ({product.stock} available)</p>
              : <p className="text-sm text-red-400">✕ Out of Stock</p>}
          </div>

          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-dark-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-400 hover:text-white transition cursor-pointer">
                  <HiMinus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-white font-medium">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 text-gray-400 hover:text-white transition cursor-pointer">
                  <HiPlus className="w-4 h-4" />
                </button>
              </div>
              <Button onClick={handleAddToCart} loading={adding} size="lg" className="flex-1">
                Add to Cart
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 border-t border-dark-border pt-6">
            <div className="flex items-center gap-3">
              <HiOutlineTruck className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm font-medium text-white">Free Delivery</p>
                <p className="text-xs text-gray-500">Orders above ₹500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HiOutlineShieldCheck className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm font-medium text-white">Warranty</p>
                <p className="text-xs text-gray-500">1 Year</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Reviews ({reviews.length})</h2>
          {isAuth && (
            <Button variant="outline" size="sm" onClick={() => setShowReviewForm(!showReviewForm)}>
              Write Review
            </Button>
          )}
        </div>

        {showReviewForm && (
          <form onSubmit={handleReview}
            className="bg-dark-card border border-dark-border rounded-xl p-5 mb-6 space-y-4">
            <div>
              <label className="text-sm text-gray-300 block mb-1">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    className="cursor-pointer">
                    <HiStar className={`w-7 h-7 ${star <= reviewForm.rating ? "text-yellow-400" : "text-gray-600"}`} />
                  </button>
                ))}
              </div>
            </div>
            <Input label="Title" value={reviewForm.title} placeholder="Great product!"
              onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })} />
            <div>
              <label className="text-sm text-gray-300 block mb-1">Comment</label>
              <textarea value={reviewForm.comment} required rows={3} placeholder="Your review..."
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                className="w-full bg-dark-light border border-dark-border rounded-lg px-4 py-2.5 
                  text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none" />
            </div>
            <Button type="submit" loading={reviewing}>Submit Review</Button>
          </form>
        )}

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-dark-card border border-dark-border rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">{review.user?.name?.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{review.user?.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                {review.title && <p className="text-sm font-semibold text-white mb-1">{review.title}</p>}
                <p className="text-sm text-gray-400">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-500">No reviews yet.</p>}
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Related Products</h2>
          <ProductGrid products={related} loading={false} />
        </section>
      )}
    </div>
  );
}