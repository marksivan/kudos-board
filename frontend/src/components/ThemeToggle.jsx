import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
