import React from "react";
import { BASE_URL } from "../../../api";
import { Link } from "react-router-dom"; // Use react-router-dom for the Link component
import { formatToIndianCurrency } from "../../../utils/currencyutilis";

const HomeCard = ({ product }) => {
 

  return (
    <Link to={`/products/${product.slug}`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Product Image */}
        <img
          src={`${BASE_URL}${product.image}`}
          alt={product.name}
          className="w-full h-60 object-cover"
        />

        {/* Product Details */}
        <div className="p-4 text-center mt-1">
          <h3 className="text-base md:text-lg lg-text-xl font-medium">{product.name}</h3>
          <p className="text-green-500 text-sm md:text-base lg:text-lg">
            {formatToIndianCurrency(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HomeCard;
