import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import logoDarkMode from "./../../../public/img/logo/logo-light-mode.png";
import ThemeToggle from "../button/ThemeToggle";
import ButtonLanguage from "../button/ButtonLanguage";
import Profile from "../button/Profile";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-red-700 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
        {/* Left Sidebar */}
        <div className="flex items-center w-64">
          {/* Sidebar Toggle Button */}
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            className="inline-flex items-center p-2 text-black rounded-md sm:hidden bg-secondary-600"
          >
            <span className="sr-only">Open sidebar</span>
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          {/* Logo */}
          <a href="#" className="ms-2">
            <img src={logoDarkMode} className="h-12" alt="Logo" />
          </a>
        </div>

        {/* Right Sidebar */}
        <div className="flex items-center space-x-4 justify-between">
          {/* Search Bar */}
          <div className="relative">
            <button
              className="p-2 rounded-md bg-secondary-600 sm:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <FaSearch className="w-6 h-6 text-gray-700 dark:text-white" />
            </button>
            <div className="hidden sm:block">
              <input
                type="text"
                className="px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Language & Theme Toggle */}
          <ButtonLanguage />
          <ThemeToggle />

          {/* Profile */}
          <Profile />
        </div>
      </div>

      {/* Mobile Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-3/4">
            <div className="flex items-center justify-between">
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                placeholder="Search..."
              />
              <button onClick={() => setIsSearchOpen(false)} className="ml-2">
                <MdOutlineClose className="w-6 h-6 text-gray-700 dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
