import React from "react";
import { useTranslation } from "react-i18next";
const Categories = () => {
    const { t } = useTranslation("homepage");
  return (

    <>
      <div className="flex items-center justify-center ">
        <div className="bg-white dark:bg-transparent rounded-lg shadow-md p-6 flex justify-around w-full">
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500">23</p>
            <p className="text-lg text-black dark:text-white">{t("ca-student")}</p>
          </div>
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500">219</p>
            <p className="text-lg text-black dark:text-white">{t("ca-lesson")}</p>
          </div>
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500">56</p>
            <p className="text-lg text-black dark:text-white">{t("ca-exercise")}</p>
          </div>
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500">40</p>
            <p className="text-lg text-black dark:text-white">{t("ca-videos")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
