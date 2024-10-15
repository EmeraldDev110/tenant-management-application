import React, { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        const response = await axios.get("http://localhost:4000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-center mb-4">Your Orders</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Order ID</th>
            <th className="py-2 px-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="text-center border-t">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.order_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
