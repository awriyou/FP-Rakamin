// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-opacity-90 bg-black text-white pt-12 pb-2'>
      <div className='mx-[55px]'>
        <div className='flex justify-between grid-cols-4 gap-8'>
          <div>
            <h2 className='font-bold text-sm/[8pt] mb-4'>PRODUCT & SERVICES</h2>
            <ul className='text-sm/[2px]'>
              <li className='py-4'>
                <a href='/'>HOME</a>
              </li>
              <li className='py-4'>
                <a href='/pages/products'>PRODUCT</a>
              </li>
              <li className='py-4'>
                <a href='#categories'>CATEGORY</a>
              </li>
              <li className='py-4'>
                <a href='#feedback'>FEEDBACK</a>
              </li>
              <li className='py-4'>
                <a href='/cart'>CART</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='font-bold text-sm/[8pt] mb-4'>SUPPORT</h2>
            <ul>
              <li className='flex align-items-center'>
                <div className='flex items-center'>
                  <img src='images/whatsapp.png' href='https://www.whatsapp.com/' alt='' className='w-6 h-6 mr-2 cursor-pointer' />
                  <a href='https://www.whatsapp.com/' className='text-sm/[2px]'>
                    +62812898898
                  </a>
                </div>
              </li>
              <li className='flex align-items-center py-3'>
                <div className='flex items-center'>
                  <img src='images/mail.png' href='https://mail.google.com/' alt='' className='w-6 h-6 mr-2 cursor-pointer' />
                  <a href='https://mail.google.com/' className='text-sm/[2px]'>
                    purecompute@mail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className='font-bold text-sm/[8pt] mb-4'>BRANDS</h2>
            <ul className='text-sm/[2px]'>
              <li className='py-3'>
                <a href=''>ASUS</a>
              </li>
              <li className='py-3'>
                <a href=''>LENOVO</a>
              </li>
              <li className='py-3'>
                <a href=''>APPLE</a>
              </li>
              <li className='py-3'>
                <a href=''>ACER</a>
              </li>
              <li className='py-3'>
                <a href=''>HP</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className='font-bold text-sm/[8pt] mb-6'>SOCIAL MEDIA</h2>
            <ul>
              <li className='flex align-items-center '>
                <div className='flex items-center'>
                  <img src='images/youtube.png' href='https://www.youtube.com/' alt='' className='w-6 h-6 mr-3 cursor-pointer' />
                  <img src='images/instagram.png' href='https://www.instagram.com/' alt='' className='w-6 h-6 mx-3 cursor-pointer' />
                  <img src='images/twitter.png' href='https://www.tiktok.com/' alt='' className='w-6 h-6 mx-3 cursor-pointer' />
                  <img src='images/tiktok.png' href='https://www.twitter.com/' alt='' className='w-6 h-6 mx-3 cursor-pointer' />
                  
                </div>
              </li>
            </ul>
          </div>
          
          



        </div>
        <div className='block'>
          <hr className='mt-12 mb-1 border-t border-white' />
          <p className='text-center text-sm'>&copy; 2023 PureCompute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
