// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-opacity-90 bg-black text-white h-96 pt-12 pb-2">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold mb-4">NAVIGATION</h2>
            <ul>
              <li><a href="/">HOME</a></li>
              <li><a href="/product">PRODUCT</a></li>
              <li><a href="/category">CATEGORY</a></li>
            </ul>
          </div>
        
          <div>
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p>Information about the company and the team.</p>
          </div>
        </div>
        <hr className="mt-48 mb-1 border-t border-white" />
        <p className="text-center text-sm">
          &copy; 2023 PureCompute. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
