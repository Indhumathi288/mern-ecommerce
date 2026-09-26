const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    legacyId: 1,
    name: "Smartphone X",
    price: 14999,
    originalPrice: 19999,
    category: "Mobiles",
    image: "product1.png",
  },
  {
    legacyId: 2,
    name: "Smartphone Pro Max",
    price: 25999,
    originalPrice: 30999,
    category: "Mobiles",
    image: "product6.png",
  },
  {
    legacyId: 3,
    name: "Budget Android Phone",
    price: 8999,
    originalPrice: 11999,
    category: "Mobiles",
    image: "product13.png",
  },
  {
    legacyId: 4,
    name: "Wireless Headphones",
    price: 2999,
    originalPrice: 4999,
    category: "Electronics",
    image: "product2.png",
  },
  {
    legacyId: 5,
    name: "Bluetooth Speaker",
    price: 2499,
    originalPrice: 4499,
    category: "Electronics",
    image: "product5.png",
  },
  {
    legacyId: 6,
    name: "Smart Watch",
    price: 1999,
    originalPrice: 3999,
    category: "Electronics",
    image: "product3.png",
  },
  {
    legacyId: 7,
    name: "Noise Cancelling Headphones",
    price: 4999,
    originalPrice: 7999,
    category: "Electronics",
    image: "product7.png",
  },
  {
    legacyId: 8,
    name: "Men's Casual Shirt",
    price: 999,
    originalPrice: 1999,
    category: "Fashion",
    image: "product8.png",
  },
  {
    legacyId: 9,
    name: "Women's Handbag",
    price: 1499,
    originalPrice: 2999,
    category: "Fashion",
    image: "product9.png",
  },
  {
    legacyId: 10,
    name: "Running Shoes",
    price: 2499,
    originalPrice: 3999,
    category: "Fashion",
    image: "product10.png",
  },
  {
    legacyId: 11,
    name: "Men's Wrist Watch",
    price: 1999,
    originalPrice: 3499,
    category: "Fashion",
    image: "product14.png",
  },
  {
    legacyId: 12,
    name: "LED Table Lamp",
    price: 799,
    originalPrice: 1499,
    category: "Home",
    image: "product4.png",
  },
  {
    legacyId: 13,
    name: "Decorative Wall Clock",
    price: 1299,
    originalPrice: 2499,
    category: "Home",
    image: "product11.png",
  },
  {
    legacyId: 14,
    name: "Cushion Pillow Set",
    price: 999,
    originalPrice: 1799,
    category: "Home",
    image: "product15.png",
  },
  {
    legacyId: 15,
    name: "Electric Kettle",
    price: 1599,
    originalPrice: 2999,
    category: "Appliances",
    image: "product12.png",
  },
  {
    legacyId: 16,
    name: "Mixer Grinder",
    price: 3499,
    originalPrice: 5999,
    category: "Appliances",
    image: "product16.png",
  },
  {
    legacyId: 17,
    name: "Basmati Rice (5kg)",
    price: 699,
    originalPrice: 999,
    category: "Grocery",
    image: "product17.png",
  },
  {
    legacyId: 18,
    name: "Cooking Oil (2L)",
    price: 349,
    originalPrice: 499,
    category: "Grocery",
    image: "product18.png",
  },
  {
    legacyId: 19,
    name: "Women's Printed Cotton Kurti",
    price: 899,
    originalPrice: 1799,
    category: "Fashion",
    image: "product19.png",
  },
  {
    legacyId: 20,
    name: "Aashirvaad Atta (5kg)",
    price: 329,
    originalPrice: 380,
    category: "Grocery",
    image: "product20.png",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("20 products inserted successfully");

    await mongoose.connection.close();
    console.log("Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();