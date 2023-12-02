// Import statements (sesuaikan dengan kebutuhan)
"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMutating, setIsMutating] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  function handleCancel() {
    router.push(`/user/profile/${params.userId}`);
  }

  async function handleSave(e) {
    e.preventDefault();

    setIsMutating(true);
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);

    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
      router.push("/user/login");
      return;
    }
    
    try {
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        setIsMutating(false);
        return;
      }
      else if(newPassword && confirmPassword && oldPassword == "") {
        alert("Old password ,new password ,and confirm password cannot be empty.");
        setIsMutating(false);
        return;
      }
      else if(oldPassword === newPassword) {
        alert("New password cannot be the same as the old password.");
        setIsMutating(false);
        return;
      }
      else if(newPassword.length < 8) {
        alert("New password must be at least 8 characters long.");
        setIsMutating(false);
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/api/v1/users/${params.userId}`,
        {
          oldPassword,
          newPassword,
          // ... (request body),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        alert("Password changed successfully");
      } else if (response.status === 401) {
        const errorMessage = response.data.error || "Unauthorized";
        alert(`Failed to change password: ${errorMessage}`);
      } else if (response.status === 500) {
        alert("Internal server error");
      } else {
        alert(`Unexpected response status: ${response.status}`);
      }
      setIsMutating(false);

      router.push(`/user/profile/${params.userId}`);
    } catch (error) {
      setIsMutating(false);
      console.error("Error:", error.message);
      // Handle the error as needed
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 sm:w-1/3 lg:w-1/2 mx-auto"
        onSubmit={handleSave}
      >
        <div className="mx-auto w-full md:w-1/2 lg:w-full px-8 py-4 bg-white">
          <div className="text-center mb-3">
            <label
              className="text-xl font-bold text-blue-500 mb-4 text-center block"
              style={{ color: "#488BA8" }}
            >
              GANTI PASSWORD
            </label>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              style={{ color: "#488BA8" }}
            >
              Old Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
                type={showPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
          </div>
          <br />
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              style={{ color: "#488BA8" }}
            >
              New Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              style={{ color: "#488BA8" }}
            >
              Confirm Password:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-normal"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              name="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="showPassword"
              className=" text-sm font-medium text-gray-600"
              style={{ color: "#488BA8" }}
            >
              Show Password
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
