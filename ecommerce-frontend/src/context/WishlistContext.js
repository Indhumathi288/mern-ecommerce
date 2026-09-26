import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save wishlist locally
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Load wishlist from MongoDB after login
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/wishlist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const items = response.data.items || [];

        const formattedItems = items.map((item) => ({
          ...item,
          id: item.productId,
        }));

        setWishlist(formattedItems);
      } catch (error) {
        console.error(
          "Failed to fetch wishlist:",
          error
        );
      }
    };

    fetchWishlist();
  }, []);

  // Save wishlist to MongoDB
  const saveWishlistToDatabase = async (items) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const formattedItems = items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        category: item.category,
        image: item.image,
      }));

      await axios.put(
        "http://localhost:5000/api/wishlist",
        {
          items: formattedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(
        "Failed to save wishlist:",
        error
      );
    }
  };

  // LOGIN CHECK
  const checkLogin = () => {
    const isLoggedIn =
      localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
      alert("Please login to use wishlist");
      return false;
    }

    return true;
  };

  const toggleWishlist = (product) => {
    if (!checkLogin()) return;

    setWishlist((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      const updatedWishlist = exists
        ? prev.filter(
            (item) => item.id !== product.id
          )
        : [...prev, product];

      saveWishlistToDatabase(updatedWishlist);

      return updatedWishlist;
    });
  };

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);