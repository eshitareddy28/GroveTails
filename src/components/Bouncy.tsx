"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Bouncy({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.3, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
    >
      {children}
    </motion.div>
  );
}
