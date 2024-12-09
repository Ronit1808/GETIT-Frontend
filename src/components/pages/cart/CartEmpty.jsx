
import React from 'react'
import {Link} from 'react-router-dom'

function CartEmpty() {
  return (
    <div className="cart-empty text-center text-base md:text-lg lg:text-xl m-auto p-10">
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything to your cart yet.</p>
      <Link to='/'>
        <button className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-600">
            Shop Now
        </button>
      </Link>
    </div>
  );
}

export default CartEmpty;
