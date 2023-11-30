// components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-opacity-90 bg-black text-white pt-12 pb-2">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-bold text-sm/[8pt] mb-4">NAVIGATION</h2>
            <ul className="text-sm/[2px]">
              <li className="py-3">
                <a href="/">HOME</a>
              </li>
              <li className="py-3">
                <a href="/product">PRODUCT</a>
              </li>
              <li className="py-3">
                <a href="#categories">CATEGORY</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-sm/[8pt] mb-4">CONTACT US</h2>
            <ul>
              <li className="flex align-items-center ">
                <div className="flex items-center">
                  <img src="images/whatsapp.png" href="https://www.whatsapp.com/" alt="" className="w-4 h-4 mr-2 cursor-pointer" />
                  <a href="https://www.whatsapp.com/" className="text-sm/[2px]">
                    +62812898898
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="block">
          <hr className="mt-12 mb-1 border-t border-white" />
          <p className="text-center text-sm">
            &copy; 2023 PureCompute. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
