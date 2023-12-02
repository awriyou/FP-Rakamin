"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page({ params }) {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  function handleCancel() {
    router.push(`/user/profile/${params.userId}`);
  }

  async function handleSave(e) {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }


    setIsMutating(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/users/${params.userId}`,
        {
          name,
          email,
          phone,
          address,
          postalCode,
          city,
          province,
        }
      );

      setIsMutating(false);
      setUser(response.data);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPostalCode("");
      setCity("");
      setProvince("");

      if (response.status === 200) {
        router.push(`/user/profile/${params.userId}`);
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update user.");
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/users/${params.userId}`
        );
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        setPostalCode(data.postalCode);
        setCity(data.city);
        setProvince(data.province);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [params.userId]);

  return (
    <div className="container mx-auto px-4 py-8 w-1/2 h-1/2 bg-white rounded-lg shadow mb-4 mt-4 p-4 flex flex-col justify-center">
      <form className="flex flex-col gap-4 w-full h-full justify-center p-4 space-y-3">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800 text-3xl mb-4">Edit Profile</h1>
        <div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="postalCode"
            >
              Postal Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="postalCode"
              type="text"
              placeholder="Enter your postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="province"
            >
              Province
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="province"
              type="text"
              placeholder="Enter your province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center space-x-4 mx-auto mt-4 w-full h-full justify-center p-4">
          <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                onClick={handleSave}
              >
                Save
              </button>
          </div>
          <div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
          </div>
        </div>  
      </form>
    </div>
  );
}
