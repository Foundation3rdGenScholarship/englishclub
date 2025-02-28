import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonLanguage from "../button/ButtonLanguage";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { NavLink, Link } from "react-router"; // Fixed import
import ThemeToggle from "../button/ThemeToggle";
import { useSelector } from "react-redux";
import ButtonRegister from "../button/ButtonRegister";

export default function Navbar() {
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux store

  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("navbar");
  const [isScrolled, setIsScrolled] = useState(false);
  const getTheme = localStorage.getItem("theme");

  console.log(theme);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.05); // 5% of viewport height
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = [
    { title: t("courses"), path: "/dashboard" },
    { title: t("about"), path: "/about" },
    { title: t("contact"), path: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-20 transition-all duration-300 ${
        isScrolled ? "dark:bg-white/5 backdrop-blur-[18px]" : "bg-transparent"
      } `}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-5">
          <NavLink to="/">
            <img
              src={theme === "dark" ? `${logodarkmode}` : `${logolightmode}`}
              alt="Logo"
              className="w-40"
            />
          </NavLink>

          {/* Navigation for large screens */}
          <nav className="hidden md:flex gap-6 text-heading-5">
            {menu.map((item) => (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary-500 transition"
                    : "text-black dark:text-white transition "
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:block">
            <ButtonLanguage />
          </div>
          <Link
            className="hidden md:flex rounded-md bg-secondary-500 px-4 py-1.5 text-heading-6 text-black transition font-semibold"
            to="/login"
          >
            {t("register")}
          </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-md bg-secondary-500 p-2.5 text-black transition"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } dark:bg-white/5 backdrop-blur-[18px] absolute w-full left-0 top-20 transition-all duration-300`}
      >
        <ul className="flex flex-col items-left gap-6 text-heading-6 p-4">
          {menu.map((item) => (
            <li key={item.title}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary-500 transition"
                    : "text-black dark:text-white transition "
                }
                to={item.path}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
          <div className="flex items-center justify-between">
            <li className="mt-1 flex gap-2 items-center justify-center">
              <ButtonLanguage />
            </li>
            <li>
              <ButtonRegister/>
            </li>
          </div>
        </ul>
      </div>
    </header>
  );
}
