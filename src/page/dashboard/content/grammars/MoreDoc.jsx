import React from "react";
import { useTranslation } from "react-i18next";
import UserAnswers from "../../../test/UserAnswers";

const MoreDoc = () => {
  const { t } = useTranslation("dashboard");
  return (
    <div className="p-4 sm:ml-64  mt-[88px] h-[3000px]">
      {/* <h1 className="dark:text-white text-black">
        This Content of More Document
      </h1> */}
      <UserAnswers />
    </div>
  );
};

export default MoreDoc;
