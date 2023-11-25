import React from "react";
import Link from "next/link";
import ListPromotion from "./ListPromotion";
import { BsBag } from "react-icons/bs";

const Navigation = () => {
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-white drop-shadow-md hidden lg:block">
        <div className="flex items-center justify-between mx-[60px] py-4">
          <div className="flex justify-start">
            <div className="text-[12px]">
              <Link className="nav-link text-main relative" href="/">
                HOME
              </Link>
              <Link
                className="nav-link text-main mx-8 relative"
                href="/product"
              >
                PRODUCT
              </Link> 
              <Link className="nav-link text-main relative" href="/categories">
                CATEGORIES
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="text-[12px]">
              <Link className="nav-link text-main relative" href="/home">
                LOGO
              </Link>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-[12px]">
              <Link
                className="nav-link text-main mx-8 relative"
                href="/cart"
              ></Link>
              <Link className="nav-link text-main mx-8 relative" href="/cart">
                CART
              </Link>
              <Link className="nav-link text-main relative" href="/login">
                LOG IN
              </Link>
              <span className="text-light mx-3">|</span>
              <Link className="nav-link text-main relative" href="/signup">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ListPromotion />
    </header>
  );
};

export default Navigation;
