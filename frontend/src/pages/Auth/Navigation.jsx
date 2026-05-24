import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart, FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${
        showSidebar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-2 text-white bg-[#0f0f10]/80 backdrop-blur-2xl border-r border-white/5 fixed h-[100vh] shadow-2xl transition-all duration-300 group`}
      id="navigation-container"
    >
      <div className="flex flex-col space-y-2 pt-8">
        <Link
          to="/"
          className={`glass-nav-item ${isActive("/") ? "active" : ""}`}
        >
          <AiOutlineHome size={22} className="min-w-[26px]" />
          <span className="nav-item-name ml-4">Dashboard</span>
        </Link>

        <Link
          to="/shop"
          className={`glass-nav-item ${isActive("/shop") ? "active" : ""}`}
        >
          <AiOutlineShopping size={22} className="min-w-[26px]" />
          <span className="nav-item-name ml-4">Browse Store</span>
        </Link>

        <Link
          to="/cart"
          className={`glass-nav-item relative ${isActive("/cart") ? "active" : ""}`}
        >
          <div className="flex items-center">
            <AiOutlineShoppingCart size={22} className="min-w-[26px]" />
            <span className="nav-item-name ml-4">Cart View</span>
          </div>

          {cartItems.length > 0 && (
            <div className="absolute top-2 left-6">
              <span className="px-1.5 py-0.5 text-[10px] font-black text-white bg-pink-600 rounded-full shadow-lg ring-2 ring-[#0f0f10]">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            </div>
          )}
        </Link>

        <Link
          to="/favorite"
          className={`glass-nav-item relative ${isActive("/favorite") ? "active" : ""}`}
        >
          <div className="flex items-center">
            <FaHeart size={20} className="min-w-[26px]" />
            <span className="nav-item-name ml-4">Wishlist</span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="pb-8 px-4">
        <div className="relative">
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="flex items-center w-full p-3 glass-container !bg-white/5 hover:!bg-white/10 !rounded-2xl transition-all border-white/5 overflow-hidden"
            >
              <div className="min-w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-xs font-black shadow-lg">
                {userInfo.username.charAt(0).toUpperCase()}
              </div>
              <div className="nav-item-name ml-3 flex-1 flex justify-between items-center overflow-hidden">
                <span className="truncate text-xs font-bold text-white/80">
                  {userInfo.username}
                </span>
                <FaChevronRight
                  className={`text-[10px] text-white/40 transition-transform ${dropdownOpen ? "rotate-90" : ""}`}
                />
              </div>
            </button>
          ) : (
            <div className="space-y-4">
              <Link
                to="/login"
                className="glass-nav-item !p-3 !bg-pink-600/10 hover:!bg-pink-600/20 !text-pink-500"
              >
                <AiOutlineLogin size={22} className="min-w-[26px]" />
                <span className="nav-item-name ml-4 font-black">Login</span>
              </Link>
              <Link to="/register" className="glass-nav-item !p-3">
                <AiOutlineUserAdd size={22} className="min-w-[26px]" />
                <span className="nav-item-name ml-4">Sign Up</span>
              </Link>
            </div>
          )}

          {dropdownOpen && userInfo && (
            <ul className="absolute bottom-full left-0 mb-4 w-56 glass-container !bg-black/90 !backdrop-blur-3xl !p-2 !rounded-2xl border-white/10 shadow-3xl animate-in slide-in-from-bottom-2 duration-300">
              {userInfo.isAdmin && (
                <>
                  <li className="mb-1">
                    <Link to="/admin/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/admin/productlist" className="dropdown-item">
                      Inventory
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/admin/categorylist" className="dropdown-item">
                      Categories
                    </Link>
                  </li>
                  <li className="mb-1 border-b border-white/5 pb-1">
                    <Link to="/admin/orderlist" className="dropdown-item">
                      All Orders
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link to="/admin/userlist" className="dropdown-item">
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li className="mt-1">
                <Link to="/profile" className="dropdown-item">
                  My Account
                </Link>
              </li>
              <li className="mb-1">
                <Link to="/user-orders" className="dropdown-item">
                  My Orders
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="dropdown-item !text-red-400 hover:!bg-red-500/10"
                >
                  Secure Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
