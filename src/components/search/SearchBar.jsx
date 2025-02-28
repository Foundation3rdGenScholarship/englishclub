import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const SearchBar = () => {
  const { t } = useTranslation("dashboard");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="p-2 rounded-md bg-secondary-600 sm:hidden mr-[-100px] absolute top-[-20px]"
        onClick={() => setIsSearchOpen(true)}
      >
        <FaSearch className="w-6 h-6 text-gray-700 dark:text-white" />
      </button>
      <div className="hidden sm:block">
        <input
          type="text"
          className="px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white w-[170px] lg:w-[270px]"
          placeholder={t("placeholder")}
        />
      </div>

      {/* Mobile Search Popup */}
      {isSearchOpen && (
        <div className="">
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 mt-[100px]">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-3/4">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                  placeholder={t("placeholder")}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 "
                >
                  <MdOutlineClose className="w-6 h-6 text-gray-700 dark:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
