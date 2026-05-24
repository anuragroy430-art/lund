import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="glass-card !bg-opacity-5 w-[22rem] group transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 mb-8 overflow-hidden rounded-3xl relative">
      <div className="relative h-[22rem] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f10] via-transparent to-transparent opacity-60" />

        <div className="absolute top-4 right-4 z-10">
          <HeartIcon product={product} />
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="glass-container !bg-white/10 !backdrop-blur-xl p-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <p className="text-white text-xs font-medium line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Link to={`/product/${product._id}`}>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
              <h2 className="text-xl font-black text-white tracking-tighter group-hover:text-pink-500 transition-colors truncate uppercase italic">
                {product.name}
              </h2>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-black text-white tracking-tighter">
                  ${product.price}
                </span>
                <span className="glass-container !bg-pink-600/20 !px-3 !py-1 !rounded-full text-[10px] font-black uppercase text-pink-400 tracking-[0.2em] border border-pink-500/30">
                  {product.brand}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                Authentic Series
              </span>
              <button className="text-xs uppercase tracking-widest font-black text-white/40 group-hover:text-pink-500 transition-colors flex items-center">
                Explore{" "}
                <span className="ml-1 transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
