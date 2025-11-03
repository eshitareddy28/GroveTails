"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon, X } from "lucide-react";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="text-light-primary dark:text-dark-primary"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        {open ? <X size={28} /> : <MenuIcon size={28} />}
      </button>

      {open && (
        <div className="absolute bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10 border-t border-light-muted dark:border-dark-muted">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          >
            Build Your Den
          </Link>
          <Link
            href="/shelters"
            onClick={() => setOpen(false)}
            className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          >
            Shelters
          </Link>
          <Link
            href="/community"
            onClick={() => setOpen(false)}
            className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          >
            Community
          </Link>
          <Link
            href="/my-den"
            onClick={() => setOpen(false)}
            className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          >
            My Den
          </Link>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          >
            Profile
          </Link>
          <Link
            href="/logout"
            onClick={() => setOpen(false)}
            className="hover:text-light-primary dark:hover:text-dark-primary transition-colors"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
