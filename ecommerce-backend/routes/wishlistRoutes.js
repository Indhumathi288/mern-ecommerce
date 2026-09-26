const express = require("express");
const jwt = require("jsonwebtoken");
const Wishlist = require("../models/Wishlist");

const router = express.Router();

// Get logged-in user's wishlist
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

    const wishlist = await Wishlist.findOne({
      userId: decoded.userId,
    });

    res.json(wishlist || { items: [] });
  } catch (error) {
    console.error("Get wishlist error:", error);

    res.status(500).json({
      message: "Failed to fetch wishlist",
    });
  }
});

// Save/update logged-in user's wishlist
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

    const wishlist = await Wishlist.findOneAndUpdate(
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

    res.json(wishlist);
  } catch (error) {
    console.error(
      "Update wishlist error:",
      error
    );

    res.status(500).json({
      message: "Failed to update wishlist",
    });
  }
});

// Clear logged-in user's wishlist
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

    await Wishlist.findOneAndUpdate(
      { userId: decoded.userId },
      { items: [] }
    );

    res.json({
      message: "Wishlist cleared successfully",
    });
  } catch (error) {
    console.error(
      "Clear wishlist error:",
      error
    );

    res.status(500).json({
      message: "Failed to clear wishlist",
    });
  }
});

module.exports = router;