// components/PageHeader.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegistrationDrawer } from "./RegistrationDrawer";
import { FormType } from "./forms/type";

export const PageHeader = () => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<FormType>("pet");

  if (pathname?.startsWith("/pet/")) {
    return null;
  }

  const openDrawerWithForm = (formType: FormType) => {
    setActiveForm(formType);
    setDrawerOpen(true);
  };

  const pageConfig = {
    "/": {
      title: "Build Your Den",
      ctas: [
        {
          type: "button",
          action: () => openDrawerWithForm("pet"),
          label: "Register Pet",
          colorClass:
            "bg-light-accent hover:bg-light-accent/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90",
          shadow:
            "shadow-md hover:shadow-lg shadow-light-accent/20 dark:shadow-dark-accent/30",
        },
      ],
    },
    "/shelters": {
      title: "Shelter Directory",
      ctas: [
        {
          type: "button",
          action: () => openDrawerWithForm("pet"),
          label: "Register Pet",
          colorClass:
            "bg-light-accent hover:bg-light-accent/90 dark:bg-dark-accent dark:hover:bg-dark-accent/90",
          shadow:
            "shadow-md hover:shadow-lg shadow-light-accent/20 dark:shadow-dark-accent/30",
        },
        {
          type: "button",
          action: () => openDrawerWithForm("shelter"),
          label: "Register Shelter",
          colorClass:
            "bg-light-primary hover:bg-light-secondary/90 dark:bg-dark-secondary dark:hover:bg-dark-secondary/90",
          shadow:
            "shadow-md hover:shadow-lg shadow-light-secondary/20 dark:shadow-dark-secondary/30",
        },
      ],
    },
    "/community": { title: "Community", ctas: [] },
    "/my-den": { title: "My Den", ctas: [] },
  };

  const config = pageConfig[pathname as keyof typeof pageConfig] || {
    title: "",
    ctas: [],
  };

  return (
    <>
      <div className="w-full bg-mint-200/70 dark:bg-dark-mint-700 border-b shadow-header shadow-mint dark:shadow-mint">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-16 2xl:px-32 py-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-light-primary dark:text-dark-primary">
            {config.title}
          </h2>
          <div className="flex gap-3">
            {config.ctas.map((cta, index) => (
              <Button
                key={index}
                onClick={cta.action}
                className={`flex items-center gap-2 ${cta.colorClass} ${cta.shadow} text-white`}
              >
                <Plus className="w-4 h-4" />
                <span>{cta.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <RegistrationDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        formType={activeForm}
      />
    </>
  );
};
