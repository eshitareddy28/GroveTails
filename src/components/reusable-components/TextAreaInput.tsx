"use client";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface TextareaInputProps {
  name: string;
  label: string;
  control?: any; // Made optional
  placeholder?: string;
  className?: string;
  rows?: number;
  optional?: boolean;
  required?: boolean;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({
  name,
  label,
  control,
  placeholder = "",
  className = "",
  rows = 3,
  optional = false,
  required = false,
}) => {
  const form = useFormContext();
  const actualControl = control || form?.control;

  if (!actualControl) {
    throw new Error(
      "TextareaInput must be used within a FormProvider or have control prop"
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
          <FormControl>
            <Textarea placeholder={placeholder} {...field} rows={rows} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
