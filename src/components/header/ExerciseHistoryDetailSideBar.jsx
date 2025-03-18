import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for normal page navigation
import { BsPerson, BsBarChartLine } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { setActiveItem } from "../../redux/features/user/sidebarSlice.js";
import ThemeToggle from "../../components/button/ThemeToggle";
import ButtonLanguage from "../../components/button/ButtonLanguage";

const ExerciseHistoryDetailSidebar = ({
  showSignOutModal,
  setShowSignOutModal,
}) => {
  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch();
  const { activeItem } = useSelector((state) => state.sidebar);
  const isVisible = useSelector((state) => state.visibility.isVisible);

  const handleAction = (item) => {
    dispatch(setActiveItem(item));
  };

  const handleSignOutClick = () => {
    setShowSignOutModal(true); // Show the sign-out modal when the link is clicked
    dispatch(setActiveItem("sign-out"));
  };

  const handleLearningClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    // Optionally, show a message or perform another action when clicked
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
          <li>
            <Link
              to="/userprofile"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 hover:text-white dark:hover:bg-primary-950 group ${
                activeItem === "profile-section"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
              onClick={() => handleAction("profile-section")}
            >
              <BsPerson className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("profile")}
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 hover:text-white dark:hover:bg-primary-950 ${
                activeItem === "exercise-section"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              } pointer-events-none cursor-not-allowed group`}
              onClick={handleLearningClick} // Prevent navigation on click
            >
              <BsBarChartLine className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("learning")}
              </span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOutClick}
              className={`flex items-center p-2 w-full text-start text-gray-900 rounded-lg dark:text-white hover:bg-primary-100 hover:text-white dark:hover:bg-primary-950 group ${
                activeItem === "sign-out"
                  ? "bg-primary-100 dark:bg-primary-950 text-white"
                  : ""
              }`}
            >
              <IoIosLogOut className="size-6" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                {t("sign out")}
              </span>
            </button>
          </li>
        </ul>
      </div>
      <ul className="absolute bg-white/10 backdrop-blur-md border-2 border-white dark:border-none border-white/20 bottom-0 w-64 left-0 flex justify-between px-5 py-2 sm:hidden">
        <ButtonLanguage />
        <ThemeToggle />
      </ul>
    </aside>
  );
};

export default ExerciseHistoryDetailSidebar;
