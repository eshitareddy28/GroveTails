// components/HydrationZapper.tsx
"use client";

import { useEffect, useState } from "react";

export default function HydrationZapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;

  return <div suppressHydrationWarning>{children}</div>;
}
