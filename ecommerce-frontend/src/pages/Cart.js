import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  // 🔐 LOGIN CHECK (ADDED)
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  return (
    <>
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            My Cart ({totalItems})
          </h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border-b py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="font-semibold">₹{item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="border px-2"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="border px-2"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm mt-2"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white p-4 rounded shadow h-fit">
          <h3 className="font-semibold mb-4">
            PRICE DETAILS
          </h3>

          <div className="flex justify-between mb-2">
            <span>Price ({totalItems} items)</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery Charges</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            disabled={cartItems.length === 0}
            className="w-full bg-orange-500 text-white py-3 mt-4 rounded disabled:opacity-50"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
