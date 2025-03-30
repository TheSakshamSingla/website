"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSearch, FiUser, FiLogIn, FiLogOut, FiUpload, FiPackage, FiMessageSquare, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Modules", href: "/modules" },
    { name: "Forum", href: "/forum" },
    { name: "Tutorials", href: "/tutorials" },
    { name: "About", href: "/about" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
      setIsProfileMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // Toggle mobile menu
  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  // Toggle profile menu
  const toggleProfileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle sign out
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-surface/95 backdrop-blur md-elevation-2" : "bg-surface"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Root Things Logo"
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-primary">Root Things</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative px-1 py-2 font-medium transition-colors ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Side - Search, Theme Toggle, Auth */}
          <div className="flex items-center space-x-2">
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 rounded-full border border-outline-variant bg-surface-variant px-4 py-1 pr-8 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary lg:w-60"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
              >
                <FiSearch className="h-4 w-4" />
              </button>
            </form>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-variant hover:text-primary"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
              </button>
            )}

            {/* Auth Buttons */}
            {session ? (
              <div className="relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 rounded-full text-on-surface-variant hover:text-primary"
                >
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-outline-variant">
                    <Image
                      src={session.user?.image || "/images/default-avatar.jpg"}
                      alt={session.user?.name || "User"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-outline-variant bg-surface p-2 shadow-lg md-elevation-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="mb-2 border-b border-outline-variant pb-2">
                        <p className="px-3 py-1 font-medium">{session.user?.name}</p>
                        <p className="px-3 py-1 text-sm text-on-surface-variant">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left text-sm hover:bg-surface-variant"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <FiUser className="h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/upload"
                        className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left text-sm hover:bg-surface-variant"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <FiUpload className="h-4 w-4" />
                        <span>Upload Module</span>
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left text-sm text-error hover:bg-error-container hover:text-on-error-container"
                      >
                        <FiLogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden items-center space-x-2 md:flex">
                <Link
                  href="/auth/login"
                  className="rounded-full px-4 py-1 text-sm font-medium text-primary hover:bg-primary-container hover:text-on-primary-container"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-on-primary hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-variant hover:text-primary md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-outline-variant bg-surface md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search modules, scripts, kernels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-outline-variant bg-surface-variant px-4 py-2 pr-10 text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
                  >
                    <FiSearch className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="mb-4">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`block rounded-lg px-4 py-2 font-medium ${
                          pathname === link.href
                            ? "bg-primary-container text-on-primary-container"
                            : "text-on-surface hover:bg-surface-variant"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Quick Links */}
              <div className="mb-4 border-t border-outline-variant pt-4">
                <h3 className="mb-2 px-4 text-sm font-medium text-on-surface-variant">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/modules"
                      className="flex items-center space-x-2 rounded-lg px-4 py-2 text-on-surface hover:bg-surface-variant"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiPackage className="h-5 w-5" />
                      <span>Browse Modules</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/forum"
                      className="flex items-center space-x-2 rounded-lg px-4 py-2 text-on-surface hover:bg-surface-variant"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiMessageSquare className="h-5 w-5" />
                      <span>Community Forum</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/upload"
                      className="flex items-center space-x-2 rounded-lg px-4 py-2 text-on-surface hover:bg-surface-variant"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUpload className="h-5 w-5" />
                      <span>Upload Module</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Mobile Auth Buttons */}
              {!session ? (
                <div className="flex space-x-2 border-t border-outline-variant pt-4">
                  <Link
                    href="/auth/login"
                    className="flex-1 rounded-lg border border-primary px-4 py-2 text-center font-medium text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FiLogIn className="h-5 w-5" />
                      <span>Log In</span>
                    </div>
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-center font-medium text-on-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <FiUser className="h-5 w-5" />
                      <span>Sign Up</span>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="border-t border-outline-variant pt-4">
                  <div className="mb-4 flex items-center space-x-3 px-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-outline-variant">
                      <Image
                        src={session.user?.image || "/images/default-avatar.jpg"}
                        alt={session.user?.name || "User"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="text-sm text-on-surface-variant">{session.user?.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 rounded-lg px-4 py-2 text-on-surface hover:bg-surface-variant"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="mt-2 flex w-full items-center space-x-2 rounded-lg px-4 py-2 text-error hover:bg-error-container hover:text-on-error-container"
                  >
                    <FiLogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}

              {/* Theme Toggle (Mobile) */}
              {mounted && (
                <div className="mt-4 flex items-center justify-between border-t border-outline-variant px-4 pt-4">
                  <span className="text-sm font-medium">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 rounded-full bg-surface-variant px-3 py-1 text-on-surface-variant"
                  >
                    {theme === "dark" ? (
                      <>
                        <FiSun className="h-4 w-4" />
                        <span className="text-sm">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <FiMoon className="h-4 w-4" />
                        <span className="text-sm">Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
