import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Lightbulb,
  Radio,
  BookOpen,
  Boxes,
  UserCircle,
} from "lucide-react";

const Navigation = () => {
  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Ideas", icon: Lightbulb, href: "/ideas" },
    { name: "Podcast", icon: Radio, href: "/podcast" },
    { name: "Deep-dives", icon: BookOpen, href: "/deep-dives" },
    { name: "Resources", icon: Boxes, href: "/resources" },
    { name: "Profile", icon: UserCircle, href: "/profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-black">
              The Way Forward
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="ml-8 text-sm font-medium text-gray-900 hover:text-secondary transition-colors duration-200 flex items-center"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="sm:hidden">
            {/* Mobile menu button */}
            <button className="p-2 rounded-md text-gray-900 hover:bg-gray-100">
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
