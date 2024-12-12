import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api, { BASE_URL } from '../../../api';
import ProductRelated from './ProductRelated';
import { AuthContext } from '../../context/AuthContext';
import { formatToIndianCurrency } from '../../../utils/currencyutilis';

const Product = () => {
  const { slug } = useParams();
  const { user, cart, setCart } = useContext(AuthContext); // Use cart and setCart from AuthContext

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [inCart, setInCart] = useState(false);
  const cart_code = localStorage.getItem('cart_code');
  const navigate = useNavigate();
  const location = useLocation();

  
  const addItem = (callback) => {
    if (!user) {
      // Redirect to login if the user is not logged in
      toast.error('You need to log in to add products to the cart.');
      navigate('/login', { state: { from: location.pathname } }); // Redirect to login with return URL
      return;
    }
    const newItem = { cart_code: cart_code, product_id: product.id };
    api
      .post('/add_item/', newItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
      })
      .then((res) => {
        console.log(res.data);
        toast.success('Product added to cart');
        setInCart(true);

        // Check if the item already exists in the cart
        const updatedCartItems = cart.items.map((item) => {
          if (item.id === res.data.data.id) {
            // If item exists, update its quantity and total
            return {
              ...item,
              quantity: res.data.data.quantity,
              cart_item_total: res.data.data.cart_item_total,
            };
          }
          return item; // Keep other items unchanged
        });

        // If the item doesn't exist in the cart, add it to the array
        const itemExists = cart.items.some((item) => item.id === res.data.data.id);
        if (!itemExists) {
          updatedCartItems.push({
            id: res.data.data.id,
            product: res.data.data.product,
            quantity: res.data.data.quantity,
            cart_item_total: res.data.data.cart_item_total,
          });
        }

        // Recalculate the cart summary
        const newTotalPrice = updatedCartItems.reduce((total, item) => total + item.cart_item_total, 0);
        const newNumOfItems = updatedCartItems.reduce((total, item) => total + item.quantity, 0);

        // Update the cart state
        setCart({
          items: updatedCartItems,
          summary: {
            totalPrice: newTotalPrice,
            numOfItems: newNumOfItems,
          },
        });
        if (callback) callback();
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
        toast.error('Failed to add product to cart');
      });
  };


  const handleBuyNow = () => {
    addItem(() => navigate('/checkout'));
  };


  useEffect(() => {
    if (cart_code && product.id) {
      api
        .get(`product_is_added?cart_code=${cart_code}&product_id=${product.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        })
        .then((res) => {
          console.log(res.data);
          setInCart(res.data.product_is_added);
        })
        .catch((err) => {
          console.error('Error checking if product is in cart:', err.message);
        });
    }
  }, [product.id]);

  useEffect(() => {
    setLoading(true);
    api
      .get(`product_detail/${slug}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setSimilarProducts(res.data.similar_products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching product details:', err.message);
        setLoading(true);
      });
  }, [slug]);

  return (
    <div className="flex flex-col px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-center items-center py-10 bg-white">
      <div className="w-full md:w-1/2 px-4">
          <div className="aspect-[6/4] w-full">
            <img
              src={`${BASE_URL}${product.image}`}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="w-full px-4 md:px-1 md:w-1/2 mt-6 md:mt-0 md:ml-8">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 text-lg md:text-xl mt-2">
            {formatToIndianCurrency(product.price)}
          </p>
          <p className="text-gray-700 text-base md:text-lg mt-4">
            {product.description}
          </p>
          <div className="flex items-center mt-6">
            <button
              onClick={() => addItem()}
              disabled={inCart}
              className={`${
                inCart
                  ? 'bg-white text-gray-500 border-2'
                  : 'bg-black hover:bg-gray-700 text-white'
              } font-medium py-2 px-4 rounded-md mr-4`}
            >
              {inCart ? 'Product Added to Cart' : 'Add to Cart'}
            </button>
            <button onClick={handleBuyNow} className="text-black hover:text-gray-400 font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='bg-white mt-4'>
        <ProductRelated product={similarProducts} />
      </div>
    </div>
  );
};

export default Product;
