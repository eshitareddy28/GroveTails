import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PageHeader } from "@/components/PageHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GroveTails - Find Your Furry Friend",
  description:
    "A cozy dog adoption platform connecting pets with loving homes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text transition-colors duration-300`}
      >
        {/* Fixed height viewport layout */}
        <div className="h-screen flex flex-col overflow-hidden">
          {/* Sticky Navbar */}
          <div className="sticky top-0 z-50">
            <Navbar />
            <PageHeader />
          </div>

          {/* Scrollable content */}
          <main className="h-[100vh] overflow-y-scroll">
            <div className="min-h-full px-4 md:px-8 lg:px-16 xl:px-16 2xl:px-32 py-8 bg-light-card dark:bg-dark-card">
              {children}
            </div>
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
