import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="min-h-screen pb-20">
      {!keyword ? (
        <section className="relative overflow-hidden mb-12">
          {/* Animated Background Gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse delay-700" />

          <div className="max-w-[1400px] mx-auto pt-10 px-6 sm:px-10 lg:px-16">
            <Header />

            {/* Ad Banner / Highlight Section */}
            <div className="mt-16 glass-container !bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-indigo-600/10 border-white/10 p-1 rounded-[2.5rem] overflow-hidden group">
              <div className="bg-black/40 backdrop-blur-2xl px-10 py-12 rounded-[2.4rem] flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-1 space-y-6">
                  <span className="px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-400 text-xs font-black uppercase tracking-[0.2em] border border-pink-500/30">
                    Summer Sale 2024
                  </span>
                  <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                    UP TO <span className="text-pink-500">50% OFF</span> <br />
                    PREMIUM TECH.
                  </h2>
                  <p className="text-gray-400 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
                    Don't miss out on our biggest sale of the season. Grab the
                    latest gadgets and fashion at unbeatable prices.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link
                      to="/shop"
                      className="glass-button !py-4 !px-10 !rounded-full shadow-lg shadow-pink-500/20"
                    >
                      Shop Now
                    </Link>
                    <button className="px-8 py-4 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="flex-1 relative w-full h-[300px] md:h-[400px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-indigo-500/20 blur-3xl rounded-full animate-pulse" />
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                    alt="Headphones"
                    className="relative z-10 h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="pt-20 px-4">
          <Message variant="danger">
            {isError?.data?.message || isError?.error || "An error occurred"}
          </Message>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto pt-8 px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/5 pb-10">
            <div className="text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                Our{" "}
                <span className="text-pink-500 underline decoration-indigo-500 underline-offset-8">
                  Products
                </span>
              </h3>
              <p className="text-gray-500 mt-2 font-bold tracking-widest uppercase text-xs">
                Quality guaranteed • Fast shipping • Free returns
              </p>
            </div>

            <div className="flex gap-4 mt-8 md:mt-0">
              <button className="p-3 glass-container !bg-white/5 hover:!bg-white/10 transition-colors rounded-xl border-white/10">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 pb-24">
            {data &&
              data.products &&
              data.products.map((product) => (
                <div
                  key={product._id}
                  className="w-full flex justify-center animate-in fade-in slide-in-from-bottom border-b border-white/0 hover:border-white/5 pb-4 transition-all duration-500"
                >
                  <Product product={product} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
