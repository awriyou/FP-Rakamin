import React from 'react';

const Category = () => {
  const category = ['images/category-1.png', 'images/category-2.png', 'images/category-3.png'];
  const imageUrl = require('../../public/images/line.png').default;

  return (
    <div className='hidden sm:block ' id='categories'>
      <div className='container my-[80px]'>
        <div className='justify-center mx-[50px]'>
          <div className='font-extrabold text-3xl text-black mb-6'>
            <h1>CATEGORY PRODUCT</h1>
            <hr className='overlay-line' />
          </div>
          {category.map((each, index) => (
            <div key={index} className='drop-shadow-2xl relative'>
              <img className='my-8 cursor-pointer' src={each} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
