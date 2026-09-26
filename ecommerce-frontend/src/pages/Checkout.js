import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [step, setStep] = useState(1);

  // 🔹 Delivery details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // 🔹 Payment
  const [payment, setPayment] = useState("");
  const [upiId, setUpiId] = useState("");

  // 🔹 Autofill from profile
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, []);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

 const placeOrder = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login before placing an order");
    navigate("/login");
    return;
  }

  if (!name || !phone || !address) {
    alert("Please fill all delivery details");
    return;
  }

  try {
    console.log("Sending order:", {
      items: cartItems,
      customer: {
        name,
        phone,
        address,
      },
      total: totalAmount,
      payment,
      upiId: payment === "UPI" ? upiId : null,
    });

    await axios.post(
      "http://localhost:5000/api/orders",
      {
        items: cartItems,
        customer: {
          name: name,
          phone: phone,
          address: address,
        },
        total: totalAmount,
        payment: payment,
        upiId: payment === "UPI" ? upiId : null,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    clearCart();
    navigate("/success");
  } catch (error) {
    console.error("Order error:", error);
    console.error("Backend response:", error.response?.data);

    alert(
      error.response?.data?.message ||
        "Failed to place order"
    );
  }
};

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <CheckoutSteps step={step} />

        {/* STEP 1: DELIVERY DETAILS */}
        {step === 1 && (
          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-lg font-semibold mb-4">
              Delivery Details
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded mb-3"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-3 rounded mb-3"
            />

            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-3 rounded mb-4"
              placeholder="Enter your full address"
              rows="4"
            />

            <button
              disabled={!name || phone.length !== 10 || !address}
              onClick={() => setStep(2)}
              className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: ORDER SUMMARY */}
        {step === 2 && (
          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-lg font-semibold mb-4">
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-contain border rounded"
                  />
                  <span>
                    {item.name} × {item.qty}
                  </span>
                </div>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 border rounded"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT */}
        {step === 3 && (
          <div className="bg-white p-6 shadow rounded">
            <h2 className="text-lg font-semibold mb-4">
              Payment Method
            </h2>

            <label className="block mb-2">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={payment === "COD"}
                onChange={(e) => setPayment(e.target.value)}
              />{" "}
              Cash on Delivery
            </label>

            <label className="block mb-3">
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={payment === "UPI"}
                onChange={(e) => setPayment(e.target.value)}
              />{" "}
              UPI / Card
            </label>

            {/* 🔹 UPI FIELD (ONLY IF UPI SELECTED) */}
            {payment === "UPI" && (
              <input
                type="text"
                placeholder="Enter UPI ID (example@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full border p-3 rounded mb-4"
              />
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 border rounded"
              >
                Back
              </button>
              <button
                disabled={
                  !payment ||
                  (payment === "UPI" && !upiId)
                }
                onClick={placeOrder}
                className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
