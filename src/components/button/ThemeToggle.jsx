import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {toggleTheme} from "../../redux/features/button/themeSlice"

import { useEffect } from "react";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="text-2xl text-white transition rounded-md bg-secondary-600 p-2"
    >
      {theme === "dark" ? (
        <MdOutlineLightMode className="text-black font-bold" />
      ) : (
        <MdOutlineDarkMode className="text-black font-bold" />
      )}
    </button>
  );
};

export default ThemeToggle;
