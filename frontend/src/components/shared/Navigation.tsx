import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Lightbulb,
  UserCircle,
  Moon,
  Sun,
  Menu,
  X,
  Users,
  BookOpen,
  Globe,
  LogOut,
} from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  const { authState, signOut, isAuthenticated, isCurator } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Define navigation items - some are conditional based on auth status
  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Challenges", icon: Globe, href: "/challenges" },
    { name: "Ideas", icon: Lightbulb, href: "/ideas" },
    { name: "Knowledge Hub", icon: BookOpen, href: "/knowledge-hub" },
    // Community is only for authenticated users
    ...(isAuthenticated()
      ? [{ name: "Community", icon: Users, href: "/community" }]
      : []),
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img
              src="/src/assets/icons/The Way Forward - New Logo Basic NO Writing.svg"
              alt="Logo"
              className="h-8 w-8"
            />
            <Link
              to="/"
              className="text-xl font-bold text-black dark:text-white"
            >
              <span className="font-bold text-[#4c77f6]">the way</span>{" "}
              <span className="font-bold text-[#ffbd59]">forward</span>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`ml-8 text-sm font-medium transition-colors duration-200 flex items-center ${
                  isActiveRoute(item.href)
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            ))}

            {/* Dark mode toggle */}
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

            {/* Authentication UI */}
            {isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="ml-4 relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                          authState.profile?.full_name || "User"
                        }`}
                        alt={authState.profile?.full_name || "User"}
                      />
                      <AvatarFallback>
                        {authState.profile
                          ? getInitials(authState.profile.full_name)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {authState.profile?.full_name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {authState.profile?.email}
                      </p>
                      {isCurator() && (
                        <Badge className="mt-1 w-fit">Curator</Badge>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <UserCircle className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  {isCurator() && (
                    <DropdownMenuItem
                      onClick={() => navigate("/knowledge-hub/admin")}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Knowledge Hub Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                variant="default"
                className="ml-4"
              >
                Sign In
              </Button>
            )}
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

            {/* Auth button for mobile */}
            {isAuthenticated() ? (
              <Button
                variant="ghost"
                className="mr-2 relative h-8 w-8 rounded-full"
                onClick={() => navigate("/profile")}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${
                      authState.profile?.full_name || "User"
                    }`}
                    alt={authState.profile?.full_name || "User"}
                  />
                  <AvatarFallback>
                    {authState.profile
                      ? getInitials(authState.profile.full_name)
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                variant="default"
                size="sm"
                className="mr-2"
              >
                Sign In
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute(item.href)
                      ? "text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800"
                      : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}

              {/* Profile link for authenticated users */}
              {isAuthenticated() && (
                <Link
                  to="/profile"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute("/profile")
                      ? "text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800"
                      : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserCircle className="w-5 h-5 mr-3" />
                  Profile
                </Link>
              )}

              {/* Sign out button for authenticated users */}
              {isAuthenticated() && (
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
