"use client";
import { useFormContext } from "react-hook-form";
import { TextInput } from "@/components/reusable-components/TextInput";

export const ContactSection = () => {
  const { control, watch } = useFormContext();
  const hasShelter = !!watch("shelterId");

  return (
    <section className="space-y-6 mr-1 ml-1">
      <h3 className="text-lg font-medium">
        Contact Information
        {hasShelter && (
          <span className="text-sm text-muted-foreground ml-2">
            (from selected shelter)
          </span>
        )}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          name="shelterContact.email"
          label="Email"
          control={control}
          placeholder="contact@example.com"
          readOnly={hasShelter}
        />
        <TextInput
          name="shelterContact.phone"
          label="Phone"
          control={control}
          placeholder="+1234567890"
          readOnly={hasShelter}
        />
        <TextInput
          name="shelterContact.altPhone"
          label="Alternate Phone"
          control={control}
          placeholder="Optional"
          readOnly={hasShelter}
        />
      </div>
    </section>
  );
};
