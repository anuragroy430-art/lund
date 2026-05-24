import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full group">
      <div className="relative glass-container !p-3 !rounded-[2.5rem] border-white/5 hover:border-pink-500/30 transition-all duration-500 overflow-hidden bg-white/[0.01] hover:bg-white/[0.04]">
        <Link to={`/product/${product._id}`}>
          <div className="relative h-44 overflow-hidden rounded-[1.8rem] mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute top-3 right-3 z-10">
              <HeartIcon product={product} />
            </div>
          </div>

          <div className="px-2 pb-2">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-white text-sm font-black uppercase italic tracking-tighter truncate leading-tight flex-1 pr-2">
                {product.name}
              </h2>
              <span className="text-pink-500 text-sm font-black tracking-tighter">
                ${product.price}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                {product.brand}
              </span>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[8px] text-white/40 font-black uppercase tracking-widest">
                  In Stock
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
