// components/ProductList/BrandFilter.js
import React, { useState } from 'react';

const BrandFilter = ({ onBrandClick, selectedBrand }) => {
  const [brands] = useState([
    { name: 'All', image: '/images/ProductPage/logo/allProduct.png' },
    { name: 'Asus', image: '/images/ProductPage/logo/asus.png' },
    { name: 'Apple', image: '/images/ProductPage/logo/apple.png' },
    { name: 'Hp', image: '/images/ProductPage/logo/hp.png' },
    { name: 'Lenovo', image: '/images/ProductPage/logo/lenovo.png' },
    { name: 'Acer', image: '/images/ProductPage/logo/acer.png' },
    { name: 'Other Brand', image: '/images/ProductPage/logo/other.png' },
  ]);

  return (
    <div className="flex justify-center space-x-4 bg-white mb-5">
      {brands.map((brand, index) => (
        <div key={index} className={`relative transition-transform transform hover:scale-110 ${selectedBrand === brand.name ? 'border-blue-500 scale-90' : ''}`}>
          <button onClick={() => onBrandClick(brand.name)}>
            <img src={brand.image} alt={brand.name} className="cursor-pointer w-48 h-24 object-contain" />
            <div className="absolute inset-0 border-2 border-transparent hover:border-blue-500 hover:scale-90 transition-border"></div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrandFilter;
