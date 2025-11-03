// components/FloatingRegisterButton.tsx
import { Plus } from "lucide-react";
import Link from "next/link";

export const FloatingRegisterButton = () => {
  return (
    <Link
      href="/register/pet"
      className="fixed bottom-8 right-8 z-40 p-4 bg-light-accent dark:bg-dark-accent rounded-full shadow-xl hover:shadow-2xl transition-all text-white"
      aria-label="Register a pet"
    >
      <Plus className="w-6 h-6" />
      <span className="sr-only">Register Pet</span>
    </Link>
  );
};
