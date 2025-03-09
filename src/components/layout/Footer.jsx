import { useSelector } from "react-redux";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import istadLogoLight from "../../../public/img/logo/istad-logo-light.webp";
import istadLogoDark from "../../../public/img/logo/istad-logo-dark.png";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const theme = useSelector((state) => state.theme.theme);
  const { t } = useTranslation("footer");
  return (
    <footer className="bg-[#f1f5f9] dark:bg-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-2 sm:grid-cols-2 justify-items-center gap-4">
          {/* Logo */}
          <div className="flex flex-col items-center text-center col-span-2 pb-2">
            <img
              src={theme === "dark" ? logodarkmode : logolightmode}
              alt="Logo"
              className="w-48 mb-6"
            />
            <p className="text-text-des-light-mode dark:text-text-des-dark-mode">
              <span className="text-primary-500 dark:text-white font-bold">
                FluentFlow
              </span>{" "}
              {t("isTheBest")}
            </p>
          </div>
          {/* Contents */}
          <div className="flex flex-col items-center text-center ">
            <h5 className="text-heading-5 font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode">
              {t("contents")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode ">
              <li>
                <a href="">{t("home")}</a>
              </li>
              <li>
                <a href="">{t("courses")}</a>
              </li>
              <li>
                <a href="">{t("about")}</a>
              </li>
              <li>
                <a href="">{t("contact")}</a>
              </li>
            </ul>
          </div>
          {/* Skills */}
          <div className="flex flex-col  items-center text-center">
            <h5 className="text-xl font-bold mb-6  text-text-des-light-mode dark:text-text-des-dark-mode">
              {t("skills")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode ">
              <li>
                <a href="">{t("listening")}</a>
              </li>
              <li>
                <a href="">{t("reading")}</a>
              </li>
              <li>
                <a href="">{t("writing")}</a>
              </li>
              <li>
                <a href="">{t("speaking")}</a>
              </li>
            </ul>
          </div>
          {/* Grammar */}
          <div className="flex flex-col  items-center text-center">
            <h5 className="text-xl font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode">
              {t("grammar")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode ">
              <li>
                <a href="">A1 - A2</a>
              </li>
              <li>
                <a href="">B1 - B2</a>
              </li>
              <li>
                <a href="">C1</a>
              </li>
            </ul>
          </div>
          {/* Vocabulary */}
          <div className="flex flex-col items-center text-center">
            <h5 className="text-xl font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode">
              {t("vocabulary")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode ">
              <li>
                <a href="">A1 - A2</a>
              </li>
              <li>
                <a href="">B1 - B2</a>
              </li>
              <li>
                <a href="">C1</a>
              </li>
            </ul>
          </div>
          {/* Organize */}
          <div className="col-span-2 flex flex-col  justify-center items-center text-center">
            {/* ISTAD */}
            <div className="mb-12">
              <h5 className="text-xl font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode">
                {t("organizeBy")}
              </h5>
              <img
                className="w-40"
                src={theme === "dark" ? istadLogoDark : istadLogoLight}
                alt="ISTAD Logo"
              />
            </div>
            {/* NEWS LETTER */}
            {/* <div>
              <h5 className="text-xl font-bold mb-6 text-text-des-light-mode dark:text-text-des-dark-mode">
                News letter
              </h5>
              <input
                className="bg-[#f1f5f9] placeholder-text-des-light-mode dark:placeholder-text-des-dark-mode placeholder:text-left text-sm xl:pl-4 lg:pl-4 md:pl-4 sm:pl-4 pl-2  border-text-des-light-mode dark:border-text-des-dark-mode w-60"
                placeholder="Enter your email address"
                type="text"
              />
            </div> */}
          </div>
        </div>
        <hr className="bg-text-des-light-mode dark:bg-text-des-dark-mode my-8 border-0 h-px" />
        <div className="text-center">
          <p className="text-text-des-light-mode dark:text-text-des-dark-mode">
            &copy; 2025 Copyright <a href="#">FluentFlow</a> by{" "}
            <a href="https://www.cstad.edu.kh/">ISTAD</a> .All rights reserved.™
          </p>
        </div>
      </div>
    </footer>
  );
}
