"use client";
import { Clock, Phone, Home, Pill } from "lucide-react";
import { TextInput } from "@/components/reusable-components/TextInput";
import { CheckboxInput } from "@/components/reusable-components/CheckboxInput";
import { TextareaInput } from "@/components/reusable-components/TextAreaInput";
import { RadioGroupInput } from "@/components/reusable-components/RadioGroupInput";

export const FosterSpecificSection = ({ control }: { control: any }) => {
  return (
    <section className="space-y-6 mr-1 ml-1">
      <h3 className="text-lg font-medium flex items-center gap-2">
        <Home className="h-5 w-5" />
        Foster Details
      </h3>

      <RadioGroupInput
        name="fosterDuration"
        label="Preferred Foster Duration"
        control={control}
        options={[
          { value: "2weeks", label: "2 Weeks" },
          { value: "1month", label: "1 Month" },
          { value: "3months", label: "3 Months" },
          { value: "indefinite", label: "Until Adoption" },
        ]}
      />

      <TextInput
        name="emergencyContact"
        label="Emergency Contact"
        control={control}
        placeholder="Name and phone number"
        icon={<Phone className="h-4 w-4" />}
      />

      <TextareaInput
        name="homeEnvironment"
        label="Describe Your Home Environment"
        control={control}
        placeholder="Do you have a yard? Other pets? etc."
        rows={4}
      />

      <div className="space-y-4">
        <CheckboxInput
          name="canTransport"
          label="I can transport to vet appointments"
          control={control}
        />
        <CheckboxInput
          name="canAdministerMedication"
          label="I can administer medication"
          control={control}
        />
      </div>

      <TextareaInput
        name="fosterExperience"
        label="Previous Foster Experience"
        control={control}
        placeholder="Describe any previous fostering experience"
        rows={4}
        optional
      />
    </section>
  );
};
