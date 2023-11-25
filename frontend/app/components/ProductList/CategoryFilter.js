// components/CategoryFilter.js
import React from 'react';

const CategoryFilter = ({ onCategoryClick }) => {
  const logos = [
    { category: 'asus', src: "/images/ProductPage/logo/asus.png", alt: "ASUS Logo" },
    { category: 'apple', src: "/images/ProductPage/logo/apple.png", alt: "Apple Logo" },
    { category: 'hp', src: "/images/ProductPage/logo/hp.png", alt: "HP Logo" },
    { category: 'lenovo', src: "/images/ProductPage/logo/lenovo.png", alt: "Lenovo Logo" },
    { category: 'acer', src: "/images/ProductPage/logo/acer.png", alt: "Acer Logo" },
  ];

  return (
    <div className="flex justify-center space-x-4 bg-white mb-5">
      {logos.map((logo, index) => (
        <div key={index} className="relative transition-transform transform hover:scale-110">
          <img
            src={logo.src}
            alt={logo.alt}
            className="cursor-pointer w-48 h-24 object-contain"
            onClick={() => onCategoryClick(logo.category)}
          />
          <div className="absolute inset-0 border-2 border-transparent hover:border-blue-500 hover:scale-90 transition-border"></div>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
