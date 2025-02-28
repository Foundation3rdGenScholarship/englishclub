import React from "react";
import { useTranslation } from "react-i18next";

export default function Section2() {
  const { t } = useTranslation("dashboard-overview");
  return (
    <>
      <div>
        <p className="dark:text-text-des-dark-mode text-primary-800  lg:text-heading-4 md:text-heading-6 flex justify-center lg:py-16 sm:py-8 py-4 text-center">
          {t("whatYouFindHere")}
          {t("special")}
          {t("by")}
        </p>
      </div>
    </>
  );
}
