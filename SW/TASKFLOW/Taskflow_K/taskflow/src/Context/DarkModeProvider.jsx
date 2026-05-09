import React, { createContext, useContext, useState } from "react";
import { ConfigProvider, theme } from "antd";

const ThemeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const currentAlgorithm = isDarkMode
    ? theme.darkAlgorithm
    : theme.defaultAlgorithm;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: currentAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

// custom hook
export const useTheme = () => useContext(ThemeContext);
