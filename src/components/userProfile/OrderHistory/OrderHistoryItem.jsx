import React from "react";
import { formatToIndianCurrency } from "../../../utils/currencyutilis";

const OrderHistoryItem = ({ order }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <p className="text-gray-800">
        <strong>Order ID:</strong> #{order.order_id}
      </p>
      <p className="text-gray-800">
        <strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
      </p>
      <p className="text-gray-800">
        <strong>Items:</strong> {order.num_of_items}
      </p>
      <p className="text-gray-800">
        <strong>Total:</strong> {formatToIndianCurrency(order.total_price)}
      </p>
      <p
        className={`text-gray-800 ${
          order.status === "Completed" ? "text-green-600" : "text-blue-600"
        }`}
      >
        <strong>Status:</strong> {order.status}
      </p>
    </div>
  );
};

export default OrderHistoryItem;
