import React from "react";
import img from "../../../../public/svg/slideshowimg.svg";
import dashboardUser from "../../../../public/svg/dashboardUser.svg";
import { useTranslation } from "react-i18next";
const User = () => {
  const { t } = useTranslation("dashboard-overview");
  return (
<<<<<<< HEAD
    <div className="p-4 sm:ml-64 mt-[88px] h-[3000px] max-w-screen-xl">
      <div className="flex justify-center">
        <img src={img} alt="" />
      </div>
      {/* for description */}
      <div>
        <p className="dark:text-text-des-dark-mode text-primary-800  lg:text-heading-4 md:text-heading-6 flex justify-center lg:py-16 sm:py-8 py-4 text-center">
          {t("whatYouFindHere")}
          {t("special")}
          {t("by")}
        </p>
      </div>
      <div className="flex lg:flex-nowrap flex-wrap dark:bg-primary-600 bg-[#A6E2FA] lg:px-16 md:px-8 px-4 lg:justify-between md:justify-between justify-center lg:gap-5 gap-4 lg:py-0 py-4">
        <div className="justify-center items-center ">
          <img
            src={dashboardUser}
            alt="dashboardUser"
            className="lg:w-96 lg:h-96 md:w-80 mg:h-80 h-72 w-72"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <h3 className="dark:text-text-des-dark-mode text-primary-950 lg:text-heading-3 md:text-heading-4 text-heading-5 text-center">
            {t("addmore")}
          </h3>
          <h4 className="dark:text-text-des-dark-mode text-primary-950 lg:text-heading-4 md:text-heading-5 text-heading-6 text-center">
            {t("startFree")}
          </h4>
          <p className="dark:text-text-des-dark-mode text-primary-950 lg:text-des-2 md:text-des-3 text-des-5 text-center">
            {t("skill")}
          </p>
        </div>
      </div>
      <div className="flex justify-center py-16">
        <div>
          <h2 className="dark:text-text-des-dark-mode lg:text-heading-2 md:text-heading-3 text-heading-4 text-center">
            {t("startWith")}
            <span className="text-accents-color">{t("fluentflow")}</span>
          </h2>
        </div>
      </div>
=======
    <div className="p-4 sm:ml-64 mt-[88px] h-[3000px]">
      <h1 className="dark:text-white text-black">This is for User View</h1>
>>>>>>> 213ff44c992cbbbcedcd14a36d4484ccb3555995
    </div>
  );
};

export default User;
