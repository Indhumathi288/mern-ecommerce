import { useState, useMemo, useEffect } from "react";
import Header from "../components/Header";
import CategoryBar from "../components/CategoryBar";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";

import categories from "../data/categories";
import { useSearch } from "../context/SearchContext";
import { useCategory } from "../context/CategoryContext";
import { getProducts } from "../api";
const Home = ({ openLoginModal }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);
  const { searchQuery } = useSearch();
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [sortOption, setSortOption] = useState("");

  // 🔹 FILTER + SORT LOGIC
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort
    if (sortOption === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products,searchQuery, selectedCategory, sortOption]);

  return (
    <>
      <Header />
      <CategoryBar />
      <Banner />

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* 🔹 TOP FILTER BAR */}
        <div className="bg-white p-4 rounded shadow-sm mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <span className="font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="font-medium">Sort By:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 🔹 PRODUCTS GRID */}
        {/* 🔹 PRODUCTS GRID */}
{loading ? (
  <p className="text-center py-10">Loading products...</p>
) : filteredProducts.length === 0 ? (
  <p className="text-gray-600">No products found.</p>
) : (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {filteredProducts.map((product) => (
      <ProductCard
        key={product._id}
        product={product}
        openLoginModal={openLoginModal}
      />
    ))}
  </div>
)}
      </div>
    </>
  );
};

export default Home;
