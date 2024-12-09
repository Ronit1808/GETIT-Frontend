import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { BASE_URL } from '../../../api';
import { formatToIndianCurrency } from '../../../utils/currencyutilis';

const CartItem = ({cartItems , updateQuantity , deleteItem}) => {
  
  return (
    <div className="cart-items space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item flex flex-col justify-start sm:flex-row sm:items-center sm:justify-between bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-6">
                <img src={`${BASE_URL}${item.product.image}`} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex flex-col">
                  <h3 className="font-semibold texy-sm lg:text-lg text-gray-800">{item.product.name}</h3>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-sm lg:text-xl font-semibold">{formatToIndianCurrency(item.product.price)}</span>
                    <span className="text-sm text-gray-500 value">x {item.quantity}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <button
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-xl"
                  onClick={() =>
                    item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-xl"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => deleteItem(item.id)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
  )
}

export default CartItem