import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";
import { SiHyperskill } from "react-icons/si";
import menuForSidebar from "../../data/menu.js";
import skillForSidebar from "../../data/skill.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import { show, hide } from "../../redux/features/user/visibilitySlice.js";
import { NavLink } from "react-router";

const Sidebar = () => {
  const { t } = useTranslation("dashboard");
  const menu = menuForSidebar();
  const skill = skillForSidebar();

  // dispatch aciton
  const dispatch = useDispatch();
  const isVisibleSkill = useSelector(
    (state) => state.visibilitySkill.isVisible
  );
  const visibilityGrammar = useSelector(
    (state) => state.visibilityGrammar.isVisible
  );
  const activeMenus = useSelector((state) => state.sidebar.activeMenus);

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {/* {menu.map((items) => (
              <li key={items.title}>
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {React.createElement(items.icon, { size: 24 })}

                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {items.title}
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                </a>
              </li>
            ))} */}
            <li>
              <NavLink
                to=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <SiHyperskill />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  {t("skill")}
                </span>
                {visibilityGrammar ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </button>
              {visibilityGrammar && (
                <ul
                  className={` py-2 space-y-2 ${
                    visibilityGrammar ? "block" : "hidden"
                  }`}
                >
                  {skill.map((item) => (
                    <li key={item.title}>
                      <a
                        href="#"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Grammar */}
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                onClick={() => dispatch(toggleSkill())}
              >
                <SiHyperskill />
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                  {t("grammar")}
                </span>
                {isVisibleSkill ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </button>
              {isVisibleSkill && (
                <ul
                  className={` py-2 space-y-2 ${
                    isVisibleSkill ? "block" : "hidden"
                  }`}
                >
                  {skill.map((item) => (
                    <li key={item.title}>
                      <a
                        href="#"
                        className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
