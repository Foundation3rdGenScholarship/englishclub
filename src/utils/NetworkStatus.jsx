import React from "react";
// import { useTranslation } from "react-i18next";
export default function NetworkStatus() {
//   const { t } = useTranslation("networkStatus");
  return (
    <div className="max-w-screen-2xl flex flex-col gap-4 justify-center items-center h-screen px-8">
      <h1 className="text-text-des-light-mode dark:text-text-des-dark-mode text-4xl font-bold text-center">
        {/* {t("h1")} */}
        You're Offline
      </h1>
      <p className="text-text-des-light-mode dark:text-text-des-dark-mode text-xl text-center">
        {/* {t("p")} */}
        Please check your internet connection and try again.
      </p>
    </div>
  );
}
