"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BackButton from "@/app/components/BackButton";
import WhyUs from "@/app/components/WhyUs";

export default function ProductDetail(context) {
  const { productId } = context.params;
  const encodedProductId = encodeURIComponent(productId);
  const [productDetails, setProductDetails] = useState({});
  const setIsLoggedIn = useState(false);
  const router = useRouter();
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(userId);

  const addToCart = async () => {
    // Check if productDetails is available
    if (!productDetails || Object.keys(productDetails).length === 0) {
      console.error("Product details are not available.");
      return;
    }

    // Disable the button to prevent multiple clicks
    setIsLoading(true);

    // Extracting properties from productDetails
    const { id, name, price, image } = productDetails;

    // Get the user ID from local storage
    const userId = localStorage.getItem("userId");

    try {
      // Simulate an asynchronous operation (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Retrieve the cart from local storage
      const cartString = localStorage.getItem("cart");
      let cart = {};
      if (cartString) {
        cart = JSON.parse(cartString);
      }

      // Check if the product is already in the cart
      const existingCartItem = cart[`${userId}_${id}`];

      // If the product is already in the cart, update the quantity
      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        // Add the product to the cart
        cart[`${userId}_${id}`] = {
          userId,
          productId: id,
          name,
          image,
          price,
          quantity: 1,
        };
      }

      // Update the cart state
      setCart(cart);

      // Save the updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Show a success message
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = async () => {
    await addToCart();
    setTimeout(() => {
      window.location.href = `${userId}/pages/cart`;
      window.location.reload();
    }, 500);
  };

  console.log(cart);
  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      router.push("/user/login");
    }
  };
  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/products/${encodedProductId}`
        );
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProductById();

    checkLoginStatus();
  }, []);
  //!====
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return (
    <div className="relative">
      <div className="absolute top-0 left-40 p-4">
        <BackButton />
        <div></div>
      </div>

      <div className="flex p-4 mt-4 max-w-4xl mx-auto align-middle">
        {/* Left side with the image */}
        <div className="flex-shrink-0 mr-4 rounded-md shadow">
          <img
            src={productDetails.image}
            alt={productDetails.name}
            className="w-64 h-64 object-cover"
          />
        </div>

        {/* Right side with product details in a card */}
        <div className="flex-1 bg-white p-6 rounded-md shadow">
          <h1 className="text-3xl font-bold mb-4">{productDetails.name}</h1>
          <div className="text-gray-600 mb-4">
            <p>Brand: {productDetails.brand}</p>
            <p>Description: {productDetails.description}</p>
            <p>Price: {formatter.format(productDetails.price)}</p>
            <p>Stock: {productDetails.countInStock}</p>
          </div>
          <div className="flex content-center">
            <button
              type="button"
              onClick={addToCart}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-3.5 h-3.5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 21"
              >
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              <div>Add to cart</div>
            </button>

            <div onClick={handleBuyNow}>
              <button
                type="button"
                onClick={() => router.push(`/${userId}/pages/cart`)}
                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <div>Buy now</div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
            >
              {/* ... Back button content */}
            </button>
          </div>
        </div>
      </div>
      <WhyUs/>
    </div>
  );
}
