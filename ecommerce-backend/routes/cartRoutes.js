const express = require("express");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart");

const router = express.Router();

// Get logged-in user's cart
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const cart = await Cart.findOne({
      userId: decoded.userId,
    });

    res.json(cart || { items: [] });
  } catch (error) {
    console.error("Get cart error:", error);

    res.status(500).json({
      message: "Failed to fetch cart",
    });
  }
});

// Save/update logged-in user's cart
router.put("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const { items } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId: decoded.userId },
      {
        userId: decoded.userId,
        items,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json(cart);
  } catch (error) {
    console.error("Update cart error:", error);

    res.status(500).json({
      message: "Failed to update cart",
    });
  }
});

// Clear logged-in user's cart
router.delete("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    await Cart.findOneAndUpdate(
      { userId: decoded.userId },
      { items: [] }
    );

    res.json({
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Clear cart error:", error);

    res.status(500).json({
      message: "Failed to clear cart",
    });
  }
});

module.exports = router;