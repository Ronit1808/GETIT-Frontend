import React, { useContext } from "react";
import UserInfo from "./UserInfo";
import OrderHistoryContainer from "./OrderHistory/OrderHistoryContainer";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {

  const {user} = useContext(AuthContext)
  if (!user) {
    sessionStorage.setItem("redirectPath", "/profile");
    navigate("/login");
  }
  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 py-8">
      {/* User Info Section */}
      <div className="w-full md:w-1/3">
        <UserInfo />
      </div>

      {/* Order History Section */}
      <div className="w-full md:w-2/3">
        <OrderHistoryContainer />
      </div>
    </div>
  );
};

export default UserProfile;
