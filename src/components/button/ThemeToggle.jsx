import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/button/themeSlice";

import { useEffect, useState } from "react";
// import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="text-2xl text-white transition rounded-md bg-secondary-500 p-2"
    >
      {theme === "dark" ? (
        <MdOutlineLightMode className="text-white font-bold" />
      ) : (
        <MdOutlineDarkMode className="text-white font-bold" />
      )}
    </button>
  );
};

export default ThemeToggle;
