import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";

const WhyUs = () => {

  return (
    <div className="hidden sm:block ">
      <div className="container my-[80px]">
        <div className="flex justify-between mx-[50px]">
          <div className="flex justify-start">
            <BsFillPatchCheckFill className="icon-why" />

            <div className="text-black whitespace-normal">
              <h1 className="font-extrabold">100% PRODUK TERJAMIN</h1>
              <p>Produk Garansi Resmi</p>
            </div>
          </div>
          <div className="flex justify-start">
            <MdLocalShipping className="icon-why" />

            <div className="text-black whitespace-normal">
              <h1 className="font-extrabold">PENGIRIMAN</h1>
              <p>Pengiriman Seluruh Indonesia</p>
            </div>
          </div>

          <div className="flex justify-start">
            <RiSecurePaymentFill className="icon-why" />

            <div className="text-black whitespace-normal">
              <h1 className="font-extrabold">PEMBAYARAN AMAN</h1>
              <p>Proses Pembayaran Terjamin Aman</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
