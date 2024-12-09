import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../../api";

const UserInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: user.username,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    api
      .patch("/update_profile/", editData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then((res) => {
        toast.success("Profile updated successfully");
        setUser(res.data); // Update user context
        setIsEditing(false); // Close edit mode
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update profile");
      });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      {isEditing ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              name="username"
              value={editData.username}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <strong>Phone:</strong>
            </label>
            <input
              type="text"
              name="phone"
              value={editData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <strong>Address:</strong>
            </label>
            <textarea
              name="address"
              value={editData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={handleEditToggle}
            className="ml-4 bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-700 mb-2">
            <strong>Name:</strong> {user.username}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Phone:</strong> {user.phone || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> {user.address || "N/A"}
          </p>
          <button
            onClick={handleEditToggle}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
};

export default UserInfo;
