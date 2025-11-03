// components/ui/Spinner.tsx
"use client";
import { Loader2 } from "lucide-react";

const Spinner = ({ className = "w-4 h-4 text-white" }) => {
  return <Loader2 className={`animate-spin ${className}`} />;
};

export default Spinner;
