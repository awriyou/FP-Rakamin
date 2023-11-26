'use client';

import axios from "axios";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

// ... (import statements)

export default function Page({ params }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  function handleCancel() {
    router.push(`/profile/${params.userId}`);
  }

  async function handleSave(e) {
    e.preventDefault();

    setIsMutating(true);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    try {
      if (newPassword !== confirmPassword) {
        setIsMutating(false);

        return;
      }

      const formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
      formData.append("confirmPassword", confirmPassword);
      console.log(params.userId);
      const response = await axios.put(
        `http://localhost:8081/api/v1/users/${params.userId}`,
        formData, 
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          //   Authorization: `Bearer ${localStorage.getItem("token")}`,
          // },
        }
      );

      console.log(response);
      setIsMutating(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
    } catch (error) {
      setIsMutating(false);
    }
  }

  useEffect(() => {
    if (oldPassword && newPassword && confirmPassword) {
      handleSave();
    }
  }, [oldPassword, newPassword, confirmPassword]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:w-1/3 lg:w-1/2 mx-auto "
        onSubmit={handleSave}
      >
        <div className="mx-auto w-full md:w-1/2 lg:w-full px-8 py-4 bg-white">
          <label className="block text-gray-700 text-xl font-bold mb-2 text-center text-gray-700 text-sm font-bold mb-2">
            GANTI PASSWORD
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
    </div>
  );
}
