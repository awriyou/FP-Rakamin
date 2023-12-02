"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page({ params }) {
  const [user, setUser] = useState({});
  const router = useRouter();
  
  function handleClick() {
    router.push(`/user/profile/${params.userId}/edit/profile`);
  }
  function handleBack() {
    router.push(`/${params.userId}`);
  }

  function handleEditPassword() {
    router.push(`/user/profile/${params.userId}/edit/password`);
  }

  function handleEditPhoto() {
    router.push(`/user/profile/${params.userId}/edit/photo`);
  }

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
      // Redirect to the login page if the user is not authenticated
      router.push("/user/login");
      return;
    }
    console.log(params.userId);
    console.log(localStorage.getItem("token"));
    

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/users/${params.userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [params.userId]);



  return (
    <div className="flex items-center justify-center min-h-screen font-poppins">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md mt-10 mb-10 font-poppins ">
        {/* Left Column - Data and Buttons */}
        <div className="text-center mb-3">
          <h1
            className="text-2xl font-bold text-blue-500"
            style={{ color: "#488BA8" }}
          >
            Profile
          </h1>
          <hr className="my-2 border-t border-gray-300" />
        </div>
        <div className="mb-6 grid grid-cols-1 font-poppins">
          <div className="space-y-4">
            <div>
              <h5
                className="block text-sm font-medium text-gray-600"
                style={{ color: "#488BA8" }}
              >
                Name:
              </h5>
              <p className="mt-1 p-2 w-full  rounded-md">{user.name}</p>
            </div>
            <div>
              <h5
                className="block text-sm font-medium text-gray-600"
                style={{ color: "#488BA8" }}
              >
                Email:
              </h5>
              <p className="mt-1 p-2 w-full  rounded-md">{user.email}</p>
            </div>
            <div>
              <h5
                className="block text-sm font-medium text-gray-600"
                style={{ color: "#488BA8" }}
              >
                Phone:
              </h5>
              <p className="mt-1 p-2 w-full  rounded-md">{user.phone}</p>
            </div>
            <div>
              <h5
                className="block text-sm font-medium text-gray-600"
                style={{ color: "#488BA8" }}
              >
                Address:
              </h5>
              <p className="mt-1 p-2 w-full  rounded-md">{user.address}</p>
            </div>
            <div>
              <h5
                className="block text-sm font-medium text-gray-600"
                style={{ color: "#488BA8" }}
              >
                Postal Code:
              </h5>
              <p className="mt-1 p-2 w-full  rounded-md">{user.postalCode}</p>
            </div>
            <div>
              <h5
                className="block text-sm font-medium text-gray-600"
                style={{ color: "#488BA8" }}
              >
                City:
              </h5>
              <p className="mt-1 p-2 w-full  rounded-md">{user.city}</p>
            </div>
            <div>
              <h5
                className="block text-sm font-medium text-gray-600"
                style={{ color: "#488BA8" }}
              >
                Province:
              </h5>
              <p className="mt-1 p-2 w-full  rounded-md">{user.province}</p>
            </div>
          </div>
          <div className="space-x-2 flex justify-end mt-4">
            <button
              onClick={handleClick}
              type="button"
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit Profile
            </button>
            <button
              onClick={handleEditPassword}
              type="button"
              className="bg-pink-500 text-white px-4 py-2 rounded"
            >
              Edit Password
            </button>
            <button
              onClick={handleBack}
              type="button"
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Back
            </button>
          </div>
        </div>

        {/* Right Column - Photo */}
        {/* <div className="text-center w-full md:w-1/3 lg:w-1/4 p-4">
          {user.photo && (
            <div
              onClick={handleEditPhoto}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-300 transform hover:scale-105 " 
            >
              <img
                src={user.photo}
                alt="User Photo"
                className=" mt-4 w-32 h-32 object-cover rounded-full  shadow  hover:opacity-80 transition-opacity duration-300 transform hover:scale-105 cursor-pointer hover:shadow-lg justify-center items-center"
              />
            </div>
          )}
        </div> */}
      </form>
    </div>
  );
}
