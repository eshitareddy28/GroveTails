"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface NumberInputProps {
  name: string;
  label: string;
  control: any;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
  optional?: boolean;
  required?: boolean;
}

export const NumberInput = ({
  name,
  label,
  control,
  placeholder,
  min,
  max,
  className = "",
  optional = false,
  required = false,
}: NumberInputProps) => (
  <FormField
    control={control}
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
          <Input
            type="number"
            placeholder={placeholder}
            min={min}
            max={max}
            className="h-10"
            {...field}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (isNaN(value)) {
                field.onChange(min || 0);
              } else {
                let constrainedValue = value;
                if (min !== undefined)
                  constrainedValue = Math.max(min, constrainedValue);
                if (max !== undefined)
                  constrainedValue = Math.min(max, constrainedValue);
                field.onChange(constrainedValue);
              }
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
