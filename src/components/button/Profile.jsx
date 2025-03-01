"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/user/authSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetUserQuery } from "../../redux/features/user/userSlice";
import { useSelector } from "react-redux";
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation("navbar");
   const theme = useSelector((state) => state.theme.theme);
  // Fetch user data using RTK Query
  const { data, error, isLoading } = useGetUserQuery();

  // Extract user details from API response
  const user = data?.payload?.[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col items-center" ref={dropdownRef}>
      <button
        type="button"
        className="flex text-sm rounded-full focus:ring-2 focus:ring-secondary-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open user menu</span>
        {isLoading ? (
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
        ) : (
          <img
            className="w-10 h-10 rounded-full"
            src={
              user?.profile ||
              (theme === "dark"
                ? "../../../img/userDefault/user-white.png" // Dark mode image
                : "../../../img/userDefault/user-black.png")
            }
            alt="user photo"
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-14 w-52 bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:divide-gray-600 z-50">
          <div className="px-4 py-3">
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-sm text-red-500">Failed to load user</p>
            ) : (
              <>
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  {user?.user_name || "Guest User"}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-300">
                  {user?.email || "guest@example.com"}
                </p>
              </>
            )}
          </div>
          <ul className="py-1">
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 dark:hover:bg-primary-950 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {t("dashboard")}
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 dark:hover:bg-primary-950 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {t("settings")}
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-100 dark:hover:bg-primary-950 dark:text-gray-300 dark:hover:text-white"
              >
                {t("sign out")}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
