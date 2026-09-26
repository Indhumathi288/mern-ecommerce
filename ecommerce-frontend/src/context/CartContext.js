import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    const parsed = saved ? JSON.parse(saved) : [];

    return parsed.map((item) => ({
      ...item,
      qty: item.qty ? Number(item.qty) : 1,
    }));
  });

  // Save cart locally
  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Load cart from MongoDB after login
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:5000/api/cart",
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
          qty: Number(item.qty),
        }));

        setCartItems(formattedItems);
      } catch (error) {
        console.error(
          "Failed to fetch cart:",
          error
        );
      }
    };

    fetchCart();
  }, []);

  // Save cart to MongoDB
  const saveCartToDatabase = async (items) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const formattedItems = items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: Number(item.qty),
      }));

      await axios.put(
        "http://localhost:5000/api/cart",
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
        "Failed to save cart:",
        error
      );
    }
  };

  // LOGIN CHECK
  const checkLogin = () => {
    const isLoggedIn =
      localStorage.getItem("loggedIn");

    if (!isLoggedIn) {
      alert("Please login to continue");
      return false;
    }

    return true;
  };

  const addToCart = (product) => {
    if (!checkLogin()) return;

    setCartItems((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id
      );

      const updatedItems = exists
        ? prev.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  qty: Number(item.qty) + 1,
                }
              : item
          )
        : [...prev, { ...product, qty: 1 }];

      saveCartToDatabase(updatedItems);

      return updatedItems;
    });
  };

  const increaseQty = (id) => {
    if (!checkLogin()) return;

    setCartItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Number(item.qty) + 1,
            }
          : item
      );

      saveCartToDatabase(updatedItems);

      return updatedItems;
    });
  };

  const decreaseQty = (id) => {
    if (!checkLogin()) return;

    setCartItems((prev) => {
      const updatedItems = prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: Number(item.qty) - 1,
              }
            : item
        )
        .filter((item) => item.qty > 0);

      saveCartToDatabase(updatedItems);

      return updatedItems;
    });
  };

  const removeFromCart = (id) => {
    if (!checkLogin()) return;

    setCartItems((prev) => {
      const updatedItems = prev.filter(
        (item) => item.id !== id
      );

      saveCartToDatabase(updatedItems);

      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);

    const token = localStorage.getItem("token");

    if (token) {
      axios.delete(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).catch((error) => {
        console.error(
          "Failed to clear cart:",
          error
        );
      });
    }
  };

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.qty || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);