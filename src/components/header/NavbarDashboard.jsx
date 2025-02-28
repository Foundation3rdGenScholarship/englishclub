import logolightmode from "./../../../public/img/logo/logo-light-mode.png";
import logoDarkMode from "./../../../public/img/logo/logo-dark-mode.png";
import Profile from "../button/Profile";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import SearchBar from "../search/SearchBar";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "../button/ThemeToggle";
import ButtonLanguage from "../button/ButtonLanguage";
import ButtonRegister from "../button/ButtonRegister";
import { toggle } from "../../redux/features/user/visibilitySlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme); // Get theme from Redux store
  const { t } = useTranslation("dashboard");
  // use RTK to handle toggle

  const isVisible = useSelector((state) => state.visibility.isVisible);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 dark:bg-white/5 backdrop-blur-[18px]">
      <div className="px-3 py-2 lg:px-5 lg:pl-3 flex items-center justify-between">
        {/* Left Sidebar */}
        <div className="flex items-center w-64">
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => dispatch(toggle())}
            type="button"
            className="inline-flex items-center p-2 text-black rounded-md sm:hidden bg-secondary-600"
          >
            <span className="sr-only">Open sidebar</span>
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          {/* Logo */}
          <NavLink to="/" className="ms-2 sm:w-64">
            <img
              src={theme === "dark" ? `${logoDarkMode}` : `${logolightmode}`}
              alt="Logo"
              className="w-40"
            />
          </NavLink>
        </div>
        {/* Right Sidebar */}
        <div className="flex items-center gap-5 w-full justify-between">
          <SearchBar />
          <div className="flex items-center gap-4">
            <div className="sm:flex items-center gap-4 hidden">
              <ButtonLanguage className={""} />
              <ThemeToggle />
            </div>
            {/* <Profile /> */}
            <ButtonRegister />
          </div>
        </div>
      </div>
    </nav>
  );
}
