import React from 'react';
import HomeCard from './HomeCard';
import HomePlaceholder from './HomePlaceHolder';

const HomeCardContainer = ({products , loading}) => {

  return (
    <div className='mb-8 bg-white pt-6'>
      <h2 className="text-2xl lg:text-3xl font-semibold mb-8 text-center ">Trending Products</h2>
      <div className="px-4 md:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {loading ? (
          products.map((_, index) => (
            <HomePlaceholder key={index} />
          ))
        ) : (
          products.map((product) => (
            <HomeCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeCardContainer;