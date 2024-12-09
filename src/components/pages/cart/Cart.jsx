import React, { useEffect, useState, useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import CartEmpty from './CartEmpty';
import { toast } from 'react-toastify';
import api from '../../../api';
import { AuthContext } from '../../context/AuthContext';


function Cart() {
  const { cart, setCart } = useContext(AuthContext); // Get cart and setCart from AuthContext
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({});

  console.log(cart)

  useEffect(() => {
    // Update local state when cart in AuthContext changes
    setCartItems(cart.items || []);
    setCartSummary({
      totalPrice: cart.summary?.totalPrice || 0,
      numOfItems: cart.summary?.numOfItems || 0,
    });
  }, [cart]);

  const updateQuantity = (itemId, newQuantity) => {
    api.patch(`update_quantity/${itemId}/`, { quantity: newQuantity })
      .then((res) => {
        console.log(res.data);
        const updatedCartItems= res.data.data.items;
        const updatedCartSummary= {
          totalPrice : res.data.data.cart_total_price,
          numOfItems : res.data.data.num_of_items

        }
        setCart({
          items: updatedCartItems,
          summary: updatedCartSummary,
        }); // Update the cart in AuthContext
      })
      .catch((err) => {
        console.error("Error updating quantity:", err.message);
      });
  };

  const deleteItem = (itemId) => {
    api.delete(`delete_item/${itemId}/`)
      .then((res) => {
        console.log(res.data);
        toast.success("Item deleted successfully");
        const updatedCartItems= res.data.data.items;
        const updatedCartSummary= {
          totalPrice : res.data.data.cart_total_price,
          numOfItems : res.data.data.num_of_items

        }
        setCart({
          items: updatedCartItems,
          summary: updatedCartSummary,
        }); // Update the cart in AuthContext
      })
      .catch((err) => {
        console.error("Error deleting item:", err.message);
      });
  };

  return (
    <div className="cart-container flex flex-col lg:flex-row p-4 bg-white gap-8">
      <div className="cart-items-container flex-1 px-4">
        <div className="cart-header mb-4 text-sm md:text-base lg:text-xl font-semibold md:px-4 flex items-center gap-4">
          <h2>Your Cart</h2>
          <ShoppingCartIcon className="text-gray-800" />
        </div>
        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <CartItem
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            deleteItem={deleteItem}
          />
        )}
      </div>
      {cartItems.length > 0 && (
        <CartSummary
          totalPrice={cartSummary.totalPrice}
          numOfItems={cartSummary.numOfItems}
        />
      )}
    </div>
  );
}

export default Cart;
