'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ListPromotion from './ListPromotion';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(admin);

    if (user) {
      const email = user.replace(/['']/g, ''); // Menghapus karakter ''' dan '''
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
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setUserEmail(null);
    setIsAdmin(false);
    window.location.href = '/user/login';
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
              <Link
                className='nav-link text-main mx-8 relative'
                href='/pages/products'
              >
                PRODUCT
              </Link>
              <Link className='nav-link text-main relative' href='#categories'>
                CATEGORIES
              </Link>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='text-[12px]'>
              <Link className='nav-link text-main relative' href='/'>
                <img src='/images/logo.png' alt='logo' className='w-[31px] h-[32px]' />
              </Link>
            </div>
          </div>
          <div className='flex justify-end'>
            <div className='text-[12px] flex items-center'>
              <Link
                className='nav-link text-main ml-5 relative'
                href='/cart'
              ></Link>
              <Link className='nav-link text-main mx-auto mr-5 relative' href='/cart'>
              <img src='/images/cart.png' alt='cart' className='w-[18px] h-[18px]'/>
              </Link>
              {isLoggedIn ? (
                <>
                  <button
                    className='nav-link text-main relative mx-auto'
                    onClick={handleLogout}
                  >
                    LOG OUT
                  </button>
                  {isAdmin ? (
                    <Link
                      href='/admin/'
                      className='font-bold nav-link ml-3 text-slate-200 relative px-3 py-2 bg-blue-100 rounded-xl'
                    >
                      ADMIN DASH
                    </Link>
                  ) : (
                    <Link
                      href="/admin/"
                      className="nav-link relative text-main"
                    >
                      {/*INI TIDAK BOLEH DIAKSES OLEH USER BIASA KARNA KONDISI ISADMIN FALSE  */}
                    </Link>
                  )}

                  <Link
                    className='nav-link text-main ml-3 relative font-bold flex items-center gap-1'
                    href='/'
                  >
                    <span className="">{userEmail}</span>
                    <img src="/images/user.png" className="w-3 h-3" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className='nav-link text-main relative mr-3 ml-2'
                    href='/user/login'
                  >
                    LOG IN
                  </Link>
                  <span className='text-light mx-3'>|</span>
                  <Link
                    className='nav-link text-main relative mr-5 ml-2'
                    href='/user/signup'
                  >
                    SIGN UP
                  </Link>
                </>
              )}
              {/* <Link className='nav-link text-main relative' href='/user/login'>
                LOG IN
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <ListPromotion />
    </header>
  );
};

export default Navigation;
