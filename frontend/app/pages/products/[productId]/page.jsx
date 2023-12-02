'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '@/app/components/BackButton';
import AddToCartButton from '@/app/components/AddToCartButton';
import WhyUs from '@/app/components/WhyUs';
import Footer from '@/app/components/Footer';

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
  //!====
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div>
      <div className='flex p-4'>
        <div className='relative h-32 w-32'>
          <div className='absolute left-0 top-0 h-16 w-16'>
            <BackButton />
          </div>
        </div>

        <div className='flex-shrink-0 mr-4'>
          <img src={productDetails.image} alt={productDetails.name} className='w-64 h-64 object-cover' />
        </div>

        <div className='flex-1 bg-white p-6 rounded-md'>
          <h1 className='text-3xl font-bold mb-4'>{productDetails.name}</h1>
          <div className='text-gray-600 mb-4'>
            <p>Brand: {productDetails.brand}</p>
            <p>Description: {productDetails.description}</p>
            <p>Price: {formatter.format(productDetails.price)}</p>
            <p>Stock: {productDetails.countInStock}</p>
          </div>
          <AddToCartButton />
        </div>
      </div>
      <WhyUs />
    </div>
  );
}
