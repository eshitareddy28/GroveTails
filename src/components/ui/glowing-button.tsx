import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const GlowingButton = ({
  children,
  className = "",
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <div className="relative group inline-flex">
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full 
          scale-100 opacity-0 group-hover:opacity-100 
          transition-all duration-500 
          blur-2xl bg-purple-300 dark:bg-purple-200 
          pointer-events-none"
      />
      <Button
        {...props}
        className={cn(
          "bg-light-button dark:bg-dark-button hover:bg-[#85698a] border border-transparent text-white dark:text-text-light transition-all duration-300 relative z-10 flex items-center gap-2 group-hover:-translate-y-1",
          className
        )}
      >
        {children}
      </Button>
    </div>
  );
};

export default GlowingButton;
