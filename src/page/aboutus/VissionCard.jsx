import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import education from "../../../public/svg/vission.svg";
export default function VissionCard() {
  const { t } = useTranslation("about");

  return (
    <>
      <section
        className="py-1 sm:py-16 lg:py-16 px-10"
        data-aos="zoom-out-right"
      >
        <div className="mx-auto">
          <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-20">
            {/* Text Section */}
            <div>
              <h1 className="text-2xl font-bold text-secondary-500">
                {t("ourvision")}
              </h1>
              <p className="mt-4 text-des-2 leading-relaxed dark:text-text-des-dark-mode text-text-des-light-mode">
                {t("vision-description")}
              </p>
            </div>

            {/* Image Section */}
            <div className="relative w-full flex justify-center">
              <img
                className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain"
                src={education}
                alt="education"
              />
              <img
                className="absolute -top-4 -left-12"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/features/1/wavey-lines.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
