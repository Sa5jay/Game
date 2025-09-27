import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800  dark:text-gray-200 transition-colors"
    >
      {darkMode ? <FaSun color="#E50914" /> : <FaMoon color="#E50914" />}
    </button>
  );
};

export default ThemeToggle;
