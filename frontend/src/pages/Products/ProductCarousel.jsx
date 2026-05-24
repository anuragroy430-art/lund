import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-full">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="outline-none">
                <div className="relative h-[28rem] md:h-[35rem] w-full overflow-hidden rounded-[2rem]">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col justify-end h-full">
                    <div className="space-y-2 mb-6">
                      <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
                        {name}
                      </h2>
                      <p className="text-pink-500 text-3xl font-black">
                        ${price}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 glass-container !bg-black/30 !backdrop-blur-xl !p-4 !rounded-2xl border-white/5 w-fit">
                      <div className="space-y-1 pr-4 border-r border-white/10">
                        <h1 className="flex items-center text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">
                          <FaStore className="mr-2 text-pink-500" /> {brand}
                        </h1>
                        <h1 className="flex items-center text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">
                          <FaStar className="mr-2 text-pink-500" /> {numReviews}{" "}
                          Reviews
                        </h1>
                      </div>

                      <div className="space-y-1">
                        <h1 className="flex items-center text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">
                          <FaBox className="mr-2 text-pink-500" />{" "}
                          {countInStock} In Stock
                        </h1>
                        <h1 className="flex items-center text-[9px] font-black text-white/50 uppercase tracking-[0.2em]">
                          <FaShoppingCart className="mr-2 text-pink-500" /> Qty:{" "}
                          {quantity}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
