import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { formatToIndianCurrency } from "../../../utils/currencyutilis";
import { toast } from "react-toastify";
import api from "../../../api";
import { AuthContext } from "../../context/AuthContext";

const CartSummary = ({ totalPrice, numOfItems }) => {
 
    const {setCart} = useContext(AuthContext)
  // Calculations
  const subtotal = parseFloat(totalPrice || 0);
  const discount = subtotal / 7;
  const discounted_price = subtotal - discount;
  const delivery_charges = discounted_price < 10000 && numOfItems > 0 ? 500 : 0;
  const total_price = discounted_price + delivery_charges;

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?"))
    api
      .delete("/clear_cart/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        toast.success(res.data.message);
        setCart({
          items: [],
          summary: {
            totalPrice: 0,
            numOfItems: 0,
          },
        });
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear the cart.");
      });
  };

  return (
    <div className="total-amount-card w-full lg:w-80 bg-white shadow-lg rounded-lg p-6 flex flex-col">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        Order Summary
      </h3>

      <div className="flex justify-between mb-4 text-gray-800">
        <span className="font-semibold text-lg">Total Items</span>
        <span className="text-xl font-semibold">{numOfItems}</span>
      </div>

      <div className="flex justify-between mb-4 text-gray-800">
        <span className="font-semibold text-lg">Subtotal</span>
        <span className="text-xl font-semibold">
          {formatToIndianCurrency(subtotal)}
        </span>
      </div>

      <div className="flex justify-between mb-4 text-gray-800">
        <span className="font-semibold text-lg">Discount</span>
        <span className="text-xl font-semibold text-green-500">
          {formatToIndianCurrency(discount)}
        </span>
      </div>

      <div className="flex justify-between mb-4 text-gray-800">
        <span className="font-semibold text-lg">Delivery Charges</span>
        <span className="text-xl font-semibold">
          {formatToIndianCurrency(delivery_charges)}
        </span>
      </div>

      <div className="flex justify-between mt-6 text-gray-800">
        <span className="font-semibold text-lg">Total Amount</span>
        <span className="text-xl font-semibold">
          {formatToIndianCurrency(total_price)}
        </span>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <Link to="/checkout">
          <button className="py-2 w-full md:w-1/2 lg:w-full bg-black text-white rounded-md hover:bg-gray-700 transition-all duration-300">
            Proceed to Checkout
          </button>
        </Link>
        <button onClick={clearCart} className="py-2 w-full md:w-1/2 lg:w-full bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300">
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
