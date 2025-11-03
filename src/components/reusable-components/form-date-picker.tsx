"use client";
import * as React from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormDatePickerProps {
  name: string;
  label: string;
  control: any;
  className?: string;
  placeholder?: string;
  optional?: boolean;
}

export const FormDatePicker = ({
  name,
  label,
  control,
  className = "",
  placeholder = "Pick a date",
  optional = false,
}: FormDatePickerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem className={`space-y-1.5 ${className}`}>
            <div className="flex justify-between items-center">
              <FormLabel className="text-sm font-medium">{label}</FormLabel>
              {optional && (
                <span className="text-xs text-muted-foreground">Optional</span>
              )}
            </div>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-10 justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
