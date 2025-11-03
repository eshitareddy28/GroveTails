"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Menu from "./Menu";
import {
  Dog,
  Users,
  Moon,
  Sun,
  PawPrint,
  Heart,
  User,
  LogIn,
  LogOut,
} from "lucide-react";
import Bouncy from "./Bouncy";
import TooltipIcon from "./Tooltip";

const navItems = [
  { label: "Build Your Den", href: "/", icon: Dog },
  { label: "Shelters", href: "/shelters", icon: Users },
  { label: "Community", href: "/community", icon: Heart },
  { label: "My Den", href: "/my-den", icon: PawPrint },
];

const ICON_SIZE = 20; // uniform icon size

const Navbar = () => {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const isLoggedIn = true; // Replace with real auth logic

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const handleToggle = () => {
    const html = document.documentElement;
    const newDark = !dark;
    setDark(newDark);
    html.classList.toggle("dark", newDark);
  };

  return (
    <header className="h-20 w-full px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 flex items-center justify-between bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text shadow-md transition-colors duration-300">
      {/* LEFT: Logo */}
      <div className="flex items-center">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight flex items-center gap-2 whitespace-nowrap"
        >
          <span className="text-light-accent dark:text-dark-accent hover:text-light-primary dark:hover:text-dark-primary transition-colors">
            🐾 Grove
            <span className="text-light-primary dark:text-dark-primary hover:text-light-accent dark:hover:text-dark-accent transition-colors">
              Tails
            </span>
          </span>
        </Link>
      </div>

      {/* CENTER: Main Nav (hidden on mobile) */}
      <nav className="hidden md:flex gap-6 text-md font-medium items-center absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative group flex items-center gap-2 transition duration-150 ${
                isActive
                  ? "text-light-primary dark:text-dark-primary font-semibold"
                  : "text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
              } whitespace-nowrap`}
            >
              <Icon className="w-5 h-5" size={ICON_SIZE} />
              <span>{label}</span>
              <span
                className={`absolute left-0 -bottom-1 h-[2px] transition-all duration-300 ${
                  isActive
                    ? "w-full bg-light-primary dark:bg-dark-primary"
                    : "w-0 group-hover:w-full bg-light-primary dark:bg-dark-primary"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* RIGHT: Icons */}
      <div className="flex items-center gap-4 text-sm">
        <div className="hidden md:flex items-center gap-4">
          <Bouncy>
            <TooltipIcon label={dark ? "Light Mode" : "Dark Mode"}>
              <button
                onClick={handleToggle}
                className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                {dark ? (
                  <Sun className="w-5 h-5 mt-2" />
                ) : (
                  <Moon className="w-5 h-5 mt-2" />
                )}
              </button>
            </TooltipIcon>
          </Bouncy>

          {isLoggedIn ? (
            <>
              <Bouncy>
                <TooltipIcon href="/profile" icon={User} label="Profile" />
              </Bouncy>
              <Bouncy>
                <TooltipIcon href="/logout" icon={LogOut} label="Logout" />
              </Bouncy>
            </>
          ) : (
            <Bouncy>
              <TooltipIcon href="/login" icon={LogIn} label="Login / Sign Up" />
            </Bouncy>
          )}
        </div>

        {/* MOBILE: Hamburger Menu */}
        <div className="md:hidden">
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
