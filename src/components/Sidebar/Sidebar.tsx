import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaHome, FaWallet, FaCog, FaSignOutAlt, FaSun, FaMoon, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDarkMode } from '../../contexts/DarkModeContext';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { isDarkMode, toggleDarkMode } = useDarkMode();
   
    return (
        <div
            className={`sidebar ${isOpen ? 'w-64' : 'w-16'
                } h-screen transition-all duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-800 text-white'
                }`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 focus:outline-none w-full 
                    ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-600'} 
                    flex justify-center items-center`}
            >
                {isOpen ? (
                    <FaChevronLeft className="text-2xl" />
                ) : (
                    <FaChevronRight className="text-2xl" />
                )}
            </button>

            <ul className="flex-1">
                {[{ to: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
                { to: '/transactions', icon: <FaWallet />, label: 'Transactions' },
                { to: '/settings', icon: <FaCog />, label: 'Settings' },
                { to: '/', icon: <FaSignOutAlt className="text-red-500" />, label: 'Logout' }
                ].map((item, index) => (
                    <li key={index} className="w-full">
                        <Link
                            to={item.to}
                            className={`flex items-center justify-${isOpen ? 'start' : 'center'}
                                p-2 w-full hover:bg-gray-700 transition duration-200`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {isOpen && <span className="ml-4">{item.label}</span>}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className='p-4 mt-auto'>
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
        </div>
    );
};

export default Sidebar;