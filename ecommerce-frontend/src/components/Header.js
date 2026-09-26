import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiHeart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useSearch } from "../context/SearchContext";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/images/logo.png";

const Header = () => {
  const navigate = useNavigate();

  const { cartCount } = useCart();
  const { wishlist } = useWishlist();
  const { searchQuery, setSearchQuery } = useSearch();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const isLoggedIn = localStorage.getItem("loggedIn");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="ShopEase Logo"
            className="h-20 w-20 object-contain"
          />
          <span className="text-xl font-bold text-blue-600">
            ShopEase
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 hidden md:block">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more"
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="flex items-center gap-1 font-medium"
          >
            <FiUser />
            {isLoggedIn ? "Account" : "Login"}
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 bg-white border rounded shadow w-48 z-50">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      navigate("/orders");
                      setShowMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </button>

                  <button
                    onClick={() => {
                      localStorage.removeItem("loggedIn");
                      setShowMenu(false);
                      navigate("/");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Wishlist */}
        <div
          className="relative cursor-pointer"
          onClick={() => {
            if (!isLoggedIn) {
              navigate("/login");
            } else {
              navigate("/wishlist");
            }
          }}
        >
          <FiHeart size={22} />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-1.5 rounded-full">
              {wishlist.length}
            </span>
          )}
        </div>

        {/* Cart */}
        <div
          className="relative cursor-pointer"
          onClick={() => {
            if (!isLoggedIn) {
              navigate("/login");
            } else {
              navigate("/cart");
            }
          }}
        >
          <FiShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
