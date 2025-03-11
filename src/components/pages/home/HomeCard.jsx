import React from "react";
import { BASE_URL } from "../../../api";
import { Link } from "react-router-dom";
import { formatToIndianCurrency } from "../../../utils/currencyutilis";

const HomeCard = ({ product }) => {
  return (
    <Link to={`/products/${product.slug}`} className="block">
      <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
        <div className="relative">
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.name}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-gray-800 font-semibold text-lg mb-2 line-clamp-2 min-h-14">
            {product.name}
          </h3>
          
          <p className="text-green-600 font-bold text-lg mt-2">
            {formatToIndianCurrency(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;