// Import necessary React functions
import React, { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ Create a Context object for the theme
// This allows us to share the theme state (dark/light) across the entire app.
const ThemeContext = createContext();

// 2️⃣ Create the ThemeProvider component that will wrap the app
export const ThemeProvider = ({ children }) => {
  // State to track whether dark mode is active or not
  const [darkMode, setDarkMode] = useState(false);

  // 3️⃣ On first render, check localStorage for a saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "true") setDarkMode(true); // if true → enable dark mode
  }, []); // run once on mount

  // 4️⃣ Whenever darkMode changes:
  // - Save the new value to localStorage so it persists on refresh
  // - Update the <body> class to apply global CSS styling
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode); // persist user preference
    document.body.className = darkMode ? "dark-theme" : "light-theme"; // apply theme class
  }, [darkMode]);

  // 5️⃣ Function to toggle between dark and light mode
  const toggleTheme = () => setDarkMode((prev) => !prev);

  // 6️⃣ Provide the darkMode value and toggle function to all child components
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 7️⃣ Custom hook to easily access the theme context from any component
export const useTheme = () => useContext(ThemeContext);
