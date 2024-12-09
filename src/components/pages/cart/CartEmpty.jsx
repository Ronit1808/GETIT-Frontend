import React from 'react';
import { Link } from 'react-router-dom';

function CartEmpty() {
  return (
    <div className="cart-empty flex flex-col justify-center items-center text-center text-base md:text-lg lg:text-lg h-screen p-10">
      <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
      <p className="mb-2 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
      <Link to='/'>
        <button className="mt-2 px-6 py-2 mb-4 bg-black text-white rounded-md hover:bg-gray-600">
          Shop Now
        </button>
      </Link>
    </div>
  );
}

export default CartEmpty;
