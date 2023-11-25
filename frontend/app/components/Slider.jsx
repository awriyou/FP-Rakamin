'use client';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slider = () => {
  const images = ['images/jumbotron-1.png', 'images/jumbotron-2.png', 'images/jumbotron-3.png', 'images/jumbotron-4.png', 'images/jumbotron-5.png'];

  const zoomInProperties = {
    scale: 1,
    duration: 5000,
    transationDuration: 300,
    infinity: true,

    backArrow: (
      <div className='ml-10 top-40 md:top:72'>
        <IoIosArrowBack className='h-8 w-8 text-light cursor-pointer' />
      </div>
    ),
    forwardArrow: (
      <div className='ml-10 top-40 md:top:72'>
        <IoIosArrowForward className='h-8 w-8 text-light cursor-pointer' />
      </div>
    ),
  };

  return (
    <div className='w-full hidden-0 relative'>
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div key={index} className='flex justify-center items-start w-screen relative'>
            <img className='w-screen' src={each} />
          </div>
        ))}
      </Zoom>
    </div>
  );
};

export default Slider;
