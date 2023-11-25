"use client";

import axios from "axios";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

// ... (import statements)

export default function Page({ params }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  function handleCancel() {
    router.push(`/profile/${params.userId}`);
  }

  async function handleSave(e) {
    e.preventDefault();
    setIsMutating(true);

    try {
      if (newPassword !== confirmPassword) {
        setIsMutating(false);
        setNotification("Passwords do not match");
        return;
      }

      const formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      formData.append("confirmPassword", confirmPassword);
      const response = await axios.put(
        `http://localhost:8081/api/v1/users/${params.userId}`,
        formData
      );
      setIsMutating(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setNotification("Password updated successfully");
      if (response.status === 200) {
        setTimeout(() => {
          router.push(`/profile/${params.userId}`);
        }, 2000);
      } else {
        setNotification(response.data.message);
      }
    } catch (error) {
      setIsMutating(false);
      setNotification(error.response.data.message);
    }
  }

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  }, [notification]);

  // Notification component
  const NotificationComponent = () => {
    return (
      <div
        style={{
          color: "red",
          textAlign: "center",
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: "20px",
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "lightgray",
          borderRadius: "5px",
          border: "1px solid gray",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          width: "300px",
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
          zIndex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {notification}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:w-1/3 lg:w-1/2 mx-auto ">
        <div className="mx-auto w-full md:w-1/2 lg:w-full px-8 py-4 bg-white">
          <label className="block text-gray-700 text-xl font-bold mb-2 text-center text-gray-700 text-sm font-bold mb-2">
            User ID: {params.userId}
          </label>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Old Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSave}
              disabled={isMutating}
            >
              {isMutating ? "Saving..." : "Save"}
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
      {notification && <NotificationComponent />}
    </div>
  );
}
