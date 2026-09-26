import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import reviews from "../data/reviews";
import { useCart } from "../context/CartContext";
import { useEffect,useState } from "react";
import {getProducts} from "../api";

const ProductDetails = ({ openLoginModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const isLoggedIn = localStorage.getItem("loggedIn");

  const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const products = await getProducts();

      const foundProduct = products.find(
        (item) => item.legacyId === Number(id)
      );

      setProduct(foundProduct || null);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);
useEffect(() => {
  if (product) {
    setSelectedImage(product.image);
  }
}, [product]);

  const productReviews = reviews.filter(
    (review) => review.productId === Number(id)
  );

  const [selectedImage, setSelectedImage] = useState(
    product?.image
  );

 if (loading) {
  return (
    <>
      <Header />
      <div className="p-6 text-center">
        Loading product...
      </div>
    </>
  );
}

if (!product) {
  return (
    <>
      <Header />
      <div className="p-6 text-center">
        Product not found
      </div>
    </>
  );
}

  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100
  );

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    addToCart(product);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    addToCart(product);
    navigate("/cart");
  };

  return (
    <>
      <Header />

      {/* PRODUCT DETAILS */}
      <div className="max-w-7xl mx-auto p-4 bg-white mt-4 rounded shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT: Images */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              {[product.image, product.image, product.image].map(
                (img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="thumb"
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 object-contain border cursor-pointer ${
                      selectedImage === img
                        ? "border-blue-600"
                        : "border-gray-300"
                    }`}
                  />
                )
              )}
            </div>

            <div className="flex-1 flex justify-center items-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="h-[420px] object-contain"
              />
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Home / Category / {product.name}
            </p>

            <h1 className="text-2xl font-semibold mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-3">
              <span className="bg-green-600 text-white text-sm px-2 py-0.5 rounded">
                4.3 ★
              </span>
              <span className="text-sm text-gray-600">
                {productReviews.length} Reviews
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              <span className="line-through text-gray-500">
                ₹{product.originalPrice}
              </span>
              <span className="text-green-600 font-semibold">
                {discount}% off
              </span>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">
                Available Offers
              </h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✔ Bank Offer 5% cashback on cards</li>
                <li>✔ Special Price extra ₹500 off</li>
                <li>✔ Free delivery available</li>
              </ul>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 text-white py-3 rounded hover:bg-orange-600"
              >
                ADD TO CART
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-orange-600 text-white py-3 rounded hover:bg-orange-700"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* CUSTOMER REVIEWS */}
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">
            Customer Reviews
          </h2>

          {productReviews.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet for this product.
            </p>
          ) : (
            productReviews.map((review) => (
              <div
                key={review.id}
                className="border-b py-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {review.name}
                  </span>
                  <span className="text-yellow-500">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
