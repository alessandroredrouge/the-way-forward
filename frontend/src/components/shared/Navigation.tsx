import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Lightbulb,
  Radio,
  BookOpen,
  Boxes,
  UserCircle,
  Moon,
  Sun,
} from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";

const Navigation = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Ideas", icon: Lightbulb, href: "/ideas" },
    { name: "Podcast", icon: Radio, href: "/podcast" },
    { name: "Deep-dives", icon: BookOpen, href: "/deep-dives" },
    { name: "Resources", icon: Boxes, href: "/resources" },
    { name: "Profile", icon: UserCircle, href: "/profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img
              src="/src/assets/icons/The Way Forward - Logo Circular.svg"
              alt="Logo"
              className="h-8 w-8"
            />
            <Link
              to="/"
              className="text-xl font-bold text-black dark:text-white"
            >
              The Way Forward
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="ml-8 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-secondary transition-colors duration-200 flex items-center"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-8 p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="sm:hidden flex items-center">
            {/* Dark mode toggle for mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full mr-2"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            {/* Mobile menu button */}
            <button className="p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
