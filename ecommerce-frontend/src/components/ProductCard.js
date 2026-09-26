import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product, openLoginModal }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const isLoggedIn = localStorage.getItem("loggedIn");

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  const handleWishlist = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    toggleWishlist(product);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    addToCart(product);
  };

  return (
    <div className="bg-white border rounded hover:shadow-lg transition relative">

      {/* Wishlist Icon */}
      <div
        onClick={handleWishlist}
        className="absolute top-2 right-2 cursor-pointer z-10"
      >
        {isWishlisted(product.id) ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FiHeart className="text-gray-400 hover:text-red-500" />
        )}
      </div>

      <div
        className="h-48 flex items-center justify-center cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-40 object-contain"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium mb-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold">₹{product.price}</span>
          <span className="text-sm line-through text-gray-500">
            ₹{product.originalPrice}
          </span>
          <span className="text-green-600 text-sm">
            {discount}% off
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
