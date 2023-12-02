'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const ProductCard = ({ product }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const brandImagePath = product.brand
    ? `/images/ProductPage/Logo Product/${product.brand}.png`
    : "";
  const productId = product.id || "";
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Set isLoggedIn based on userId
    if (userId) {
      setIsLoggedIn(true);
    }
  }, [userId]);

  const formattedProductName =
    product.name.length < 50
      ? product.name + " \u00A0".repeat(50 - product.name.length)
      : product.name;

  console.log(userId);

  return (
    <div className="rounded-lg overflow-hidden bg-white border border-gray-300">
      <Link
        href={
          isLoggedIn
            ? `/${userId}/pages/products/${productId}`
            : `/pages/products/${productId} `
        }
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full min-h-40 object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="border-t-2 border-gray-200 mt-4"></div>
        <h3 className="text-xl font-raleway font-semibold text-gray-800 mt-4">
          {formattedProductName}
        </h3>
        <div className="flex items-center mt-2">
          <p className="text-xl font-raleway font-bold text-blue-500">
            {formatter.format(product.price)}
          </p>
        </div>
        <img
          src={brandImagePath}
          alt={product.brand}
          className="w-24 object-contain ml-auto"
        />
      </div>
    </div>
  );
};

export default ProductCard;
