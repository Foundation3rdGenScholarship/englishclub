import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import ThemeToggle from "../../components/button/ThemeToggle";
import ButtonLanguage from "../../components/button/ButtonLanguage";
import { BsPerson, BsBarChartLine } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import {
  setActiveItem,
  toggleDropdown,
} from "../../redux/features/user/sidebarSlice.js";

const UserProfileSidebar = () => {
  // for two language
  const { t } = useTranslation("dashboard");
  const isVisible = useSelector((state) => state.visibility.isVisible);
  // dispatch aciton
  const dispatch = useDispatch();
  const { activeItem, openDropdowns } = useSelector((state) => state.sidebar);

  // handle click
  const handleAction = (item, dropdown) => {
    dispatch(setActiveItem(item)); // Set active item
    dispatch(toggleDropdown(dropdown)); // Toggle dropdown
  };

  const handleClick = (item) => {
    dispatch(setActiveItem(item));
  };

  return (
    <aside
      id="logo-sidebar"
      className={`border-r border-gray-200 dark:border-gray-700 dark:bg-bg-dark-mode fixed top-0 left-0 z-40 w-64 h-screen sm:pt-[80px] pt-[60px] transition-transform ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      } bg-white sm:translate-x-0 sm:block`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-white/5 backdrop-blur-[18px] pt-6">
        <ul className="space-y-2 font-medium">
          {/* Profile */}
          <li>
            <NavLink
              to="/userprofile"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-950 group ${
                activeItem === "userprofile"
                  ? "bg-primary-100 dark:bg-primary-950"
                  : ""
              }`}
              onClick={() => handleAction("userprofile", "userprofile")}
            >
              <BsPerson className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("profile")}
              </span>
            </NavLink>
          </li>
          {/* Learning */}
          <li>
            <NavLink
              to="#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-950 group ${
                activeItem === "learning"
                  ? "bg-primary-100 dark:bg-primary-950"
                  : ""
              }`}
              onClick={() => handleAction("learning")}
            >
              <BsBarChartLine className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("learning")}
              </span>
            </NavLink>
          </li>
          {/* Logout */}
          <li>
            <NavLink
              to="#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-950 group ${
                activeItem === "logout"
                  ? "bg-primary-100 dark:bg-primary-950"
                  : ""
              }`}
              onClick={() => handleAction("logout")}
            >
              <IoIosLogOut className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("logout")}
              </span>
            </NavLink>
          </li>
        </ul>
        <ul className="absolute bottom-0 w-64 left-0 flex justify-between px-5 py-2 sm:hidden">
          <ButtonLanguage />
          <ThemeToggle />
        </ul>
      </div>
    </aside>
  );
};

export default UserProfileSidebar;
