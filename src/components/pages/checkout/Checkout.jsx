import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import { BASE_URL } from "../../../api"; 
import api from "../../../api";
import { useNavigate } from "react-router-dom";
import { formatToIndianCurrency } from "../../../utils/currencyutilis";

const Checkout = () => {
    const { user, cart , setCart } = useContext(AuthContext); // Access user and cart from context
    const navigate = useNavigate();
    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
    });
    const [paymentMethod] = useState('razorpay'); // Default to Razorpay
    const cart_code = localStorage.getItem("cart_code"); // Get current cart code from local storage
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    const handleProceedToPayment = () => {
        if (!paymentMethod) {
            alert("Please select a payment method!");
            return;
        }

        // Prepare the order data (including shipping details)
        const orderData = {
            cart_code,
            shipping: shippingDetails,
            payment_method: paymentMethod,
        };

        // Call backend to complete the order and create a Razorpay order
        api.post('complete_order/', orderData)
            .then(res => {
                const { razorpay_order_id, order_id, cart_code: newCartCode, amount, currency } = res.data; // Extract the new cart_code from response
                localStorage.setItem("cart_code", newCartCode); // Update cart_code in local storage

                setCart({ items: [], summary: {} });

                // If Razorpay is selected, initiate payment
                createRazorpayPayment(razorpay_order_id, order_id);
            })
            .catch(err => {
                console.error("Error completing order:", err);
                alert("Error completing the order. Please try again.");
            });
    };

    const createRazorpayPayment = (razorpayOrderId, orderId) => {
        const options = {
            key: razorpayKey, 
            amount: cart.summary.totalPrice * 100, 
            currency: "INR",
            name: "GETIT",
            description: "Order Payment",
            order_id: razorpayOrderId, 
            handler: function (response) {
                api.post('verify_payment/', {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    order_id: orderId,
                })
                .then(() => {
                    navigate('/payment-success', { state: { orderId } });
                })
                .catch((err) => {
                    console.error("Payment verification failed:", err.response);
                    alert("Payment verification failed. Please contact support.");
                });
            },
            prefill: {
                name: shippingDetails.name,
                email: user?.email || '',
                contact: user?.phone || '',
            },
            theme: {
                color: "#F37254",
            },
            modal: {
                ondismiss: function () {
                    alert("Payment process was canceled.");
                },
            }
        };

        try {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Error opening Razorpay modal:", err);
            alert("There was an issue processing the payment. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="checkout-container p-4 sm:px-8 lg:px-16 bg-white">
            <h2 className="text-2xl font-semibold mb-6 text-center">Checkout</h2>

            {/* Cart Items Section */}
            <div className="cart-details bg-gray-100 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
                <div className="cart-items">
                    {cart.items.length > 0 ? (
                        cart.items.map(item => (
                            <div key={item.id} className="cart-item flex justify-between py-4 border-b">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`${BASE_URL}${item.product.image}`}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>
                                        <h4 className="text-sm lg:text-lg font-semibold">{item.product.name}</h4>
                                        <p className="text-gray-500">{formatToIndianCurrency(item.product.price)} x {item.quantity}</p>
                                    </div>
                                </div>
                                <span className="text-sm lg:text-lg font-semibold">₹{item.product.price * item.quantity}</span>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
            </div>
            
            {/* Flex container to align order summary and shipping info equally */}
            <div className="flex flex-col lg:flex-row justify-between gap-6">
                {/* Order Summary and Payment Method Section */}
                <div className="cart-summary-payment bg-white p-6 rounded-lg shadow-lg w-full lg:w-[48%]">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="flex mb-4 justify-between">
                        <span className="text-lg font-semibold">Total Items:</span>
                        <span className="text-lg">{cart.summary.numOfItems}</span>
                    </div>
                    <div className="flex mb-4 justify-between">
                        <span className="text-lg font-semibold">Total Price:</span>
                        <span className="text-lg">₹{cart.summary.totalPrice}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                    <div className="flex gap-4">
                        <button
                            onClick={handleProceedToPayment}
                            className={`w-full py-3 bg-blue-500 text-white hover:bg-blue-400 rounded-md ${paymentMethod === 'razorpay' ? 'bg-blue-800' : ''}`}
                        >
                            Complete Order
                        </button>
                    </div>
                </div>

                {/* Shipping Details Section */}
                <div className="shipping-details bg-white p-6 rounded-lg shadow-lg w-full lg:w-[48%]">
                    <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                    <form className="space-y-4">
                        {/* Shipping Fields in a Flex Row */}
                        <div className="flex flex-col gap-6 mb-4">
                            <input
                                type="text"
                                name="name"
                                value={shippingDetails.name}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                className="p-3 border border-gray-300 rounded-md w-full"
                            />
                            <input
                                type="text"
                                name="address"
                                value={shippingDetails.address}
                                onChange={handleInputChange}
                                placeholder="Shipping Address"
                                className="p-3 border border-gray-300 rounded-md w-full"
                            />
                            <input
                                type="text"
                                name="city"
                                value={shippingDetails.city}
                                onChange={handleInputChange}
                                placeholder="City"
                                className="p-3 border border-gray-300 rounded-md w-full"
                            />
                            <input
                                type="text"
                                name="zip"
                                value={shippingDetails.zip}
                                onChange={handleInputChange}
                                placeholder="Zip Code"
                                className="p-3 border border-gray-300 rounded-md w-full mb-0"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Complete Order Button */}
        </div>
    );
};

export default Checkout;
