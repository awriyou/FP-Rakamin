import React from "react";

const Brands = () => {
  const category = [
    "images/asus.png",
    "images/lenovo.png",
    "images/apple.png",
    "images/acer.png",
    "images/hp.png",
  ];

  return (
    <div className="hidden sm:block ">
      <div className="container my-[80px]">
        <div className="flex justify-center items-center gap-3 mx-[50px]">
          {category.map((each, index) => (
            <div key={index} className="drop-shadow-2xl relative">
              <img className="mx-8" src={each} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands
