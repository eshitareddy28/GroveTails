"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupInputProps {
  name: string;
  label?: string;
  control: any;
  options: Option[];
  className?: string;
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
}

export const RadioGroupInput = ({
  name,
  label,
  control,
  options,
  className,
  orientation = "vertical",
  disabled = false,
}: RadioGroupInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-3", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn(
                "gap-4",
                orientation === "horizontal" ? "flex flex-wrap" : "space-y-2"
              )}
              disabled={disabled}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem
                      value={option.value}
                      className="text-mint-600 border-gray-300 dark:border-gray-600 focus:ring-mint-500"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal cursor-pointer">
                      {option.label}
                    </FormLabel>
                    {option.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {option.description}
                      </p>
                    )}
                  </div>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="text-rose-600 dark:text-rose-400" />
        </FormItem>
      )}
    />
  );
};
