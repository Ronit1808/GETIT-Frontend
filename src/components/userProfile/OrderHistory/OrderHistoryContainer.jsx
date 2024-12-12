import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import OrderHistoryItem from "./OrderHistoryItem";
import { toast } from "react-toastify";
import api from "../../../api";
import Loading from "../../Loading";


const OrderHistoryContainer = () => {
  const { user } = useContext(AuthContext); 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("user_orders/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="h-96 overflow-y-auto">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderHistoryItem key={order.order_id} order={order} />
          ))
        ) : (
          <p className="text-gray-700">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryContainer;
