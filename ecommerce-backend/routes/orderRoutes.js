const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

// Create order
router.post("/", async (req, res) => {
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

   const {
  items,
  total,
  payment,
  customer,
  upiId,
} = req.body;


    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain items",
      });
    }

  const order = await Order.create({
  userId: decoded.userId,
  items,
  customer,
  total,
  payment,
  upiId: payment === "UPI" ? upiId : null,
  date: new Date().toLocaleString(),
});
    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      message: "Failed to place order",
    });
  }
});

// Get logged-in user's orders
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

    const orders = await Order.find({
      userId: decoded.userId,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

module.exports = router;