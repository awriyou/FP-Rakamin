// Import modul dan komponen yang diperlukan
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ListPromotion from './ListPromotion';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (user) {
      const email = user.replace(/["']/g, ''); // Menghapus karakter '"' dan "'"
      setIsLoggedIn(!!token);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserEmail(null);
  };

  return (
    <header className='sticky top-0 z-40'>
      <div className='bg-white drop-shadow-md hidden lg:block'>
        <div className='flex items-center justify-between mx-[60px] py-4'>
          <div className='flex justify-start'>
            <div className='text-[12px]'>
              <Link className='nav-link text-main relative' href='/'>
                HOME
              </Link>
              <Link className='nav-link text-main mx-8 relative' href='/pages/products'>
                PRODUCT
              </Link>
              <Link className='nav-link text-main relative' href='#categories'>
                CATEGORIES
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-[12px]">
              <Link className="nav-link text-main relative" href="/">
                <img src="/images/logo.png" alt="logo" className='w-10 h-10'/>
              </Link>
            </div>
          </div>
          <div className='flex justify-end'>
            <div className='text-[12px]'>
              <Link className='nav-link text-main mx-auto relative' href='/cart'></Link>
              {isLoggedIn ? (
                <>
                  <Link className='nav-link text-main mx-8 relative' href='/cart'>
                    CART
                  </Link>
                  <button className='nav-link text-main mr-3 relative' onClick={handleLogout}>
                    LOG OUT
                  </button>
                  <Link className='nav-link text-main ml-3 relative' href='/'>
                    <span>{userEmail}</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link className='nav-link text-main mx-8 relative' href='/cart'>
                    CART
                  </Link>
                  <Link className='nav-link text-main relative' href='/user/login'>
                    LOG IN
                  </Link>
                  <Link className='nav-link text-main ml-3 relative' href='/user/signup'>
                    SIGN UP
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ListPromotion />
    </header>
  );
};

export default Navigation;
