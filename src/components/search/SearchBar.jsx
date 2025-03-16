import React, { useState, useEffect } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { useSearchQuery } from "../../redux/features/search/search"; // Assuming you have this hook set up for searching
import { useNavigate } from "react-router-dom"; // For navigation
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Store the search term
  const [isInputVisible, setIsInputVisible] = useState(false); // For input visibility
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // For dropdown visibility
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false); // For mobile modal state
  const navigate = useNavigate(); // For navigation
  const { t } = useTranslation("dashboard");

  // Fetch search results from the API
  const { data, isFetching, error } = useSearchQuery(searchTerm, {
    skip: !searchTerm, // Only make the request if there’s a search term
  });

  const results = data?.payload || {}; // API response data
  const exercises = results?.exercises || []; // Extract exercises from the response

  // Handle search icon click
  const handleSearchIconClick = () => {
    if (window.innerWidth <= 768) {
      // Open modal on mobile
      setIsMobileModalOpen(true);
    } else {
      // Toggle input visibility on desktop
      setIsInputVisible(!isInputVisible);
    }
    setIsDropdownVisible(false); // Close dropdown when toggling input
  };

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownVisible(true); // Show dropdown when user types
  };

  // Handle click on a search result
  const handleResultClick = (ex_uuid) => {
    navigate(`/exercises/${ex_uuid}`); // Navigate to the lesson page
    setIsDropdownVisible(false); // Close the dropdown after selection
    setIsInputVisible(false); // Hide the input after selection
    setIsMobileModalOpen(false); // Close the modal after selection
    setSearchTerm(""); // Clear the search term
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileModalOpen && !e.target.closest(".search-modal")) {
        setIsMobileModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileModalOpen]);

  return (
    <div className="">
    <div className="flex items-center relative">
      {/* Search Icon */}
      <div
        className="cursor-pointer text-white rounded-md bg-secondary-500 p-2 order-2"
        onClick={handleSearchIconClick}
      >
        <IoSearch className="text-2xl" />
      </div>

      {/* Desktop Search Input */}
      <div
        className={`hidden md:block transition-all duration-300 ease-in-out overflow-hidden ${
          isInputVisible
            ? "w-[8rem] sm:w-[19rem] md:w-[19rem] lg:w-[32rem] xl:w-[55rem] opacity-100"
            : "w-0 opacity-0"
        }`}
      >
        <div className="rounded-lg shadow-lg z-50">
          <div className="relative p-2">
            {/* Search Icon inside the Input */}
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <IoSearch className="text-gray-500 dark:text-gray-400 text-xl" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 p-1.5 rounded-lg border-1 border-gray-300 bg-bg-light-mode focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 dark:bg-gray-800 dark:text-white text-sm md:text-md lg:text-lg placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={t("search for a lesson...")}
              autoFocus // Automatically focus the input when it appears
            />
          </div>

          {/* Dropdown showing search results */}
          {isDropdownVisible && searchTerm && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
              {isFetching ? (
                <div className="p-2 text-gray-600 dark:text-white">
                  {t("loading...")}
                </div>
              ) : error ? (
                <div className="p-2 text-red-500">Error fetching results</div>
              ) : (
                <div>
                  {exercises.length === 0 ? (
                    <div className="p-2 text-gray-500">No results found</div>
                  ) : (
                    exercises.map((item) => (
                      <div
                        key={item.ex_uuid} // Use ex_uuid as key
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => handleResultClick(item.ex_uuid)} // Navigate to the lesson
                      >
                        <h3 className="text-sm md:text-md lg:text-lg font-bold text-primary-500 dark:text-primary-300">
                          {item.title}
                        </h3>
                        <hr />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      
    </div>
    {/* Mobile Search Modal */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 min-h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="search-modal bg-white dark:bg-gray-800 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-4">
            {/* Close Button */}
            {/* <div className="flex justify-end">
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <IoClose className="text-2xl" />
              </button>
            </div> */}

            {/* Search Input */}
            <div className="relative p-2">
              {/* Search Icon inside the Input */}
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <IoSearch className="text-gray-500 dark:text-gray-400 text-xl" />
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 p-1.5 rounded-lg border-1 border-gray-300 bg-bg-light-mode focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 dark:bg-gray-800 dark:text-white text-sm md:text-md lg:text-lg placeholder-gray-400 dark:placeholder-gray-500"
                placeholder={t("search for a lesson...")}
                autoFocus // Automatically focus the input when it appears
              />
            </div>

            {/* Dropdown showing search results */}
            {isDropdownVisible && searchTerm && (
              <div className="mt-2 rounded-lg max-h-60 overflow-y-auto">
                {isFetching ? (
                  <div className="p-2 text-gray-600 dark:text-white">
                    {t("loading...")}
                  </div>
                ) : error ? (
                  <div className="p-2 text-red-500">Error fetching results</div>
                ) : (
                  <div>
                    {exercises.length === 0 ? (
                      <div className="p-2 text-gray-500">No results found</div>
                    ) : (
                      exercises.map((item) => (
                        <div
                          key={item.ex_uuid} // Use ex_uuid as key
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                          onClick={() => handleResultClick(item.ex_uuid)} // Navigate to the lesson
                        >
                          <h3 className="text-sm md:text-md lg:text-lg font-bold text-primary-500 dark:text-primary-300">
                            {item.title}
                          </h3>
                          <hr />
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
