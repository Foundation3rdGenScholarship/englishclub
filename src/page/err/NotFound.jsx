import React from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("not-found");

  return (
    <div className="grid h-screen place-content-center bg-white px-4 gap-8">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-400 dark:text-text-des-dark-mode">
          {t("404")}
        </h1>

        <p className="text-2xl font-bold tracking-tight text-gray-500 sm:text-4xl dark:text-text-des-dark-mode">
          {t("notFound")}
        </p>

        <NavLink
          to="/"
          className="mt-6 inline-block rounded-full dark:bg-secondary-900 bg-secondary-500 dark:hover:bg-secondary-700 hover:bg-secondary-700  px-5 py-3 text-md font-medium text-white "
        >
          {t("back")}
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
