import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

import LoginModal from "./components/LoginModal";

function App() {
  // 🔐 Login Modal State
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔐 LOGIN MODAL */}
      {showLoginModal && (
        <LoginModal closeModal={closeLoginModal} />
      )}

      <Routes>
        <Route
          path="/"
          element={<Home openLoginModal={openLoginModal} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetails openLoginModal={openLoginModal} />}
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
