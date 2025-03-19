import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import education from "../../../public/svg/vission.svg";
export default function VissionCard() {
  const { t } = useTranslation("about");

  return (
    <>
      <section class="py-1 sm:py-16 lg:py-16 px-10">
        <div class="mx-auto">
          <div class="grid items-center grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-20">
            <p class="mt-4 text-des-2 leading-relaxed dark:text-text-des-dark-mode text-text-des-light-mode">
              {t("vision-description")}
            </p>
            <div class="relative pl-20 pr-6 sm:pl-6 md:px-0">
              <div class="relative w-full max-w-4xl mt-4 mb-10 ml-auto">
                <img class="ml-auto" src={education} alt="" />

                <img
                  class="absolute -top-4 -left-12"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/features/1/wavey-lines.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
