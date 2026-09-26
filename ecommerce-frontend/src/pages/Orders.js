import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-xl font-semibold mb-4">
          My Orders
        </h2>

        {loading && (
          <p>Loading orders...</p>
        )}

        {!loading && orders.length === 0 && (
          <p>No orders found</p>
        )}

        {!loading &&
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow rounded p-4 mb-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    Order ID: {order._id}
                  </p>

                  <p className="text-sm text-gray-500">
                    {order.date}
                  </p>
                </div>
              </div>

              <hr className="my-3" />

              {order.items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex justify-between text-sm mb-1"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>

                  <span>
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}

              <hr className="my-3" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>

              <p className="text-sm mt-1">
                Payment: {order.payment}
              </p>
              <div className="mt-4 border-t pt-3">
  <p className="font-semibold mb-2">
    Delivery Details
  </p>

  <p className="text-sm">
    Name: {order.customer?.name}
  </p>

  <p className="text-sm">
    Phone: {order.customer?.phone}
  </p>

  <p className="text-sm">
    Address: {order.customer?.address}
  </p>
</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Orders;