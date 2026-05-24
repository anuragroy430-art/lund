import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { FaStar } from "react-icons/fa";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);
  const [hoverRating, setHoverRating] = useState(0);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg rounded-xl transition-all ${
            activeTab === 1
              ? "glass-container !bg-pink-600/20 font-bold"
              : "hover:bg-white/5"
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg rounded-xl transition-all ${
            activeTab === 2
              ? "glass-container !bg-pink-600/20 font-bold"
              : "hover:bg-white/5"
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg rounded-xl transition-all ${
            activeTab === 3
              ? "glass-container !bg-pink-600/20 font-bold"
              : "hover:bg-white/5"
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      {/* Second Part */}
      <section className="flex-1">
        {activeTab === 1 && (
          <div className="mt-4 glass-container p-8 !bg-white/5 border-white/10 animate-in fade-in zoom-in duration-300">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <label className="block text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
                    How would you rate it?
                  </label>

                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="transition-all duration-200 hover:scale-125 focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <FaStar
                          size={35}
                          className={`${
                            star <= (hoverRating || rating)
                              ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                              : "text-white/20"
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-4 text-gray-400 font-bold self-center animate-in fade-in slide-in-from-left-2 transition-all">
                        {rating === 1 && "Inferior"}
                        {rating === 2 && "Decent"}
                        {rating === 3 && "Great"}
                        {rating === 4 && "Excellent"}
                        {rating === 5 && "Exceptional"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="my-2">
                  <label
                    htmlFor="comment"
                    className="block text-xl font-semibold text-white/80 mb-2"
                  >
                    Share your experience
                  </label>

                  <textarea
                    id="comment"
                    rows="4"
                    required
                    placeholder="Tell us what you liked or disliked..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="glass-input w-full lg:w-[40rem] !bg-black/20 focus:!bg-black/40 min-h-[120px] transition-all"
                  ></textarea>
                </div>

                <div className="flex justify-end lg:w-[40rem]">
                  <button
                    type="submit"
                    disabled={loadingProductReview || !rating}
                    className="glass-button !py-3 !px-10 group"
                  >
                    <span className="flex items-center">
                      {loadingProductReview ? "Submitting..." : "Post Review"}
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-gray-400 bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                Please{" "}
                <Link
                  to="/login"
                  className="text-pink-500 font-bold hover:underline"
                >
                  sign in
                </Link>{" "}
                to share your review
              </p>
            )}
          </div>
        )}
      </section>

      <section>
        {activeTab === 2 && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <div>
              {product.reviews.length === 0 && (
                <p className="text-gray-400 italic">
                  No Reviews yet. Be the first to share your thoughts!
                </p>
              )}
            </div>

            <div className="space-y-6">
              {[...product.reviews].reverse().map((review) => (
                <div
                  key={review._id}
                  className="glass-card !bg-white/5 p-6 rounded-2xl xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-full mb-5 shadow-xl border border-white/10"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <strong className="text-white text-lg font-semibold">
                        {review.name}
                      </strong>
                    </div>
                    <p className="text-gray-400 text-sm font-medium bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {review.createdAt
                        ? review.createdAt.substring(0, 10)
                        : "Just now"}
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <p className="text-gray-200 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Ratings value={review.rating} color="text-yellow-400" />
                    <span className="text-xs text-white/30 uppercase tracking-widest font-black">
                      Verified Purchase
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section>
        {activeTab === 3 && (
          <section className="ml-[4rem] flex flex-wrap animate-in fade-in slide-in-from-right-4 duration-500">
            {!data ? (
              <Loader />
            ) : (
              data.map((p) => (
                <div key={p._id} className="m-2">
                  <SmallProduct product={p} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
