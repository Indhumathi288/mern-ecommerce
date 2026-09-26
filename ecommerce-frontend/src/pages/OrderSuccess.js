import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-white p-8 rounded shadow-sm text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Order Placed Successfully 🎉
          </h2>

          <p className="text-gray-600 mb-6">
            Thank you for shopping with us!
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
