import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { SearchProvider } from "./context/SearchContext";
import { CategoryProvider } from "./context/CategoryContext";
import { WishlistProvider } from "./context/WishlistContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SearchProvider>
          <CategoryProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CategoryProvider>
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
