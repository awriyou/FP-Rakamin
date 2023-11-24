import React from "react";

const BannerPromotion = () => {
    const banner= [ "images/banner-promotion.png" ]
        
  return (
    <div className="hidden sm:block">
      <div className="container mt-[80px]">
        <div className="flex justify-center mx-[50px]">
             {banner.map((each,index) =>(
                    <div key={index} className='flex justify-center items-start drop-shadow-2xl relative'>
                        <img className='w-screen cursor-pointer' src={each}/>
                    </div>
                ))}
          
        </div>
      </div>
    </div>
  );
};

export default BannerPromotion