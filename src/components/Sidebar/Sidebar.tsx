import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaWallet,
  FaCog,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { useDarkMode } from "../../contexts/DarkModeContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 640;
      setIsSmallScreen(smallScreen);

      // Reset sidebar state when transitioning from small to large screens
      if (!smallScreen) {
        setIsOpen(true); // Sidebar should always start open in large screen mode
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { to: "/dashboard", icon: <FaHome />, label: "Dashboard" },
    { to: "/transactions", icon: <FaWallet />, label: "Transactions" },
    { to: "/settings", icon: <FaCog />, label: "Settings" },
    {
      to: "/",
      icon: <FaSignOutAlt className="text-red-500" />,
      label: "Logout",
    },
  ];

  return (
    <div
      className={`${
        isSmallScreen
          ? `${isOpen ? "h-72" : "h-10"} w-full top-0 fixed z-50`
          : `${isOpen ? "w-64" : "w-16"} h-screen`
      }
                transition-all duration-300 
                ${
                  isDarkMode
                    ? "bg-gray-900 text-gray-200"
                    : "bg-gray-800 text-white"
                }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 focus:outline-none w-full 
                    ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-600"} 
                    flex justify-center items-center`}
      >
        {isSmallScreen ? (
          isOpen ? (
            <FaChevronUp className="text-2xl" />
          ) : (
            <FaChevronDown className="text-2xl" />
          )
        ) : isOpen ? (
          <FaChevronLeft className="text-2xl" />
        ) : (
          <FaChevronRight className="text-2xl" />
        )}
      </button>

      {/* Menu Items */}
      {(!isSmallScreen || isOpen) && ( // Render menu items when in large screen or when open in small screen
        <ul
          className={`flex ${isSmallScreen ? "flex-col" : "flex-1 flex-col"}`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className="w-full">
              <Link
                to={item.to}
                className={`flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                }
                                    p-2 w-full hover:bg-gray-700 transition duration-200`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span className="ml-4">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Dark Mode Toggle */}
      {(!isSmallScreen || isOpen) && ( // Render dark mode toggle when in large screen or when open in small screen
        <div className="p-4 mt-auto">
          <button
            onClick={toggleDarkMode}
            className={`flex justify-center items-center p-2 w-full rounded-md bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 hover:bg-blue-700 transition duration-200`}
          >
            {isDarkMode ? (
              <>
                <FaSun className="text-xl" />
                {isOpen && <span className="ml-4">Light Mode</span>}
              </>
            ) : (
              <>
                <FaMoon className="text-xl" />
                {isOpen && <span className="ml-4">Dark Mode</span>}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
