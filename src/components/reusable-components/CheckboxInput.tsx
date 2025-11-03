"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckboxInputProps {
  name: string;
  label: string;
  control: any;
  className?: string;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  label,
  control,
  className = "",
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem
        className={cn("flex items-center space-x-3 space-y-0", className)}
      >
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <FormLabel className="font-normal">{label}</FormLabel>
        <FormMessage />
      </FormItem>
    )}
  />
);
