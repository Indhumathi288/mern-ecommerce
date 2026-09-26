import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  // 🔐 LOGIN CHECK (ADDED)
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">
          My Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-gray-600">
            No items in wishlist.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
