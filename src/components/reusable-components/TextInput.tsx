// components/reusable-components/TextInput.tsx
"use client";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control?: any; // Made optional
  className?: string;
  description?: string;
  optional?: boolean;
  icon?: ReactNode;
  readOnly?: boolean;
  required?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  control,
  className = "",
  description,
  optional = false,
  icon,
  readOnly = false,
  required = false,
}) => {
  const form = useFormContext(); // Get form context
  const actualControl = control || form?.control; // Use provided control or form context

  if (!actualControl) {
    throw new Error(
      "TextInput must be used within a FormProvider or have control prop"
    );
  }

  return (
    <FormField
      control={actualControl}
      name={name}
      render={({ field }) => (
        <FormItem className={`space-y-1.5 ${className}`}>
          <div className="flex justify-between items-center">
            <FormLabel className="text-sm font-medium">
              {label}
              {required && !optional && (
                <span className="text-red-500 ml-1">*</span>
              )}
            </FormLabel>
            {optional && (
              <span className="text-xs text-muted-foreground">Optional</span>
            )}
          </div>
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {icon}
              </div>
            )}
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                {...field}
                className={`h-10 ${icon ? "pl-10" : ""}`}
                readOnly={readOnly}
              />
            </FormControl>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
