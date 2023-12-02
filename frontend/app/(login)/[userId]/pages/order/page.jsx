"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);

  const handleDeleteOrder = async (orderId) => {
    const confirmationMessage =
      "Apakah Anda yakin ingin membatalkan pesanan ini?";

    if (window.confirm(confirmationMessage)) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          // Update state or refetch orders after successful deletion
          setOrders(orders.filter((order) => order._id !== orderId));
          console.log("Order deleted successfully");
        } else {
          console.error("Failed to delete order");
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/orders/get/userorders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getOrder();
  }, [userId, token]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className=" container mx-auto px-4 py-16 relative rounded border">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="cart-content p-4 max-w-4xl mx-auto align-middle"
            >
              <div className="flex">
                {/* Bagian kiri: Order Details dan Shipping Information */}
                <div className="w-1/2 pr-4">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2"style={{ color: "#488BA8" }}>
                      Order Details
                    </h2>
                    <p >
                      <span className="font-semibold">Total Price:</span>{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(order.totalPrice)}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {order.status}
                    </p>
                    <p>
                      <span className="font-semibold">Date Ordered:</span>{" "}
                      {formatDate(order.dateOrdered)}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2" style={{ color: "#488BA8" }}>
                      Shipping Information
                    </h2>
                    <p>
                      <span className="font-semibold">City:</span> {order.city}
                    </p>
                    <p>
                      <span className="font-semibold">Postal Code:</span>{" "}
                      {order.postalCode}
                    </p>
                    <p>
                      <span className="font-semibold">Province:</span>{" "}
                      {order.province}
                    </p>
                    <p>
                      <span className="font-semibold">Shipping Address:</span>{" "}
                      {order.shippingAddress1}
                    </p>
                  </div>
                </div>

                {/* Bagian kanan: Order Items */}
                <div className="w-1/2 pl-4">
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: "#488BA8" }}>Order Items</h2>
                  <ul>
                    {order.orderItems.map((orderItem, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-4 mb-4"
                      >
                        <img
                          src={orderItem.product.image}
                          alt={orderItem.product.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                          <p className="text-lg font-semibold">
                            {orderItem.product.name}
                          </p>
                          <p>Quantity: {orderItem.quantity}</p>
                          <p>
                            Product Price:{" "}
                            {new Intl.NumberFormat("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            }).format(orderItem.product.price)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tombol di bagian bawah */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-4"
                >
                  Cancel Order
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">
                  Pay
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full text-center">
            <p className="align-center text-xl font-bold mb-4 " style={{ color: "#488BA8" }}>
              No orders found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
