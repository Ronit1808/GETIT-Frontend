import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../api"; 
import { formatToIndianCurrency } from "../../../utils/currencyutilis";
import Loading from '../../Loading'

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId; 

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit' 
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        
        const response = await api.get(`order_detail/${orderId}`);
        console.log(response.data);

        // If there's a shipping address, parse it if it's a string
        let parsedAddress = null;
        if (response.data.shipping_address) {
          const rawShippingAddress = response.data.shipping_address;

          // Parse the shipping address string if it's in incorrect format
          const parseShippingAddress = (addressStr) => {
            const validJsonString = addressStr.replace(/'/g, '"'); 
            return JSON.parse(validJsonString);
          };

          parsedAddress = parseShippingAddress(rawShippingAddress);
        }

        // Set the order details, including parsed address if applicable
        setOrderDetails({
          ...response.data,
          shipping_address: parsedAddress || response.data.shipping_address,
        });
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
            <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mx-auto mb-2 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        </div>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order ID is{" "}
          <span className="font-semibold">{orderId}</span>.
        </p>

        {/* Order Details */}
        <div className="bg-gray-100 p-4 rounded-lg text-left mb-4">
          <h2 className="font-bold text-lg mb-2">Order Details:</h2>
          <p>
            <strong>Status:</strong> {orderDetails.status}
          </p>
          <p>
            <strong>Total Price:</strong> {formatToIndianCurrency(orderDetails.total_price)}
          </p>
          <p>
            <strong>Total Items:</strong> {orderDetails.num_of_items}
          </p>

          
          {orderDetails.shipping_address && (
            <div>
              <p className="font-bold">Shipping Address:</p>
              <span>{orderDetails.shipping_address.address},{orderDetails.shipping_address.city},{orderDetails.shipping_address.zip}</span>
            </div>
          )}

          <p>
            <strong>Payment Method:</strong> {orderDetails.payment_method}
          </p>
            <p>
            <strong>Order Created On:</strong> {formatDate(orderDetails.created_at)}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
