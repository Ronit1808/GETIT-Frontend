import React from 'react';
import HomeCard from '../home/HomeCard';

const ProductRelated = ({product}) => {

  return (
    <div className='my-8'>
      <h2 className="text-2xl font-bold mb-8 px-4 md:px-6 lg:px-8  ">Related Products</h2>
      <div className="px-4 md:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {product.map(prod =>(
            <HomeCard key={prod.id} product = {prod}/>
        ))}
      </div>
    </div>
  );
};

export default ProductRelated;