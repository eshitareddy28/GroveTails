"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  name: string;
  label: string;
  control: any;
  accept?: string;
  multiple?: boolean;
  className?: string;
  description?: string;
}

export const FileUpload = ({
  name,
  label,
  control,
  accept = "image/*",
  multiple = false,
  className = "",
  description,
}: FileUploadProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={className}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                field.onChange(multiple ? files : files[0]);
              }}
              className="cursor-pointer"
            />
          </div>
        </FormControl>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);
