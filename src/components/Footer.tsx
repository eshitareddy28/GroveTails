"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      setIsDark(html.classList.contains("dark"));
    }
  }, []);

  return (
    <footer className="py-6 px-4 md:px-8 lg:px-16 xl:px-16 2xl:px-32 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text text-sm mt-16 transition-all duration-300">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* LEFT */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <Link
            href="/"
            className="text-2xl font-bold text-light-accent dark:text-dark-accent hover:text-light-primary dark:hover:text-dark-primary"
          >
            🐾 GroveTails
          </Link>
          <p className="text-light-text dark:text-dark-text">
            Your trusted companion for finding loving furry friends.
          </p>
          <p className="font-medium text-light-primary dark:text-dark-primary">
            contact@grovetails.com
          </p>
          <p className="font-medium text-light-primary dark:text-dark-primary">
            +1 (555) 987-6543
          </p>

          <div className="flex gap-6">
            <Image
              src="/facebook.png"
              alt="Facebook"
              width={16}
              height={16}
              className="filter dark:invert"
            />
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={16}
              height={16}
              className="filter dark:invert"
            />
            <Image
              src="/youtube.png"
              alt="YouTube"
              width={16}
              height={16}
              className="filter dark:invert"
            />
            <Image
              src="/pinterest.png"
              alt="Pinterest"
              width={16}
              height={16}
              className="filter dark:invert"
            />
            <Image
              src="/x.png"
              alt="X (Twitter)"
              width={16}
              height={16}
              className="filter dark:invert"
            />
          </div>
        </div>

        {/* CENTER */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <h2 className="font-semibold text-lg text-light-primary dark:text-dark-primary">
            Discover
          </h2>
          <Link
            href="/build-your-den"
            className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
          >
            Build Your Den
          </Link>
          <Link
            href="/shelters"
            className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
          >
            Shelters
          </Link>
          <Link
            href="/community"
            className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
          >
            Community
          </Link>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <h2 className="font-semibold text-lg text-light-primary dark:text-dark-primary">
            Subscribe
          </h2>
          <p className="text-light-text dark:text-dark-text">
            Get heartwarming stories and adoption tips in your inbox.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 w-3/4 text-sm rounded-l-md border border-light-muted dark:border-dark-muted bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
            />
            <button className="w-1/4 bg-light-primary dark:bg-dark-primary text-white rounded-r-md text-sm hover:opacity-90 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-light-muted dark:text-dark-muted mt-12 pt-4 border-t border-light-muted dark:border-dark-muted">
        <p>
          © {new Date().getFullYear()} GroveTails – Connecting Paws with Hearts
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <span>United States | English</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
