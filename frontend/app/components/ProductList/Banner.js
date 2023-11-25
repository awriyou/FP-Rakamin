// Banner.js
import React from 'react';

const Banner = ({ imageUrl, altText }) => (

    <div className="relative">
      <img
        className="w-full h-48 md:h-1/2 object-cover"
        src={imageUrl}
        alt={altText}
      />
      <div className="absolute inset-0 flex items-center justify-center">
      </div>

  </div>
);

export default Banner;
