// Banner.js
import React from 'react';

const Banner = ({ imageUrl, altText }) => (

    <div className="relative">
      <img
        className="w-full sm:w-full  md:h-1/2 object-cover "
        src={imageUrl}
        alt={altText}
      />
      <div className="absolute inset-0 flex items-center justify-center">
      </div>
      {/* cursor-pointer w-24 h-12 object-contain lg:w-48 lg:h-24 */}
  </div>
);

export default Banner;
