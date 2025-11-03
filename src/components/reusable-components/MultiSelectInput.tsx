"use client";
import { useState, useRef, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface MultiSelectInputProps {
  name: string;
  label: string;
  control: any;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  optional?: boolean;
  required?: boolean;
}

export const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  name,
  label,
  control,
  options,
  placeholder = "Select options",
  className = "",
  disabled = false,
  optional = false,
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number | undefined>();

  useEffect(() => {
    if (triggerRef.current) {
      setPopoverWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  return (
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
          <div className="space-y-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild disabled={disabled}>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full min-w-[260px] h-10 justify-between font-normal",
                      !field.value?.length && "text-muted-foreground",
                      disabled && "opacity-50 cursor-not-allowed"
                    )}
                    ref={triggerRef}
                  >
                    {field.value?.length > 0
                      ? `${field.value.length} selected`
                      : placeholder}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                className="p-0"
                style={{ width: popoverWidth ? `${popoverWidth}px` : "auto" }}
                align="start"
              >
                <Command>
                  <CommandInput
                    placeholder="Search options..."
                    className="h-9"
                  />
                  <CommandEmpty>No options found.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-y-auto">
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => {
                          const newValue = field.value?.includes(option.value)
                            ? field.value.filter(
                                (v: string) => v !== option.value
                              )
                            : [...(field.value || []), option.value];
                          field.onChange(newValue);
                        }}
                        className="text-sm"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value?.includes(option.value)
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {field.value?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {field.value.map((value: string) => {
                  const option = options.find((opt) => opt.value === value);
                  return (
                    option && (
                      <Badge
                        key={value}
                        variant="outline"
                        className="px-2 py-0.5 text-xs"
                      >
                        {option.label}
                      </Badge>
                    )
                  );
                })}
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
