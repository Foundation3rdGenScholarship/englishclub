import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";


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

  return (
    <button
      onClick={toggleTheme}
      className="text-2xl text-white transition rounded-md bg-secondary-600  p-2"
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
