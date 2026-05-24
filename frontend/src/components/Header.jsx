import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 items-stretch h-full">
        <div className="lg:w-[60%] w-full flex flex-col">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-px w-8 bg-pink-500 opacity-50" />
            <h2 className="text-white text-sm font-black uppercase tracking-[0.3em] italic whitespace-nowrap">
              Trending Now
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-pink-500/50 to-transparent" />
          </div>

          <div className="grid grid-cols-2 gap-4 flex-1">
            {data.slice(0, 4).map((product) => (
              <div key={product._id} className="w-full group">
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-[40%] w-full flex items-stretch pt-12 lg:pt-0">
          <div className="w-full glass-container !p-2 !rounded-[2.5rem] border-white/10 shadow-3xl relative group overflow-hidden">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-indigo-600 rounded-[2.6rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative h-full rounded-[2.3rem] overflow-hidden">
              <ProductCarousel />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
