import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { AiOutlineMail } from "react-icons/ai";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import istadLogoLight from "../../../public/img/logo/istad-logo-light.png";
import istadLogoDark from "../../../public/img/logo/istad-logo-dark.png";

export default function Footer() {
  const theme = useSelector((state) => state.theme.theme);
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-[#f1f5f9] dark:bg-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-y-8 gap-x-4">
          {/* Logo Section - Full width on mobile, 2 cols on larger screens */}
          <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-center lg:items-start">
            <img
              src={theme === "dark" ? logodarkmode : logolightmode}
              alt="Logo"
              className="w-40 md:w-44 lg:w-48 mb-4"
            />
            <p className="text-text-des-light-mode dark:text-text-des-dark-mode text-center lg:text-left text-sm md:text-base">
              <span className="text-primary-500 dark:text-white font-bold">
                FluentFlow
              </span>{" "}
              {t("isTheBest")}
            </p>
          </div>

          {/* Contents Section */}
          <div className="flex flex-col">
            <h5 className="text-lg font-bold mb-3 md:mb-4 text-text-des-light-mode dark:text-text-des-dark-mode text-center lg:text-left">
              {t("contents")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode text-center lg:text-left text-sm md:text-base">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  {t("home")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/courses"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  {t("courses")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  {t("about")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  {t("contact")}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Skills Section */}
          <div className="flex flex-col">
            <h5 className="text-lg font-bold mb-3 md:mb-4 text-text-des-light-mode dark:text-text-des-dark-mode text-center lg:text-left">
              {t("skills")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode text-center lg:text-left text-sm md:text-base">
              <li>
                <NavLink
                  to="/listening"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  {t("listening")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reading"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  {t("reading")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/writing"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  {t("writing")}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/speaking"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  {t("speaking")}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Grammar Section */}
          <div className="flex flex-col">
            <h5 className="text-lg font-bold mb-3 md:mb-4 text-text-des-light-mode dark:text-text-des-dark-mode text-center lg:text-left">
              {t("grammar")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode text-center lg:text-left text-sm md:text-base">
              <li>
                <NavLink
                  to="/a1a2grammar"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  A1 - A2
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/b1b2grammar"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  B1 - B2
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/c1grammar"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  C1
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Vocabulary Section */}
          <div className="flex flex-col">
            <h5 className="text-lg font-bold mb-3 md:mb-4 text-text-des-light-mode dark:text-text-des-dark-mode text-center lg:text-left">
              {t("vocabulary")}
            </h5>
            <ul className="space-y-2 text-text-des-light-mode dark:text-text-des-dark-mode text-center lg:text-left text-sm md:text-base">
              <li>
                <NavLink
                  to="/a1a2vocabulary"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  A1 - A2
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/b1b2vocanulary"
                  className="hover:text-primary-500 transition-colors duration-200"
                >
                  B1 - B2
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Organize Section - Full width on mobile, 2 cols on larger screens */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 flex flex-col items-center">
            <h5 className="text-lg font-bold mb-3 md:mb-4 text-text-des-light-mode dark:text-text-des-dark-mode text-center">
              {t("organizeBy")}
            </h5>
            <img
              className="w-32 md:w-36 lg:w-40"
              src={theme === "dark" ? istadLogoDark : istadLogoLight}
              alt="ISTAD Logo"
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="bg-text-des-light-mode dark:bg-text-des-dark-mode my-6 md:my-8 border-0 h-px opacity-30" />

        {/* Copyright Section */}
        <div className="text-center">
          <p className="text-text-des-light-mode dark:text-text-des-dark-mode text-sm md:text-base">
            &copy; 2025 FluentFlow {t("by")}{" "}
            <a
              href="https://www.cstad.edu.kh/"
              className="hover:text-primary-500 transition-colors duration-200"
            >
              ISTAD{t(".")}
            </a>{" "}
            {t("allRights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
