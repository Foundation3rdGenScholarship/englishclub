// components/Profile.jsx
import React from "react";
import { NavLink} from "react-router-dom";
const Profile = ({ user, onLogout }) => {
  return (
    <div className="flex items-center">
      <NavLink to={"/dashboard"}>
        <button
          type="button"
          className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-expanded="false"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-10 h-10 rounded-full"
            src={
              user?.profile || "../../../public/img/userDefault/user-white.png"
            }
            alt="user photo"
          />
        </button>
      </NavLink>
      <button
        onClick={onLogout}
        className="ml-2 rounded-md bg-secondary-500 px-4 py-1.5 text-heading-6 text-black transition font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
