"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page({ params }) {
  const [user, setUser] = useState({});
  const router = useRouter();

  function handleClick() {
    router.push(`/profile/${params.userId}/edit/profile`);
  }

  function handleEditPassword() {
    router.push(`/profile/${params.userId}/edit/password`);
  }

  function handleEditPhoto() {
    router.push(`/profile/${params.userId}/edit/photo`);
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8081/api/v1/users/${params.userId}`
        );
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [params.userId]);

  const excludedProperties = [
    "photo",
    "id",
    "isAdmin",
    "is_admin",
    "_id",
    "__v",
  ];

  return (
    <div className="container mx-auto p-4 w-3/4 md:w-1/2 lg:w-4/5 my-10 space-y-4chc bg-white rounded shadow">
      <form className="flex flex-col md:flex-row items-start md:items-stretch justify-start md:justify-between space-y-4 md:space-y-0">
        {/* Left Column - Data and Buttons */}
          <div className="space-y-4 p-4 bg-white w-full md:w-1/3 lg:w-1/4 px-8 py-6 lg:px-12 lg:py-8 sm:px-8 sm:py-6">
            <h1 className="text-3xl font-bold text-gray-700 tracking-wide ">Profile</h1>
          </div>
        <div className="space-y-4 p-4 bg-white w-full md:w-2/3 lg:w-3/4 px-8 py-6 lg:px-12 lg:py-8 sm:px-8 sm:py-6 mx-auto4">
          <div className="space-y-4">
          <div>
            <h5 className="font-bold text-md  text-gray-700 tracking-wide mb-4 sm:mb-6 lg:mb-8 sm:text-xl lg:text-2xl ">Name:</h5>
            <p className="text-gray-500 sm:text-lg lg:text-xl">{user.name}</p>
          </div>
          <div>
            <h5 className="font-bold text-md  text-gray-700 tracking-wide mb-4 sm:mb-6 lg:mb-8 sm:text-xl lg:text-2xl ">Email:</h5>
            <p className="text-gray-500 sm:text-lg lg:text-xl">{user.email}</p>
          </div>
          <div>
            <h5 className="font-bold text-md  text-gray-700 tracking-wide mb-4 sm:mb-6 lg:mb-8 sm:text-xl lg:text-2xl ">Phone:</h5>
            <p className="text-gray-500 sm:text-lg lg:text-xl">{user.phone}</p>
          </div>
          <div>
            <h5 className="font-bold text-md  text-gray-700 tracking-wide mb-4 sm:mb-6 lg:mb-8 sm:text-xl lg:text-2xl ">Address:</h5>
            <p className="text-gray-500 sm:text-lg lg:text-xl">{user.address}</p>
          </div>
          <div>
            <h5 className="font-bold text-md  text-gray-700 tracking-wide mb-4 sm:mb-6 lg:mb-8 sm:text-xl lg:text-2xl ">Postal Code:</h5>
            <p className="text-gray-500 sm:text-lg lg:text-xl">{user.postalCode}</p>
          </div>
          <div>
            <h5 className="font-bold text-md  text-gray-700 tracking-wide mb-4 sm:mb-6 lg:mb-8 sm:text-xl lg:text-2xl ">City:</h5>
            <p className="text-gray-500 sm:text-lg lg:text-xl">{user.city}</p>
          </div>
          </div>
          <div className="space-x-2 flex justify-end">
            <button
              onClick={handleClick}
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
          </div>
        </div>
  
        {/* Right Column - Photo */}
        <div className="text-center w-full md:w-1/3 lg:w-1/4 p-4">
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
        </div>
      </form>
    </div>
  );
}