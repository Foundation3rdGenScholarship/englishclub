import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("not-found");

  return (
    <div className="max-w-screen-xl sm:ml-64 mb-10 min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-bg-dark-mode">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-500 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-text-des-dark-mode">
          {t("problem")}
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't seem to exist. It might have
          been moved or deleted.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full"
          >
            Go Back
          </button>
          <Link
            to="/"
            className="block px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
