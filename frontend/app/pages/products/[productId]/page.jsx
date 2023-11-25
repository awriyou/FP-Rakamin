'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProductDetail(context) {
  const { productId } = context.params;
  const encodedProductId = encodeURIComponent(productId);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products/${encodedProductId}`);
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    getProductById();
  }, []);

  return (
    <div className='flex p-4'>
      {/* Left side with the image */}
      <div className='flex-shrink-0 mr-4'>
        <img src={productDetails.image} alt={productDetails.name} className='w-64 h-64 object-cover' />
      </div>

      {/* Right side with product details in a card */}
      <div className='flex-1 bg-white p-6 rounded-md'>
        <h1 className='text-3xl font-bold mb-4'>{productDetails.name}</h1>
        <div className='text-gray-600 mb-4'>
          <p>Brand: {productDetails.brand}</p>
          <p>Description: {productDetails.description}</p>
          <p>Price: ${productDetails.price}</p>
          <p>Stock: {productDetails.countInStock}</p>
        </div>
        <div className='flex content-center'>
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            <svg class='w-3.5 h-3.5 me-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 18 21'>
              <path d='M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z' />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
