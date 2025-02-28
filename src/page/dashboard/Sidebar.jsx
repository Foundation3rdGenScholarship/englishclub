import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { SiHyperskill } from "react-icons/si";
import menuForSidebar from "../../data/menu.js";
import skillForSidebar from "../../data/skill.js";
import grammarForSidebar from "../../data/grammar.js";
import vocabularyForSidebar from "../../data/vocabulary.js";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router";
import ThemeToggle from "../../components/button/ThemeToggle";
import ButtonLanguage from "../../components/button/ButtonLanguage";
import { TbTextGrammar } from "react-icons/tb";
import { MdVideoLibrary } from "react-icons/md";

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
  const vocabulary = vocabularyForSidebar();

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
      className="border-r border-gray-200 dark:border-gray-700 dark:bg-bg-dark-mode fixed top-0 left-0 z-40 w-64 h-screen sm:pt-[88px] pt-[60px] transition-transform -translate-x-full  sm:translate-x-0 bg-white"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto dark:bg-white/5 backdrop-blur-[18px] pt-6">
        <ul className="space-y-2 font-medium">
          {/* Overview */}
          <li>
            <NavLink
              to="/dashboard"
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
              <TbTextGrammar />
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
                      to={grammarItem.path}
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
          {/* Vocabulary */}
          <li>
            <button
              type="button"
              onClick={() => handleDropdown("vocabulary")}
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-primary-100 dark:text-white dark:hover:bg-primary-950"
            >
              <TbTextGrammar />
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {t("grammar")}
              </span>
              {openDropdowns.includes("vocabulary") ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}
            </button>
            {openDropdowns.includes("vocabulary") && (
              <ul className="py-2 space-y-2">
                {vocabulary.map((grammarItem) => (
                  <li key={grammarItem.text}>
                    <NavLink
                      to={grammarItem.path}
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
          <li>
            <NavLink
              to="#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 dark:hover:bg-primary-950 group ${
                activeItem === "extraVideo"
                  ? "bg-primary-100 dark:bg-primary-950"
                  : ""
              }`}
              onClick={() => handleClick("extraVideo")}
            >
              <MdVideoLibrary className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("extraVideo")}
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

export default Sidebar;
