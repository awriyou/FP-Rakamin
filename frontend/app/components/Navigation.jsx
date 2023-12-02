"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ListPromotion from "./ListPromotion";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const userId = localStorage.getItem("userId");
    const admin = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(admin);

    if (user) {
      const email = user.replace(/["']/g, ""); // Menghapus karakter '"' dan "'"
      setIsLoggedIn(!!token);
      setUserEmail(email);
      setUserId(userId);
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
      setUserId(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserEmail(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-white drop-shadow-md hidden lg:block">
        <div className="flex items-center justify-between mx-[60px] py-4">
          <div className="flex justify-start">
            <div className="text-[12px]">
              <Link
                className="nav-link text-main relative"
                href={isLoggedIn ? `/${userId}` : "/"}
              >
                HOME
              </Link>
              <Link
                className="nav-link text-main mx-8 relative"
                href={
                  isLoggedIn ? `/${userId}//pages/products` : "/pages/products"
                }
              >
                PRODUCT
              </Link>
              <Link
                className="nav-link text-main relative"
                href={isLoggedIn ? `/${userId}#categories` : "#categories"}
              >
                CATEGORIES
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-[12px]">
              <Link
                className="nav-link text-main relative"
                href={isLoggedIn ? `/${userId}` : "/"}
              >
                <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
              </Link>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-[12px] flex items-center">
              <Link
                className="nav-link text-main mx-auto mr-5 relative"
                href={isLoggedIn ? `/${userId}/pages/cart` : "/user/login"}
              >
                <img
                  src="/images/cart.png"
                  alt="cart"
                  className="w-[18px] h-[18px]"
                />
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    className="nav-link text-main mx-8 relative"
                    href={isLoggedIn ? `/${userId}/pages/order` : "/user/login"}
                  >
                    ORDER
                  </Link>
                  <button
                    className="nav-link text-main relative"
                    onClick={handleLogout}
                  >
                    LOG OUT
                  </button>
                  {isAdmin ? (
                    <Link
                      href="/admin/"
                      className="font-bold nav-link ml-8 text-slate-200 relative px-3 py-2 bg-blue-100 rounded-xl"
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
                    className="nav-link text-main ml-4 relative font-bold flex items-center gap-1"
                    href={`/user/profile/${userId}`}
                  >
                    <span className="">{userEmail}</span>
                    <img src="/images/user.png" className="w-3 h-3" />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="nav-link text-main relative"
                    href="/user/login"
                  >
                    LOG IN
                  </Link>
                  <span className="text-light mx-3">|</span>
                  <Link
                    className="nav-link text-main relative"
                    href="/user/signup"
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
