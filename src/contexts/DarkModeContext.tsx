import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  getInitialDarkMode,
  setDarkModeInLocalStorage,
} from "../utilities/darkModeUtil"; // Import the utility functions

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialDarkMode()); // Use utility function

  useEffect(() => {
    setDarkModeInLocalStorage(isDarkMode); //S Use utility function
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  return context;
};
