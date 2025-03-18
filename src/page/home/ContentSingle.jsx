import React from "react";
import senior from "../../../public/img/image/senior-photo.png";
import staralign from "../../../public/svg/staralign.svg";
import { useTranslation } from "react-i18next";
import ButtonNavigate from "../../components/button/ButtonNavigate";
import { NavLink } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const ContentSingle = () => {
  const { t } = useTranslation("homepage");
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <div class="bg-primary-50 dark:bg-transparent flex items-center justify-center pb-12 mt-20">
        <div class="max-w-6xl mx-auto p-6 gap-6  rounded-lg flex flex-col md:flex-row items-center">
          <div class="relative w-full md:w-1/2 flex flex-col">
            <img
              src={staralign}
              class="mb-[-190px] md:mb-[-180px] sm:mb-[-300px] lg:mb-[-280px] -ml-2 md:-ml-2 sm:ml-2 self-start"
            />
            <div class="w-full h-full -ml-3 sm:ml-8 md:-ml-2 lg:ml-1 pt-4 pl-8">
              <img
                data-aos="fade-right"
                height="500"
                src="../../../public/img/image/FluentFlowTeam.jpg"
                width="480"
                class="object-cover rounded-[18%]"
                data-aos-duration="600"
              />
            </div>
          </div>

          <div
            class="w-full md:w-1/2 text-center md:text-left pt-16"
            data-aos="fade-left"
            data-aos-duration="600"
          >
            <p class="xl:text-heading-3 lg:text-heading-4 md:text-heading-5 text-heading-5 font-bold text-black dark:text-white mb-4">
              {t("title-section-content")}
              <span class="text-primary-500">
                {t("title-section-content-one")}{" "}
              </span>
              {t("title-section-content-two")}
            </p>
            <p class="xl:text-heading-5 lg:text-heading-5 md:text-heading-6 text-[14px] text-gray-500 dark:text-gray-400 mb-6">
              {t("des-section-content")}
            </p>
            {/* <NavLink
              to="/Register"
              className="inline-block bg-secondary-500 text-white text-lg font-semibold py-3 px-6 rounded-full hover:bg-secondary-800 transition duration-300"
            >
              {t("btn-sign")}
            </NavLink> */}
            <ButtonNavigate
              text={t("btn-sign")}
              link={"/Register"}
              addMoreStyle="xl:text-heading-6 lg:text-heading-6 md:text-heading-6 text-[14px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ContentSingle;
