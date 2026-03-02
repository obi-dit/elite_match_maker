"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, User, LogIn, Crown, LogOut, Settings } from "lucide-react";
import { useAuthStore, isAdmin } from "@/store/authStore";
import { handleAuthError } from "@/utils/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const goBackToHome = () => {
    window.location.href = "/";
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      });

      if (!response.ok) {
        handleAuthError(response);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      setIsOpen(false);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "!bg-transparent shadow-none border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div
              onClick={goBackToHome}
              className="cursor-pointer flex-shrink-0"
            >
              <Image
                src="/logo/logo.jpg"
                width={isScrolled ? 100 : 120}
                height={isScrolled ? 32 : 40}
                alt="Elite Match Maker"
                className="rounded-full transition-all duration-300"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/member-dashboard"
                    className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isScrolled
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white hover:text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  {isAdmin() && (
                    <Link
                      href="/admin"
                      className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                        isScrolled
                          ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                          : "text-white hover:text-gray-200 hover:bg-white/10"
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  )}
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-medium ${
                        isScrolled ? "text-gray-600" : "text-white/80"
                      }`}
                    >
                      Welcome,
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        isScrolled ? "text-gray-600" : "text-white/80"
                      }`}
                    >
                      {user?.firstName || user?.fullName || "User"}
                    </span>
                    <button
                      onClick={handleLogout}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                        isScrolled
                          ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                          : "text-white hover:text-gray-200 hover:bg-white/10"
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isScrolled
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white hover:text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/become-member"
                    className="px-3 lg:px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-[#bfa521] to-[#d4b82a] hover:from-[#d4b82a] hover:to-[#bfa521] text-white shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Become a Member</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div
              className={`px-4 py-6 space-y-2 border-t transition-all duration-300 ${
                isScrolled
                  ? "bg-white/95 backdrop-blur-md border-gray-200"
                  : "bg-black/90 backdrop-blur-md border-white/20"
              }`}
            >
              {isAuthenticated ? (
                <>
                  <div
                    className={`px-4 py-2 text-sm font-medium ${
                      isScrolled ? "text-gray-500" : "text-white/70"
                    }`}
                  >
                    Welcome, {user?.firstName || user?.fullName || "User"}
                  </div>
                  <Link
                    href="/member-dashboard"
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-3 ${
                      isScrolled
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white hover:text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-3 ${
                      isScrolled
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white hover:text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-3 ${
                      isScrolled
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        : "text-white hover:text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/become-member"
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-[#bfa521] to-[#d4b82a] hover:from-[#d4b82a] hover:to-[#bfa521] text-white shadow-lg flex items-center space-x-3"
                  >
                    <Crown className="w-5 h-5" />
                    <span>Become a Member</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      {/* <div className="h-16 lg:h-20"></div> */}
    </>
  );
};

export default Navbar;
