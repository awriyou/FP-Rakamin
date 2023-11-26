// components/ProductList/BrandFilter.js
import React, { useState } from 'react';

const BrandFilter = ({ onBrandClick, selectedBrand }) => {
  const [brands] = useState([
    { name: 'All', image: '/images/ProductPage/Logo Product/allProduct.png' },
    { name: 'Asus', image: '/images/ProductPage/Logo Product/asus.png' },
    { name: 'Apple', image: '/images/ProductPage/Logo Product/apple.png' },
    { name: 'Hp', image: '/images/ProductPage/Logo Product/hp.png' },
    { name: 'Lenovo', image: '/images/ProductPage/Logo Product/lenovo.png' },
    { name: 'Acer', image: '/images/ProductPage/Logo Product/acer.png' },
    { name: 'otherbrand', image: '/images/ProductPage/Logo Product/otherbrand.png' },
  ]);

  return (
    <div className="flex justify-center space-x-4 bg-white mb-5 flex-wrap">
      {brands.map((brand, index) => (
        <div key={index} className={`relative transition-transform transform hover:scale-110 mb-2 ${selectedBrand === brand.name ? 'border-blue-500 scale-90' : ''}`}>
          <button onClick={() => onBrandClick(brand.name)}>
            <img src={brand.image} alt={brand.name} className="cursor-pointer w-24 h-12 object-contain lg:w-48 lg:h-24"></img>

            <div className="absolute inset-0 border-2 border-transparent hover:border-blue-500 hover:scale-90 transition-border"></div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrandFilter;
