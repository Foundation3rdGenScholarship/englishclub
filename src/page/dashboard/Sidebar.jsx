import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { SiHyperskill } from "react-icons/si";
import menuForSidebar from "../../data/menu.js";
import skillForSidebar from "../../data/skill.js";
import grammarForSidebar from "../../data/grammar.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router";
import {
  setActiveItem,
  toggleDropdown,
} from "../../redux/features/user/sidebarSlice.js";

const Sidebar = () => {
  // for two language
  const { t } = useTranslation("dashboard");

  // import object
  const menu = menuForSidebar();
  const skill = skillForSidebar();
  const grammar = grammarForSidebar();

  // dispatch aciton
  const dispatch = useDispatch();
  const { activeItem, openDropdowns } = useSelector((state) => state.sidebar);

  // handle click
  const handleClick = (item) => {
    dispatch(setActiveItem(item));
  };

  const handleDropdown = (dropdown) => {
    dispatch(toggleDropdown(dropdown));
  };

  return (
    <aside
      id="logo-sidebar"
      className="dark:bg-bg-dark-mode fixed top-0 left-0 z-40 w-64 h-screen pt-[74px] transition-transform -translate-x-full  sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-bg-light-mode dark:bg-gray-800 pt-6">
        <ul className="space-y-2 font-medium">
          {/* Overview */}
          <li>
            <NavLink
              to="#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-950 group ${
                activeItem === "dashboard"
                  ? "bg-primary-100 dark:bg-primary-950"
                  : ""
              }`}
              onClick={() => handleClick("dashboard")}
            >
              <FaHome className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("overview")}
              </span>
            </NavLink>
          </li>

          {/* Skills */}
          <li>
            <button
              type="button"
              onClick={() => handleDropdown("dashboard")}
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-primary-100 dark:text-white dark:hover:bg-primary-950"
            >
              <SiHyperskill />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {t("skill")}
              </span>
              {openDropdowns.includes("dashboard") ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}
            </button>
            {openDropdowns.includes("dashboard") && (
              <ul className="py-2 space-y-2">
                {skill.map((skillItem) => (
                  <li key={skillItem.text}>
                    <NavLink
                      to={skillItem.path}
                      onClick={() => handleClick(skillItem.text)}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-primary-100 dark:text-white dark:hover:bg-primary-950 cursor-pointer ${
                        activeItem === skillItem.text
                          ? "bg-primary-100 dark:bg-primary-950"
                          : ""
                      }`}
                    >
                      {skillItem.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {/* Grammar */}
          <li>
            <button
              type="button"
              onClick={() => handleDropdown("grammar")}
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-primary-100 dark:text-white dark:hover:bg-primary-950"
            >
              <SiHyperskill />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {t("grammar")}
              </span>
              {openDropdowns.includes("grammar") ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}
            </button>
            {openDropdowns.includes("grammar") && (
              <ul className="py-2 space-y-2">
                {grammar.map((grammarItem) => (
                  <li key={grammarItem.text}>
                    <NavLink
                      to={grammarItem.paht}
                      onClick={() => handleClick(grammarItem.text)}
                      className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-primary-100 dark:text-white dark:hover:bg-primary-950 cursor-pointer ${
                        activeItem === grammarItem.text
                          ? "bg-primary-100 dark:bg-primary-950"
                          : ""
                      }`}
                    >
                      {grammarItem.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
