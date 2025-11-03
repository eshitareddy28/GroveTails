"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { ReactNode } from "react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectInputProps {
  name?: string;
  label: string;
  control?: any;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  optional?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  isLoading?: boolean;
  required?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  name,
  label,
  control,
  options,
  placeholder = "Select an option",
  className = "",
  disabled = false,
  onValueChange,
  optional = false,
  value: externalValue,
  onChange: externalOnChange,
  isLoading = false,
  required = false,
}) => {
  const form = useFormContext();
  const actualControl = control || form?.control;

  // Filter out any options with empty string values
  const validOptions = options.filter((option) => option.value !== "");

  const renderSelect = (field?: {
    value: string;
    onChange: (value: string) => void;
  }) => {
    const currentValue = field?.value ?? externalValue;

    return (
      <Select
        onValueChange={(value) => {
          field?.onChange(value);
          onValueChange?.(value);
          externalOnChange?.(value);
        }}
        value={currentValue}
        disabled={disabled || isLoading}
      >
        <FormControl>
          <SelectTrigger className="h-10">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <SelectValue placeholder={placeholder} />
            )}
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {validOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  const renderLabel = () => (
    <div className="flex justify-between items-center">
      <FormLabel className="text-sm font-medium">
        {label}
        {required && !optional && <span className="text-red-500 ml-1">*</span>}
      </FormLabel>
      {optional && (
        <span className="text-xs text-muted-foreground">Optional</span>
      )}
    </div>
  );

  if (name && actualControl && externalValue === undefined) {
    return (
      <FormField
        control={actualControl}
        name={name}
        render={({ field }) => (
          <FormItem className={`space-y-1.5 ${className}`}>
            {renderLabel()}
            {renderSelect(field)}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  if (externalValue !== undefined) {
    return (
      <div className={`space-y-1.5 ${className}`}>
        {renderLabel()}
        {renderSelect()}
      </div>
    );
  }

  throw new Error(
    "SelectInput requires either:\n" +
      "- Form mode: name + control (or be inside FormProvider)\n" +
      "- Standalone mode: value + onChange"
  );
};
