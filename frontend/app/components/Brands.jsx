import React from "react";

const Brands = () => {
  const category = [
    { src: "images/asus.png", width: "180px" },
    { src: "images/lenovo.png", width: "180px" },
    { src: "images/apple.png", width: "65px", height: "80px" }, // Sesuaikan tinggi dan lebar
    { src: "images/acer.png", width: "180px" },
    { src: "images/hp.png", width: "80px", height: "80px" }, // Sesuaikan tinggi dan lebar
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="flex gap-16">
        {category.map((item, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              className="mx-8"
              src={item.src}
              alt={`Brand ${index + 1}`}
              style={{ width: item.width, height: item.height }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
