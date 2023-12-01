'use client';
import { useEffect } from 'react';
import Nav from './Nav';
// import { useRouter } from 'next/router';

export default function Layout({children}) {
  // const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (!isAdmin) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div className=" bg-gray-100 min-h-screen flex">
      <Nav />
      <div className=" bg-white shadow-xl flex-grow mt-2 mr-2 mb-2 rounded-sm p-4">
        {children}
      </div>
    </div>
  );
}
