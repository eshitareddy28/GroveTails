"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { FC, ReactNode, MouseEvent } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TooltipIconProps {
  label: string;
  href?: string;
  icon?: LucideIcon;
  children?: ReactNode;
  side?: string;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  iconClassName?: string;
}

const TooltipIcon: FC<TooltipIconProps> = ({
  href,
  icon: Icon,
  label,
  children,
  side = "bottom",
  onClick,
  className = "",
  iconClassName = "",
}) => {
  const renderContent = () => {
    const baseClasses = cn(
      "text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors",
      className
    );

    const iconClasses = cn(
      "w-5 h-5", // Base icon size
      iconClassName
    );

    if (href && Icon) {
      return (
        <Link href={href} className={baseClasses}>
          <Icon className={iconClasses} />
        </Link>
      );
    }

    if (Icon) {
      return (
        <button
          onClick={onClick}
          className={cn(baseClasses, onClick ? "cursor-pointer" : "")}
        >
          <Icon className={iconClasses} />
        </button>
      );
    }

    if (children) {
      return (
        <div className={baseClasses} onClick={onClick}>
          {children}
        </div>
      );
    }

    return null;
  };

  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{renderContent()}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            sideOffset={8}
            className="rounded-xl bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text text-xs px-3 py-1 shadow-md z-50 animate-fade-in border border-light-border dark:border-dark-border"
          >
            {label}
            <Tooltip.Arrow className="fill-light-background dark:fill-dark-background" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipIcon;
