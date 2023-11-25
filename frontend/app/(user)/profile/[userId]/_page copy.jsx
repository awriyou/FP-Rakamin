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
    <div className="flex justify-center items-center h-screen bg-gray-100 w-full h-full">
      <form className="flex flex-wrap w-full max-w-3xl bg-white shadow-md rounded px-4 pt-6 pb-8 mb-4 mt-4 mx-4">
        {/* Left Column - Data and Buttons */}
        <div className="w-full md:w-1/2 pr-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
          </div>
          {Object.keys(user).map(
            (key) =>
              !excludedProperties.includes(key) && (
                <div key={key} className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={user[key]}
                    readOnly
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              )
          )}
          <div className="flex items-center justify-between">
            <button
              onClick={handleClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Edit Profile
            </button>
            <button
              onClick={handleEditPassword}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Edit Password
            </button>
          </div>
        </div>
  
        {/* Right Column - Photo */}
        <div className="w-full md:w-1/2 pl-4">
          {user.photo && (
            <div
              className="mb-4 text-center rounded-full cursor-pointer"
              onClick={handleEditPhoto}
            >
              <img
                src={user.photo}
                className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg"
                alt="User Photo"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}